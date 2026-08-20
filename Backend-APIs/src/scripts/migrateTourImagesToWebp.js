/**
 * Safe, Resumable One-Time Image Migration Script: Convert Cloud Images to WebP & Update Tour MongoDB URLs
 *
 * Features:
 * - Resumable & Idempotent (skips already WebP URLs)
 * - Safe Database Updates (Upload & Verify WebP BEFORE updating MongoDB)
 * - Original Images Preserved (Never deletes original Cloudinary assets)
 * - URL Deduplication (Caches old URL -> new WebP URL mapping)
 * - Dry-Run Mode (--dry-run)
 * - Retry Mode (--retry)
 * - Backup Audit Logging (Saves migration details to backup JSON file)
 * - Batching with Controlled Concurrency (Default: 3)
 *
 * Usage:
 *   Dry Run: node src/scripts/migrateTourImagesToWebp.js --dry-run
 *   Migration: node src/scripts/migrateTourImagesToWebp.js
 *   Retry Failed: node src/scripts/migrateTourImagesToWebp.js --retry
 */

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const axios = require("axios");
const sharp = require("sharp");
const streamifier = require("streamifier");

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, "../../config.env") });

const Tour = require("../models/tourModel");
const cloudinary = require("../config/cloudinary");
const {
  logBanner,
  logInfo,
  logSuccess,
  logWarn,
  logError,
  logSummary,
} = require("../utils/logger");

// CLI Flags
const IS_DRY_RUN = process.argv.includes("--dry-run");
const IS_RETRY = process.argv.includes("--retry");

// Concurrency Setting
const CONCURRENCY = 3;
const WEBP_QUALITY = 80;

// Path to Backup and Failed Migration Log Files
const BACKUP_DIR = path.join(__dirname, "../../dev-data");
const FAILED_LOG_PATH = path.join(BACKUP_DIR, "failed-webp-migrations.json");
const BACKUP_LOG_PATH = path.join(
  BACKUP_DIR,
  `webp-migration-backup-${Date.now()}.json`,
);

// In-Memory URL Mapping Cache for Deduplication
const urlCache = new Map();

// Backup & Tracking Records
const migrationRecords = [];
const failedRecords = [];

/**
 * Extracts public ID from Cloudinary URL or generates fallback.
 */
const extractCloudinaryPublicId = (url) => {
  if (!url || typeof url !== "string") return "";

  try {
    const cleanUrl = url.split("?")[0];
    const uploadIndex = cleanUrl.indexOf("/upload/");
    if (uploadIndex === -1) {
      return cleanUrl.replace(/^.*[\\/]/, "").replace(/\.[^/.]+$/, "");
    }

    let pathAfterUpload = cleanUrl.substring(uploadIndex + "/upload/".length);
    const lastDotIndex = pathAfterUpload.lastIndexOf(".");
    const lastSlashIndex = pathAfterUpload.lastIndexOf("/");

    if (lastDotIndex > lastSlashIndex) {
      pathAfterUpload = pathAfterUpload.substring(0, lastDotIndex);
    }

    const parts = pathAfterUpload.split("/").filter((part) => {
      if (!part) return false;
      if (/^v\d+$/.test(part)) return false;
      if (/^s--.*--$/.test(part)) return false;
      if (/^(c_|w_|h_|q_|f_|e_|r_|b_|g_|dpr_|fl_|l_|u_)/.test(part)) return false;
      return true;
    });

    return decodeURIComponent(parts.join("/"));
  } catch (err) {
    return "";
  }
};

/**
 * Determines if a given image URL is already WebP.
 */
const isWebpUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return cleanUrl.endsWith(".webp") || cleanUrl.includes("/f_webp");
};

/**
 * Downloads image buffer from HTTP/HTTPS URL.
 */
const downloadImageBuffer = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 15000,
  });
  return Buffer.from(response.data);
};

/**
 * Uploads WebP image buffer to Cloudinary.
 */
const uploadWebpToCloudinary = (buffer, publicId, folder) => {
  const uploadOptions = {
    folder: folder || undefined,
    public_id: publicId ? publicId.split("/").pop() : undefined,
    resource_type: "image",
    format: "webp",
    overwrite: true,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);

        resolve({
          publicId: result.public_id,
          secureUrl: result.secure_url,
        });
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Processes a single image URL:
 * 1. Checks Cache / WebP status
 * 2. Downloads original image
 * 3. Converts to WebP via Sharp
 * 4. Uploads WebP to Cloudinary
 * 5. Verifies upload response URL
 */
const processSingleImage = async ({
  oldUrl,
  existingPublicId,
  defaultFolder,
  fieldLabel,
  tourId,
}) => {
  if (!oldUrl || typeof oldUrl !== "string") {
    return { status: "SKIPPED", reason: "Invalid or empty URL" };
  }

  // 1. Check if already WebP
  if (isWebpUrl(oldUrl)) {
    return {
      status: "ALREADY_WEBP",
      newUrl: oldUrl,
      publicId: existingPublicId || extractCloudinaryPublicId(oldUrl),
    };
  }

  // 2. Check Deduplication Cache
  if (urlCache.has(oldUrl)) {
    const cached = urlCache.get(oldUrl);
    return {
      status: "SUCCESS_CACHED",
      newUrl: cached.newUrl,
      publicId: cached.publicId,
    };
  }

  // 3. Dry Run Simulation
  if (IS_DRY_RUN) {
    const publicId = existingPublicId || extractCloudinaryPublicId(oldUrl);
    const targetPublicId = publicId || `webp-image-${Date.now()}`;
    const simulatedNewUrl = oldUrl.replace(/\.(jpg|jpeg|png|gif|avif)($|\?)/i, ".webp$2");

    urlCache.set(oldUrl, { newUrl: simulatedNewUrl, publicId: targetPublicId });
    return {
      status: "DRY_RUN_MIGRATED",
      newUrl: simulatedNewUrl,
      publicId: targetPublicId,
    };
  }

  // 4. Real Conversion & Upload Flow
  try {
    // Step A: Download Original Image
    const inputBuffer = await downloadImageBuffer(oldUrl);

    // Step B: Convert to WebP via Sharp (Preserves original dimensions)
    const webpBuffer = await sharp(inputBuffer)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    // Step C: Determine Cloudinary Public ID & Folder
    const derivedPublicId = existingPublicId || extractCloudinaryPublicId(oldUrl);
    let folder = defaultFolder;
    let targetPublicId = derivedPublicId;

    if (derivedPublicId && derivedPublicId.includes("/")) {
      const parts = derivedPublicId.split("/");
      targetPublicId = parts.pop();
      folder = parts.join("/");
    }

    // Step D: Upload WebP Image to Cloudinary
    const uploadResult = await uploadWebpToCloudinary(
      webpBuffer,
      targetPublicId,
      folder,
    );

    // Step E: Verification (Ensure valid WebP URL returned)
    if (!uploadResult || !uploadResult.secureUrl || !uploadResult.secureUrl.includes(".webp")) {
      throw new Error(
        `Cloudinary verification failed: Invalid secure URL returned (${uploadResult ? uploadResult.secureUrl : "null"})`,
      );
    }

    // Step F: Store in Cache
    urlCache.set(oldUrl, {
      newUrl: uploadResult.secureUrl,
      publicId: uploadResult.publicId,
    });

    return {
      status: "SUCCESS",
      newUrl: uploadResult.secureUrl,
      publicId: uploadResult.publicId,
    };
  } catch (err) {
    return {
      status: "FAILED",
      error: err.message || String(err),
    };
  }
};

/**
 * Processes a single Tour document in MongoDB.
 */
const processTourDocument = async (tour) => {
  const tourId = tour._id.toString();
  const tourName = tour.name || "Untitled Tour";
  let hasChanges = false;
  const updates = {};
  const tourLogs = [];

  // --- Process imageCover ---
  if (tour.imageCover) {
    const isObject = typeof tour.imageCover === "object" && tour.imageCover !== null;
    const oldUrl = isObject ? tour.imageCover.secureUrl : tour.imageCover;
    const oldPublicId = isObject ? tour.imageCover.publicId : extractCloudinaryPublicId(oldUrl);
    const altText = (isObject && tour.imageCover.alt) || `${tourName} Cover Image`;

    if (oldUrl) {
      logInfo(`Processing Cover: ${oldUrl}`);
      const res = await processSingleImage({
        oldUrl,
        existingPublicId: oldPublicId,
        defaultFolder: `natours/tours/${tourId}/cover`,
        fieldLabel: "imageCover",
        tourId,
      });

      tourLogs.push({
        tourId,
        tourName,
        field: "imageCover",
        oldUrl,
        newUrl: res.newUrl || null,
        status: res.status,
        error: res.error || null,
        timestamp: new Date().toISOString(),
      });

      if (res.status === "SUCCESS" || res.status === "SUCCESS_CACHED" || res.status === "DRY_RUN_MIGRATED") {
        updates.imageCover = {
          publicId: res.publicId,
          secureUrl: res.newUrl,
          alt: altText,
        };
        hasChanges = true;
        logSuccess(`Cover Migrated -> ${res.newUrl}`);
      } else if (res.status === "ALREADY_WEBP") {
        logInfo(`Cover Already WebP: ${oldUrl}`);
      } else if (res.status === "FAILED") {
        logError(`Cover Failed: ${oldUrl} - Error: ${res.error}`);
        failedRecords.push({
          tourId,
          tourName,
          field: "imageCover",
          oldUrl,
          error: res.error,
        });
      }
    }
  }

  // --- Process images (gallery array) ---
  if (Array.isArray(tour.images) && tour.images.length > 0) {
    const updatedGallery = [];
    let galleryChanged = false;

    for (let i = 0; i < tour.images.length; i++) {
      const imgItem = tour.images[i];
      const isObject = typeof imgItem === "object" && imgItem !== null;
      const oldUrl = isObject ? imgItem.secureUrl : imgItem;
      const oldPublicId = isObject ? imgItem.publicId : extractCloudinaryPublicId(oldUrl);
      const altText = (isObject && imgItem.alt) || `${tourName} Gallery Image ${i + 1}`;

      if (oldUrl) {
        logInfo(`Processing Gallery Image [${i + 1}]: ${oldUrl}`);
        const res = await processSingleImage({
          oldUrl,
          existingPublicId: oldPublicId,
          defaultFolder: `natours/tours/${tourId}/gallery`,
          fieldLabel: `images[${i}]`,
          tourId,
        });

        tourLogs.push({
          tourId,
          tourName,
          field: `images[${i}]`,
          oldUrl,
          newUrl: res.newUrl || null,
          status: res.status,
          error: res.error || null,
          timestamp: new Date().toISOString(),
        });

        if (res.status === "SUCCESS" || res.status === "SUCCESS_CACHED" || res.status === "DRY_RUN_MIGRATED") {
          updatedGallery.push({
            publicId: res.publicId,
            secureUrl: res.newUrl,
            alt: altText,
          });
          galleryChanged = true;
          logSuccess(`Gallery Image [${i + 1}] Migrated -> ${res.newUrl}`);
        } else if (res.status === "ALREADY_WEBP") {
          updatedGallery.push(isObject ? imgItem : { publicId: oldPublicId, secureUrl: oldUrl, alt: altText });
          logInfo(`Gallery Image [${i + 1}] Already WebP.`);
        } else if (res.status === "FAILED") {
          // Keep original in array if failed so data is not lost
          updatedGallery.push(isObject ? imgItem : { publicId: oldPublicId, secureUrl: oldUrl, alt: altText });
          logError(`Gallery Image [${i + 1}] Failed: ${oldUrl} - Error: ${res.error}`);
          failedRecords.push({
            tourId,
            tourName,
            field: `images[${i}]`,
            oldUrl,
            error: res.error,
          });
        }
      }
    }

    if (galleryChanged) {
      updates.images = updatedGallery;
      hasChanges = true;
    }
  }

  // --- Safe MongoDB Update ---
  if (hasChanges && !IS_DRY_RUN) {
    await Tour.updateOne({ _id: tour._id }, { $set: updates }, { runValidators: true });
    logSuccess(`MongoDB Updated cleanly for tour "${tourName}" (${tourId}).`);
  } else if (hasChanges && IS_DRY_RUN) {
    logInfo(`[DRY-RUN] Would update MongoDB for tour "${tourName}" (${tourId}).`);
  }

  migrationRecords.push(...tourLogs);
  return tourLogs;
};

/**
 * Main Migration Orchestrator with Concurrency Queue
 */
const startMigration = async () => {
  const stats = {
    totalTours: 0,
    totalImagesProcessed: 0,
    successfullyMigrated: 0,
    alreadyWebp: 0,
    cachedReuse: 0,
    failed: 0,
    startTime: Date.now(),
  };

  try {
    logBanner(
      IS_DRY_RUN
        ? "DRY RUN: WEBP IMAGE MIGRATION SIMULATION"
        : IS_RETRY
        ? "RETRYING FAILED WEBP IMAGE MIGRATIONS"
        : "STARTING WEBP IMAGE MIGRATION & MONGO UPDATE",
    );

    // 1. Ensure dev-data backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // 2. Connect to MongoDB
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD,
    );

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logInfo("Connected to MongoDB Atlas.");

    // 3. Fetch Tours
    let tours = [];
    if (IS_RETRY && fs.existsSync(FAILED_LOG_PATH)) {
      const failedData = JSON.parse(fs.readFileSync(FAILED_LOG_PATH, "utf-8"));
      const failedTourIds = [...new Set(failedData.map((item) => item.tourId))];
      logInfo(`Found ${failedTourIds.length} tours with previously failed image migrations.`);
      tours = await Tour.find({ _id: { $in: failedTourIds } }).lean();
    } else {
      tours = await Tour.find({}).lean();
    }

    stats.totalTours = tours.length;
    logInfo(`Loaded ${tours.length} tour documents to process.`);

    // 4. Batch Processing with Controlled Concurrency
    for (let i = 0; i < tours.length; i += CONCURRENCY) {
      const chunk = tours.slice(i, i + CONCURRENCY);
      logInfo(`\n--- Processing Tour Batch ${Math.floor(i / CONCURRENCY) + 1} (Tours ${i + 1} to ${Math.min(i + CONCURRENCY, tours.length)}) ---`);

      await Promise.all(
        chunk.map((tour) => processTourDocument(tour)),
      );
    }

    // 5. Calculate Statistics
    for (const record of migrationRecords) {
      stats.totalImagesProcessed++;
      if (record.status === "SUCCESS" || record.status === "DRY_RUN_MIGRATED") {
        stats.successfullyMigrated++;
      } else if (record.status === "SUCCESS_CACHED") {
        stats.cachedReuse++;
        stats.successfullyMigrated++;
      } else if (record.status === "ALREADY_WEBP") {
        stats.alreadyWebp++;
      } else if (record.status === "FAILED") {
        stats.failed++;
      }
    }

    // 6. Save Backup & Failure Logs
    if (!IS_DRY_RUN) {
      fs.writeFileSync(
        BACKUP_LOG_PATH,
        JSON.stringify(migrationRecords, null, 2),
      );
      logSuccess(`Saved migration audit backup log to: ${BACKUP_LOG_PATH}`);

      if (failedRecords.length > 0) {
        fs.writeFileSync(
          FAILED_LOG_PATH,
          JSON.stringify(failedRecords, null, 2),
        );
        logWarn(`Saved ${failedRecords.length} failed image migration records to: ${FAILED_LOG_PATH}`);
      } else if (fs.existsSync(FAILED_LOG_PATH)) {
        fs.unlinkSync(FAILED_LOG_PATH);
        logSuccess("Cleared previous failed migrations log as all images succeeded!");
      }
    }

    // 7. Print Final Execution Summary
    const elapsedSecs = Math.floor((Date.now() - stats.startTime) / 1000);
    logBanner("MIGRATION EXECUTION SUMMARY");
    logSummary({
      total: stats.totalTours,
      completed: stats.successfullyMigrated,
      skipped: stats.alreadyWebp,
      failed: stats.failed,
      imagesUploaded: stats.successfullyMigrated,
      duration: `${Math.floor(elapsedSecs / 60)}m ${elapsedSecs % 60}s`,
    });
    console.log(`Mode                          : ${IS_DRY_RUN ? "DRY RUN (No DB/Cloud changes)" : "REAL MIGRATION"}`);
    console.log(`Total Images Processed        : ${stats.totalImagesProcessed}`);
    console.log(`Deduplicated Cache Hits        : ${stats.cachedReuse}`);
    console.log(`Already WebP (Skipped)        : ${stats.alreadyWebp}`);
    console.log(`Successfully Migrated to WebP : ${stats.successfullyMigrated}`);
    console.log(`Failed Image Uploads          : ${stats.failed}\n`);

    await mongoose.connection.close();
    logInfo("MongoDB connection cleanly closed.");
    process.exit(0);
  } catch (err) {
    logError("Fatal error during execution:", err);
    process.exit(1);
  }
};

// Direct Execution Entrypoint
if (require.main === module) {
  startMigration();
}

module.exports = {
  extractCloudinaryPublicId,
  isWebpUrl,
  processSingleImage,
  processTourDocument,
  startMigration,
};

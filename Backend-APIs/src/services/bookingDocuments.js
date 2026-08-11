const path = require("path");
const {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} = require("./cloudinary.service");
const AppError = require("../utils/appError");

const getBookingFolderPath = (userId, bookingNumber) => {
  if (!userId || !bookingNumber) {
    throw new AppError("User id and booking number are required.", 500);
  }

  return `natours/bookings/${userId}/${bookingNumber}`;
};

/* ===========================================================
   SINGLE DOCUMENT
=========================================================== */

const uploadBookingDocument = async ({
  file,
  userId,
  bookingNumber,
  travelerIndex,
  documentType,
}) => {
  if (!file) return null;

  const folder = `${getBookingFolderPath(
    userId,
    bookingNumber,
  )}/traveler_${travelerIndex}`;

  const ext = path.extname(file.originalname);

  const result = await uploadBufferToCloudinary(
    file.buffer,
    folder,
    documentType,
    {
      resource_type: file.mimetype === "application/pdf" ? "raw" : "image",

      overwrite: true,

      format: ext.length > 1 ? ext.substring(1) : undefined,
    },
  );

  return {
    publicId: result.publicId,
    secureUrl: result.secureUrl,
  };
};

/* ===========================================================
   HELPERS
=========================================================== */

const findFile = (files, fieldname) =>
  files.find((file) => file.fieldname === fieldname);

/* ===========================================================
   ONE TRAVELER
=========================================================== */

const uploadTravelerDocuments = async ({
  traveler,
  travelerIndex,
  files,
  userId,
  bookingNumber,
}) => {
  const passport = findFile(files, `traveler_${travelerIndex}_passport`);
  const visa = findFile(files, `traveler_${travelerIndex}_visa`);
  const nationalId = findFile(files, `traveler_${travelerIndex}_nationalId`);
  const insurance = findFile(files, `traveler_${travelerIndex}_insurance`);

  const docTypes = [
    { file: passport, type: "passport" },
    { file: visa, type: "visa" },
    { file: nationalId, type: "nationalId" },
    { file: insurance, type: "insurance" },
  ];

  await Promise.all(
    docTypes.map(async ({ file, type }) => {
      if (file && traveler.travelDocuments && traveler.travelDocuments[type]) {
        traveler.travelDocuments[type].file = await uploadBookingDocument({
          file,
          userId,
          bookingNumber,
          travelerIndex: travelerIndex + 1,
          documentType: type,
        });
      }
    }),
  );

  return traveler;
};

/* ===========================================================
   ALL TRAVELERS
=========================================================== */

const uploadAllTravelerDocuments = async ({
  travelers,
  files,
  userId,
  bookingNumber,
}) => {
  if (!files || files.length === 0) return travelers;

  return Promise.all(
    travelers.map((traveler, i) =>
      uploadTravelerDocuments({
        traveler,
        travelerIndex: i,
        files,
        userId,
        bookingNumber,
      }),
    ),
  );
};

/* ===========================================================
   DELETE BOOKING
=========================================================== */

const deleteBookingFolder = async (userId, bookingNumber) => {
  const cloudinary = require("../config/cloudinary");

  const folder = getBookingFolderPath(userId, bookingNumber);

  try {
    await cloudinary.api.delete_resources_by_prefix(folder);

    for (let i = 1; i <= 50; i++) {
      try {
        await cloudinary.api.delete_folder(`${folder}/traveler_${i}`);
      } catch (_) {}
    }

    try {
      await cloudinary.api.delete_folder(folder);
    } catch (_) {}
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getBookingFolderPath,
  uploadBookingDocument,
  uploadTravelerDocuments,
  uploadAllTravelerDocuments,
  deleteBookingFolder,
};

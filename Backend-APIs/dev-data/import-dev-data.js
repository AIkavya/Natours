const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, "../config.env") });

const Tour = require("../src/models/tourModel");

// Build database connection string
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

// Read JSON Dataset
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tours.json"), "utf-8"),
);

// Import Data into Database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("SUCCESS: 50 tours successfully imported into MongoDB!");
  } catch (err) {
    console.error("ERROR importing data:", err);
  }
  process.exit();
};

// Delete All Data from Collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("SUCCESS: All tours successfully deleted from MongoDB!");
  } catch (err) {
    console.error("ERROR deleting data:", err);
  }
  process.exit();
};

// Connect to MongoDB Atlas first, then execute requested operation
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("--- DB Connection Successful ---");

    if (process.argv[2] === "--import") {
      await importData();
    } else if (process.argv[2] === "--delete") {
      await deleteData();
    } else {
      console.log("Usage instructions:");
      console.log("  To import data: node dev-data/import-dev-data.js --import");
      console.log("  To delete data: node dev-data/import-dev-data.js --delete");
      process.exit();
    }
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

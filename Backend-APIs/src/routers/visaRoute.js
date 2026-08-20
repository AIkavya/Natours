// server/routes/visaRoutes.js
// Express API Router for Global Visa Sync

const express = require("express");
const visaController = require("../controllers/visaController.js");

const router = express.Router();

router.get("/getInformation", visaController.getRequireDocuments);

module.exports = router;

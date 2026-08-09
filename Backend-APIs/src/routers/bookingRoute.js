const express = require('express');
const router = express.Router();

const { protect } = require('../controllers/authController');
const BookingController = require('../controllers/bookingController');
const { uploadBookingDocuments,reuploadBookingDocument } = require('../middlewares/documents');

router.use(protect);

router.post('/create-my-booking/:slug',uploadBookingDocuments,BookingController.createMyBooking);

router.get('/my-bookings',BookingController.getMyAllBooking)
router.get(
  "/detail-booking/:bookingNumber",
  BookingController.getMyTourDetails,
);

router.patch("/reupload-document",reuploadBookingDocument,BookingController.reuploadBookingDocument);  


module.exports = router; 
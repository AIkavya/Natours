const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/error");
const AppError = require("../utils/appError");
const { uploadAllTravelerDocuments } = require("../services/bookingDocuments");
const Tour = require("../models/tourModel");
const Email = require("../utils/email");
exports.getMyAllBooking = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate({
      path: "tour",
      select: "name imageCover slug duration",
    })
    .sort("-createdAt");
  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

exports.getMyTourDetails = catchAsync(async (req, res, next) => {
  console.log("getMyTourDetails reached");
  console.log("Params:", req.params);
  console.log("Logged In User:", req.user.id);

  const booking = await Booking.findOne({
    _id: req.params.bookingNumber,
    user: req.user.id,
  }).populate({
    path: "tour",
    select:
      "name imageCover slug destinations summary theme startLocation duration itinerary",
  });

  if (!booking) {
    return next(
      new AppError(
        "Booking not found or you are not authorized to access it.",
        404,
      ),
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.createMyBooking = catchAsync(async (req, res, next) => {
  const body = JSON.parse(req.body.bookingData);
  const tour = await Tour.findOne({ slug: req.params.slug });

  if (!tour) {
    return next(new AppError("No tour found with that slug.", 404));
  }
  const bookingData = {
    bookingNumber: generateBookingNumber(),

    user: req.user._id,

    tour: tour._id,

    packageName: body.packageName,

    selectedHotel: {
      name: body.selectedHotel.name,
      rating: body.selectedHotel.rating,
      website: body.selectedHotel.website,
      roomType: body.selectedHotel.roomType,
    },

    travelDate: body.travelDate,

    travelers: body.travelers,

    emergencyContact: {
      name: body.emergencyContact.name,
      relation: body.emergencyContact.relation,
      phoneNumber: body.emergencyContact.phoneNumber,
    },

    pricePerPerson: body.pricePerPerson,

    totalAmount: body.totalAmount,

    amountPaid: body.amountPaid,

    remainingAmount: body.remainingAmount,

    termsAndPolicy: {
      terms: {
        refundPolicy: body.terms.refundPolicy,
        cancellationPolicy: body.terms.cancellationPolicy,
        failedPaymentPolicy: body.terms.failedPaymentPolicy,
        insurancePolicy: body.terms.insurancePolicy,
        documentVerificationPolicy: body.terms.documentVerificationPolicy,
        criminalAndImmigrationPolicy: body.terms.criminalAndImmigrationPolicy,
        travelerInformationPolicy: body.terms.travelerInformationPolicy,
        thirdPartyServicesPolicy: body.terms.thirdPartyServicesPolicy,
        healthDeclarationPolicy: body.terms.healthDeclarationPolicy,
        termsAndConditions: body.terms.termsAndConditions,
        acceptedAt: body.terms.acceptedAt,
        ipAddress: body.terms.ipAddress,
        acceptedVersion: body.terms.acceptedVersion,
      },
    },

    payment: {
      provider: body.payment.provider,
      status: body.payment.status,
      paidAt: body.payment.paidAt,
      orderId: generateOrderId(),
      paymentId: generatePaymentId(),
      error: null,
    },
  };

  bookingData.travelers = await uploadAllTravelerDocuments({
    travelers: bookingData.travelers,
    files: req.files,
    userId: req.user._id,
    bookingNumber: bookingData.bookingNumber,
  });

  const booking = await Booking.create(bookingData);

  const populatedBooking = await Booking.findById(booking._id)
    .populate({
      path: "tour",
      select: `
      name
      slug
      theme
      duration
      startLocation
      destinations
      imageCover
      summary
      difficulty
    `,
    })
    .populate({
      path: "user",
      select: "name email",
    });

  try {
    await new Email(populatedBooking.user, "").sendBookingEmail(
      populatedBooking,
    );

    res.status(201).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    console.error("Error in sending booking mail :", err);

    res.status(200).json({
      status: "success",
      message: "Booking created successfully but Not able to send email",
      data: {
        booking,
      },
    });
  }
});

function generateBookingNumber() {
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `BK-${Date.now()}-${random}`;
}

const generatePaymentId = () =>
  `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const { uploadBookingDocument } = require("../services/bookingDocuments");

exports.reuploadBookingDocument = catchAsync(async (req, res, next) => {
  const { bookingId, travelerIndex, docType } = req.body;

  if (!req.file) {
    return next(new AppError("Please upload a document.", 400));
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    user: req.user._id,
  });

  if (!booking) {
    return next(new AppError("Booking not found.", 404));
  }

  const index = Number(travelerIndex);
  console.log(index);

  if (Number.isNaN(index) || !booking.travelers[index]) {
    return next(new AppError("Invalid traveler.", 404));
  }

  const traveler = booking.travelers[index];

  // Overwrite existing document on Cloudinary
  const uploadedFile = await uploadBookingDocument({
    file: req.file,
    userId: booking.user,
    bookingNumber: booking.bookingNumber,
    travelerIndex: index,
    documentType: docType.toLowerCase(),
  });

  const newFileObj = {
    publicId: uploadedFile.publicId,
    secureUrl: uploadedFile.secureUrl,
    status: "pending",
    reason: "",
  };

  switch (docType.toLowerCase()) {
    case "passport":
      if (!traveler.travelDocuments.passport) traveler.travelDocuments.passport = {};
      traveler.travelDocuments.passport.file = newFileObj;
      traveler.travelDocuments.passport.verificationStatus = "pending";
      break;

    case "nationalid":
      if (!traveler.travelDocuments.nationalId) traveler.travelDocuments.nationalId = {};
      traveler.travelDocuments.nationalId.file = newFileObj;
      traveler.travelDocuments.nationalId.verificationStatus = "pending";
      break;

    case "visa":
      if (!traveler.travelDocuments.visa) traveler.travelDocuments.visa = {};
      traveler.travelDocuments.visa.file = newFileObj;
      traveler.travelDocuments.visa.verificationStatus = "pending";
      break;

    case "insurance":
      if (!traveler.travelDocuments.insurance) traveler.travelDocuments.insurance = {};
      traveler.travelDocuments.insurance.file = newFileObj;
      traveler.travelDocuments.insurance.verificationStatus = "pending";
      break;

    default:
      return next(new AppError("Invalid document type.", 400));
  }

  booking.markModified("travelers");

  // Check if any document across travelers is still rejected
  let hasRemainingRejections = false;
  booking.travelers.forEach((t) => {
    const docs = t.travelDocuments || {};
    ["passport", "nationalId", "visa", "insurance"].forEach((key) => {
      const d = docs[key];
      if (d && ((d.file && d.file.status === "rejected") || d.verificationStatus === "rejected")) {
        hasRemainingRejections = true;
      }
    });
  });

  if (!hasRemainingRejections) {
    booking.documentVerificationStatus = "pending";
  }

  await booking.save();

  res.status(200).json({
    status: "success",
    message: "Document re-uploaded successfully.",
    data: {
      booking,
    },
  });
});
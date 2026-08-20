const catchAsync = require("../utils/error");
const AppError = require("../utils/appError");
const countries = require("i18n-iso-countries");
const en = require("i18n-iso-countries/langs/en.json");
countries.registerLocale(en);

const cache = new Map();

const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

const setCache = function (destination, data, ttl = DEFAULT_TTL) {
  // set the destination country for 24 hours in cache
  cache.set(destination, {
    data,
    expiresAt: Date.now() + ttl,
  });
};

const getCache = function (destination) {
  // 1) get the destination data..
  const cached = cache.get(destination);

  // 2) if not found then return null
  if (!cached) {
    return null;
  }

  // 3) checking for time if extended then delete the cache data and return null
  if (Date.now() > cached.expiresAt) {
    cache.delete(destination);
    return null;
  }

  // 4) final data
  return cached.data;
};

const deleteCache = (destination) => {
  cache.delete(destination);
};

const clearCache = () => {
  cache.clear();
};

exports.getRequireDocuments = catchAsync(async (req, res, next) => {
  // 1) get destination country from the req.body..
  let { destination } = req.query;

  if (!destination) {
    return next(new AppError("Please provide destination", 400));
  }

  // trimming and normalizing destination country..

  destination = destination.trim().toLowerCase();

  if (destination === "india") {
  }
  const code = countries.getAlpha3Code(destination, "en");

  if (!code) {
    return next(new AppError("Invalid destination country", 400));
  }

  // console.log(code) // ex -> 'France' to 'FRA'

  // 2) try to find the destination country in the cache Memmory..

  const cachedData = getCache(code);

  if (cachedData) {
    return res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      source: "cache Memmory",
      data: cachedData,
    });
  }

  // 3) try to fetch data using api...

  const url = `${process.env.VISA_API}`.replace("<DESTINATION>", code);

  const headers = {
    "x-api-key": process.env.VISA_API_KEY,
  };
  const data = await fetch(url, {
    headers,
  });
  const json = await data.json();

  if (json) {
    let response = {};

    let services = {};

    response = {
      passport: json.data.passport,
      destination: json.data.destination,
      requireDocuments: json.data.documents_required,
    };

    if (json.data.visa_required) {
      ((services.visa = {
        processingTime: json.data.processing_time || 7,
        cost: json.data.cost || "₹ 2,500-10,000",
        requireDocuments: [
          "Valid Passport",
          "Bank statement / financial proof (Min Last 6 Months)",
        ],
      }),
        (services.passport = {
          processingTime: json.data.processing_time || 7,
          cost: "₹ 3000-4500",
          requireDocuments: ["Valid Nationality Proof", "Birth Certificate"],
        }));
    }

    if (json.data.documents_required.includes("Travel insurance")) {
      services.insurance = {
        coverage: "₹ 1,00,000-2,00,000",
        cost: "₹ 10,000-20,000",
      };
    }

    if (services) {
      response.services = services;
    }

    setCache(code, response);
    res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      data: response,
      source: "API",
    });
  }

  // 4) fall back data : Safety..

  const FALLBACK_DATA = {
    passport: null,
    destination: null,
    requireDocuments: [],
    sevices: {},
    message:
      "Unable to find the required travel documents at this time. Sorry for the inconvenience.",
  };

  return res.status(404).json({
    status: "success",
    message: "Data not found",
    data: FALLBACK_DATA,
    source: "FALLBACK_DATA",
  });
});

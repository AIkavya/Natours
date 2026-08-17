// library
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const cloudinary = require("../config/cloudinary");

// helper
const AppError = require("../utils/appError");
const catchAsync = require("../utils/error");
const Email = require('../utils/email');

// Model
const User = require("../models/userModel");

/**
 * Generates a signed JWT for a given user.
 */
const tokenJWT = function (user) {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    }
  );
};

/**
 * Returns uniform cookie configuration suitable for cross-origin production (Vercel + Render)
 * as well as local development environments.
 */
const getCookieOptions = function () {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieExpiresDays = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 90;

  return {
    expires: new Date(
      Date.now() + cookieExpiresDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };
};

/**
 * Sends token in a HTTP-only cookie and JSON response payload.
 */
const createSendToken = function (user, res, statusCode) {
  const token = tokenJWT(user);
  const cookieOptions = getCookieOptions();

  res.cookie('jwt', token, cookieOptions);

  // Remove password & sensitive security fields from response JSON output
  user.password = undefined;
  user.otp = undefined;
  user.otpExpires = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async function (req, res, next) {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Generate OTP
  const otp = newUser.createEmailVerificationOTP();

  // Save OTP without triggering password validation again
  await newUser.save({ validateBeforeSave: false });

  const verifyURL = `${process.env.FRONTEND_URL}/user/verifyToken`;

  try {
    await new Email(newUser, verifyURL).sendOtpVerification(otp);

    return res.status(201).json({
      status: "success",
      message: "Verification code sent successfully to your email.",
      email: newUser.email,
    });
  } catch (err) {
    // Rollback user creation if email fails to send
    await User.findByIdAndDelete(newUser._id);

    return next(
      new AppError("Error sending verification email. Please try again.", 500)
    );
  }
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  // 1. Validate request
  if (!email || !otp) {
    return next(new AppError("Please provide email and verification code (OTP).", 400));
  }

  // 2. Find user including hidden OTP fields
  const user = await User.findOne({ email }).select("+otp +otpExpires +active");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  // 3. Check if already verified
  if (user.emailVerified) {
    return next(new AppError("Email is already verified.", 400));
  }

  // 4. Verify OTP
  const validOTP = user.verifyOTP(otp);

  if (!validOTP) {
    return next(new AppError("Invalid or expired verification code.", 400));
  }

  // 5. Activate account and clear OTP
  user.emailVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  user.active = true;

  await user.save({ validateBeforeSave: false });

  // 6. Log user in
  createSendToken(user, res, 200);
});

exports.cancelSignup = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required.", 400));
  }

  const user = await User.findOneAndDelete({
    email,
    emailVerified: false,
  });

  if (!user) {
    return next(new AppError("No unverified account found with this email.", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Signup process cancelled successfully.",
  });
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2. Find user & select password
  const user = await User.findOne({ email }).select('+password +active');

  if (!user) {
    return next(new AppError('Incorrect email or password.', 401));
  }

  // 3. Verify password
  const validUser = await user.correctPassword(password, user.password);

  if (!validUser) {
    return next(new AppError('Incorrect email or password.', 401));
  }

  // 4. Ensure email is verified
  if (!user.emailVerified) {
    return next(new AppError('Please verify your email address before logging in.', 401));
  }

  // 5. Ensure account is active
  if (user.active === false) {
    return next(new AppError('Your account has been deactivated. Please contact support.', 401));
  }

  // 6. Generate and send token
  createSendToken(user, res, 200);
});

exports.protect = catchAsync(async function (req, res, next) {
  let token;

  // 1. Extract token from Cookie or Authorization header
  if (req.cookies?.jwt && req.cookies.jwt !== 'loggedout' && req.cookies.jwt !== 'null') {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const authToken = req.headers.authorization.split(' ')[1];
    if (authToken && authToken !== 'null' && authToken !== 'loggedout') {
      token = authToken;
    }
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to gain access.', 401));
  }

  // 2. Verify token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError('Invalid or expired token! Please log in again.', 401));
  }

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4. Check if user changed password after token issuance
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

exports.isLoggedIn = async (req, res, next) => {
  let token;

  if (req.cookies?.jwt && req.cookies.jwt !== 'loggedout' && req.cookies.jwt !== 'null') {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const authToken = req.headers.authorization.split(' ')[1];
    if (authToken && authToken !== 'null' && authToken !== 'loggedout') {
      token = authToken;
    }
  }

  if (token) {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      res.locals.user = currentUser;
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async function (req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email address.', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // Generate random reset token and store hash in DB
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.FRONTEND_URL}/user/reset-password/${resetToken}`;

  try {
    await new Email(user, resetURL).sendResetPassword();

    return res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Error sending reset password email. Try again later!", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;

  if (!token) {
    return next(new AppError('Password reset token is required.', 400));
  }

  if (!password || !passwordConfirm) {
    return next(new AppError('Please provide both password and passwordConfirm.', 400));
  }

  // 1. Get user based on token and ensure token is not expired
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. Token invalid/expired check
  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }

  // 3. Update password & clear reset fields
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 4. Log the user in with new token
  createSendToken(user, res, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  if (!passwordCurrent || !password || !passwordConfirm) {
    return next(
      new AppError("Please provide current password, new password and passwordConfirm.", 400)
    );
  }

  if (passwordCurrent === password) {
    return next(
      new AppError("New password must be different from your current password.", 400)
    );
  }

  // 1. Get user from collection (with password)
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  // 2. Check if current password is correct
  const correct = await user.correctPassword(passwordCurrent, user.password);
  if (!correct) {
    return next(new AppError("Your current password is incorrect.", 401));
  }

  // 3. Update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // 4. Re-authenticate user with new JWT
  createSendToken(user, res, 200);
});

exports.logout = (req, res, next) => {
  const cookieOptions = getCookieOptions();
  // Set cookie value to 'loggedout' and expire almost immediately (10 seconds)
  cookieOptions.expires = new Date(Date.now() + 10 * 1000);

  res.cookie("jwt", "loggedout", cookieOptions);

  res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError("Please provide your password to confirm account deletion.", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError("Incorrect password.", 401));
  }

  // Delete profile picture from Cloudinary if exists
  if (user.photo?.publicId) {
    try {
      await cloudinary.uploader.destroy(user.photo.publicId);
    } catch (cloudErr) {
      // Continue deletion even if Cloudinary cleanup fails
    }
  }

  await User.findByIdAndDelete(user._id);

  // Invalidate cookie upon deletion
  const cookieOptions = getCookieOptions();
  cookieOptions.expires = new Date(Date.now() + 1000);
  res.cookie("jwt", "loggedout", cookieOptions);

  res.status(200).json({
    status: "success",
    message: "Account deleted successfully.",
  });
});


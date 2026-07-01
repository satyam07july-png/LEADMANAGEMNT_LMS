import express from "express";

import {
  register,
  login,
  getProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  verifyEmail,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import validate from "../middleware/validate.js";

import {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/authValidator.js";

const router = express.Router();

/**
 * =====================================================
 * Public Routes
 * =====================================================
 */

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPassword
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  resetPassword
);

router.post(
  "/refresh-token",
  refreshToken
);

/**
 * =====================================================
 * Protected Routes
 * =====================================================
 */

router.get(
  "/me",
  authMiddleware,
  getProfile
);

router.patch(
  "/change-password",
  authMiddleware,
  changePasswordValidator,
  validate,
  changePassword
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.patch(
  "/verify-email",
  authMiddleware,
  verifyEmail
);

export default router;
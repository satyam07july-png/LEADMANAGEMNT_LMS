import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validate from "../middleware/validate.js";

import ROLES from "../constants/roles.js";

import {
    createEmployeeValidator,
    updateEmployeeValidator
} from "../validators/employee.validator.js";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  restoreEmployee,
  getEmployeeStatistics,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createEmployeeValidator,
  validate,
  createEmployee
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.COUNSELLOR
  ),
  getAllEmployees
);

router.get(
  "/statistics",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.COUNSELLOR
  ),
  getEmployeeStatistics
);;

router.get(
  "/:id",
  authMiddleware,
  getEmployeeById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  updateEmployeeValidator,
  validate,
  updateEmployee
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteEmployee
);

router.patch(
  "/:id/restore",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  restoreEmployee
);

export default router;
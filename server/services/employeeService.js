import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import auditLogger from "../utils/auditLogger.js";
import { isValidRole } from "../constants/roles.js";
import bcrypt from "bcrypt";

import {
    createUserRepository,
    findUserByEmailRepository,
    updateUserRepository,
    softDeleteUserRepository,
    restoreUserRepository
} from "../repositories/userRepository.js";

import {
  
  getNextEmployeeCodeRepository,
  createEmployeeRepository,
  findEmployeeByEmailRepository,
  findEmployeeByMobileRepository,
  getEmployeesRepository,
  findEmployeeByIdRepository,
  updateEmployeeRepository,
  deleteEmployeeRepository,
  restoreEmployeeRepository,
  getEmployeeStatisticsRepository,
  
 
} from "../repositories/employeeRepository.js";



export const createEmployeeService = async (
  employeeData,
  currentUser,
  req
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    // Duplicate Email
     const existingEmployee =
      await findEmployeeByEmailRepository(employeeData.email);

    if (existingEmployee) {
      throw new ApiError(409, "Employee email already exists.");
    }
    // exist user
    const existingUser =
    await findUserByEmailRepository(employeeData.email);

if (existingUser) {
    throw new ApiError(
        409,
        "User email already exists."
    );
}

    // Duplicate Mobile
    const existingMobile =
      await findEmployeeByMobileRepository(employeeData.mobile);

    if (existingMobile) {
      throw new ApiError(409, "Mobile number already exists.");
    }

    // Role Validation
    if (!isValidRole(employeeData.role)) {
      throw new ApiError(400, "Invalid employee role.");
    }

    // Employee Code Generation
    const sequence =
      await getNextEmployeeCodeRepository(client);

    const employeeCode =
      `${process.env.EMPLOYEE_CODE_PREFIX || "EMP"}${String(sequence).padStart(6, "0")}`;
      
    // temp passweord
    const temporaryPassword =
employeeData.password ||
process.env.DEFAULT_EMPLOYEE_PASSWORD;

const hashedPassword =
    await bcrypt.hash(
        temporaryPassword,
        10
    );
   // create user
    const user =
    await createUserRepository(
        client,
        {
            full_name: employeeData.full_name,
            email: employeeData.email,
            password: hashedPassword,
            role: employeeData.role
        }
    );

    // Create Employee
    const employee =
    await createEmployeeRepository(
        client,
        {
            ...employeeData,
            user_id: user.id,
            employee_code: employeeCode,
            created_by: currentUser.id
        }
    );

    // Audit Log
    auditLogger({
      action: "EMPLOYEE_CREATED",
      module: "EMPLOYEE",
      userId: currentUser.id,
      role: currentUser.role,
      entityId: employee.id,
      requestId: req.requestId,
      ip: req.ip,
    });

    await client.query("COMMIT");

    return employee;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

/**
 * =====================================================
 * Get All Employees
 * =====================================================
 */

export const getAllEmployeesService = async (filters) => {

  return await getEmployeesRepository(filters);

};

/**
 * =====================================================
 * Get Employee By ID
 * =====================================================
 */

export const getEmployeeByIdService = async (id) => {

  const employee =
    await findEmployeeByIdRepository(id);

  if (!employee) {

    throw new ApiError(
      404,
      "Employee not found."
    );

  }

  return employee;

};

/**
 * =====================================================
 * Update Employee
 * =====================================================
 */

export const updateEmployeeService = async (
  id,
  employeeData,
  currentUser,
  req
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const employee =
      await findEmployeeByIdRepository(id);

    if (!employee) {
      throw new ApiError(
        404,
        "Employee not found."
      );
    }

    if (!isValidRole(employeeData.role)) {
      throw new ApiError(
        400,
        "Invalid employee role."
      );
    }

    const updatedEmployee =
      await updateEmployeeRepository(
        client,
        id,
        {
          ...employeeData,
          updated_by: currentUser.id,
        }
      );

      await updateUserRepository(
    client,
    employee.user_id,
    {
        full_name: employeeData.full_name,
        role: employeeData.role
    }
);

    auditLogger({
      action: "EMPLOYEE_UPDATED",
      module: "EMPLOYEE",
      userId: currentUser.id,
      role: currentUser.role,
      entityId: id,
      requestId: req.requestId,
      ip: req.ip,
    });

    await client.query("COMMIT");

    return updatedEmployee;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

/**
 * =====================================================
 * Soft Delete Employee
 * =====================================================
 */

export const deleteEmployeeService = async (
  id,
  currentUser,
  req
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const employee =
      await findEmployeeByIdRepository(id);

    if (!employee) {
      throw new ApiError(
        404,
        "Employee not found."
      );
    }

    const deletedEmployee =
      await deleteEmployeeRepository(
        client,
        id,
        currentUser.id
      );

      await softDeleteUserRepository(
    client,
    employee.user_id
);

    auditLogger({
      action: "EMPLOYEE_DELETED",
      module: "EMPLOYEE",
      userId: currentUser.id,
      role: currentUser.role,
      entityId: id,
      requestId: req.requestId,
      ip: req.ip,
    });

    await client.query("COMMIT");

    return deletedEmployee;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

export const restoreEmployeeService = async (
  id,
  currentUser,
  req
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const employee = await restoreEmployeeRepository(
      client,
      id,
      currentUser.id
    );

    await restoreUserRepository(
    client,
    employee.user_id
);

    if (!employee) {
      throw new ApiError(
        404,
        "Employee not found."
      );
    }

    auditLogger({
      action: "EMPLOYEE_RESTORED",
      module: "EMPLOYEE",
      userId: currentUser.id,
      role: currentUser.role,
      entityId: id,
      requestId: req.requestId,
      ip: req.ip,
    });

    await client.query("COMMIT");

    return employee;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

export const getEmployeeStatisticsService = async () => {

    return await getEmployeeStatisticsRepository();

};


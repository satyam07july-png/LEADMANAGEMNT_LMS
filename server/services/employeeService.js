import pool from "../config/db.js";
import bcrypt from "bcryptjs";

import {
  createUserRepository,
  findUserByEmailRepository,
} from "../repositories/authRepository.js";

import {
  createEmployeeRepository,
  findEmployeeByPhoneRepository,
  getLastEmployeeRepository,
  getAllEmployeesRepository,
  getEmployeeByIdRepository,
  updateEmployeeRepository,
  deleteEmployeeRepository,
} from "../repositories/employeeRepository.js";
import generateCode from "../utils/generateCode.js";

/**
 * Create Employee
 */
export const createEmployeeService = async (employeeData) => {
  const client = await pool.connect();

  try {
    const {
      full_name,
      email,
      password,
      phone,
      designation,
      joining_date,
    } = employeeData;

    // Check Email
    const existingEmail = await findUserByEmailRepository(email);

    if (existingEmail) {
      throw new ApiError(
    409,
    "Email already exists"
);
    }

    // Check Phone
    const existingPhone = await findEmployeeByPhoneRepository(phone);

    if (existingPhone) {
      throw new ApiError(
    409,
    "Phone already exists"
);
    }

  const employeeCode = generateCode(
  "EMP",
  lastEmployee?.employee_code
);

    await client.query("BEGIN");

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await createUserRepository(client, {
      full_name,
      email,
      password: hashedPassword,
      role: "counsellor",
    });

    // Create Employee
    const employee = await createEmployeeRepository(client, {
      user_id: user.id,
      employee_code: employeeCode,
      phone,
      designation,
      joining_date,
    });
     
    // code generate 
    

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
 * Get All Employees
 */
export const getAllEmployeesService = async () => {
  return await getAllEmployeesRepository();
};

/**
 * Get Employee By ID
 */
export const getEmployeeByIdService = async (id) => {
  const employee = await getEmployeeByIdRepository(id);

  if (!employee) {
    throw new ApiError(
    404,
    "Employee not found"
);
  }

  return employee;
};

/**
 * Update Employee
 */
export const updateEmployeeService = async (id, employeeData) => {
  // Check Employee Exists
  const existingEmployee = await getEmployeeByIdRepository(id);

  if (!existingEmployee) {
    throw new ApiError(
    404,
    "Employee not found"
);
  }

  // Duplicate Phone Check
  if (
    employeeData.phone &&
    employeeData.phone !== existingEmployee.phone
  ) {
    const phoneExists = await findEmployeeByPhoneRepository(
      employeeData.phone
    );

    if (phoneExists) {
      throw new ApiError(
    409,
    "Phone already exists"
);
    }
  }

  const updatedEmployee = await updateEmployeeRepository(
    id,
    employeeData
  );

  return updatedEmployee;
};

/**
 * Delete Employee (Soft Delete)
 */
export const deleteEmployeeService = async (id) => {
  // Check Employee Exists
  const existingEmployee = await getEmployeeByIdRepository(id);

  if (!existingEmployee) {
    throw new ApiError(
    404,
    "Employee not found"
);
  }

  const deletedEmployee = await deleteEmployeeRepository(id);

  return deletedEmployee;
};
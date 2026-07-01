import {
  createEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/employeeService.js";

/**
 * Create Employee
 */
export const createEmployee = async (req, res) => {
  try {
    const employee = await createEmployeeService(req.body);

    return res.status(201).json({
      success: true,
      message: "Counsellor created successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Employees
 */
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployeesService();

    return res.status(200).json({
      success: true,
      message: "Counsellors fetched successfully",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Employee By ID
 */
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await getEmployeeByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Counsellor fetched successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Employee
 */
export const updateEmployee = async (req, res) => {
  try {
    const employee = await updateEmployeeService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Counsellor updated successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Employee
 */
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await deleteEmployeeService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Counsellor deactivated successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
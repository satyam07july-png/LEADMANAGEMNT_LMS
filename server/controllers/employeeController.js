import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService,
  restoreEmployeeService,
  getEmployeeStatisticsService,
} from "../services/employeeService.js";

export const createEmployee = asyncHandler(async (req, res) => {

  const employee =
    await createEmployeeService(
      req.body,
      req.user,
      req
    );

  return res.status(201).json(
    new ApiResponse(
      201,
      employee,
      "Employee created successfully."
    )
  );

});

export const getAllEmployees = asyncHandler(async (req, res) => {

  const employees =
    await getAllEmployeesService(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      employees,
      "Employees fetched successfully."
    )
  );

});

export const getEmployeeById = asyncHandler(async (req, res) => {

  const employee =
    await getEmployeeByIdService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee fetched successfully."
    )
  );

});

/**
 * =====================================================
 * Update Employee
 * =====================================================
 */

export const updateEmployee = asyncHandler(async (req, res) => {

  const employee = await updateEmployeeService(
    req.params.id,
    req.body,
    req.user,
    req
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee updated successfully."
    )
  );

});

export const deleteEmployee = asyncHandler(async (req, res) => {

  const employee =
    await deleteEmployeeService(
      req.params.id,
      req.user,
      req
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee deleted successfully."
    )
  );

});

export const restoreEmployee = asyncHandler(async (req, res) => {

  const employee = await restoreEmployeeService(
    req.params.id,
    req.user,
    req
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee restored successfully."
    )
  );

});

export const getEmployeeStatistics = asyncHandler(async (req,res)=>{

    const statistics =
    await getEmployeeStatisticsService();

    return res.status(200).json(

        new ApiResponse(

            200,

            statistics,

            "Employee statistics fetched successfully."

        )

    );

});
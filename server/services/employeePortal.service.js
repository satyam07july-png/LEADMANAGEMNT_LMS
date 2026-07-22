import {
  getDashboardSummaryRepository,
  getRecentLeadsRepository,
  getTodayFollowUpsRepository,
  getLeadStatusRepository,
} from "../repositories/employeePortal.repository.js";

import {
  findEmployeeByUserIdRepository
} from "../repositories/employeerepository.js";

export const getEmployeeDashboardService = async (userId) => {

  const employee =
    await findEmployeeByUserIdRepository(userId);

  if (!employee) {

    throw new Error("Employee profile not found.");

  }

  const employeeId = employee.id;

  const [

    summary,
    recentLeads,
    todayFollowUps,
    leadStatus

  ] = await Promise.all([

    getDashboardSummaryRepository(employeeId),

    getRecentLeadsRepository(employeeId),

    getTodayFollowUpsRepository(employeeId),

    getLeadStatusRepository(employeeId),

  ]);

  return {

    employee,

    summary,

    recentLeads,

    todayFollowUps,

    leadStatus

  };

};
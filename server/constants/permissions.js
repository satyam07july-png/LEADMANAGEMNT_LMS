/**
 * =====================================================
 * Permissions
 * Project : IEM Admissions CRM
 * =====================================================
 */

export const PERMISSIONS = Object.freeze({

  // Lead
  CREATE_LEAD: "create_lead",
  VIEW_LEAD: "view_lead",
  UPDATE_LEAD: "update_lead",
  DELETE_LEAD: "delete_lead",
  ASSIGN_LEAD: "assign_lead",

  // Employee
  CREATE_EMPLOYEE: "create_employee",
  VIEW_EMPLOYEE: "view_employee",
  UPDATE_EMPLOYEE: "update_employee",
  DELETE_EMPLOYEE: "delete_employee",

  // Course
  CREATE_COURSE: "create_course",
  VIEW_COURSE: "view_course",
  UPDATE_COURSE: "update_course",
  DELETE_COURSE: "delete_course",

  // Department
  CREATE_DEPARTMENT: "create_department",
  VIEW_DEPARTMENT: "view_department",
  UPDATE_DEPARTMENT: "update_department",
  DELETE_DEPARTMENT: "delete_department",

  // Dashboard
  VIEW_DASHBOARD: "view_dashboard",

  // User
  MANAGE_USERS: "manage_users",

});

export default PERMISSIONS;
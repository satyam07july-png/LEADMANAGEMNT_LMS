/**
 * =====================================================
 * File: roles.js
 * Project: IEM Admissions CRM
 * Description: Centralized Role Definitions
 * =====================================================
 */

const ROLES = Object.freeze({

  /**
   * =====================================================
   * System Roles
   * =====================================================
   */
  ADMIN: "ADMIN",

  MANAGER: "MANAGER",

  COUNSELLOR: "COUNSELLOR",

});

/**
 * =====================================================
 * Role Hierarchy
 * Higher number = Higher Privilege
 * =====================================================
 */
export const ROLE_PRIORITY = Object.freeze({

  COUNSELLOR: 1,

  MANAGER: 2,

  ADMIN: 3,

});

/**
 * =====================================================
 * Helper Functions
 * =====================================================
 */

/**
 * Check if role exists
 */
export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

/**
 * Check Admin
 */
export const isAdmin = (role) => {
  return role === ROLES.ADMIN;
};

/**
 * Check Manager
 */
export const isManager = (role) => {
  return role === ROLES.MANAGER;
};

/**
 * Check Counsellor
 */
export const isCounsellor = (role) => {
  return role === ROLES.COUNSELLOR;
};

/**
 * Check Role Hierarchy
 *
 * Example:
 * hasPermission("ADMIN","MANAGER")
 * => true
 */
export const hasPermission = (
  currentRole,
  requiredRole
) => {

  return (
    ROLE_PRIORITY[currentRole] >=
    ROLE_PRIORITY[requiredRole]
  );

};

export default ROLES;
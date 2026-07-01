import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import ROLES from "../constants/roles.js";
import PERMISSIONS from "../constants/permissions.js";

/**
 * =====================================================
 * Role Permission Mapping
 * Project : IEM Admissions CRM
 * =====================================================
 */

const ROLE_PERMISSIONS = Object.freeze({

  [ROLES.ADMIN]: [
    ...Object.values(PERMISSIONS),
  ],

  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,

    PERMISSIONS.CREATE_LEAD,
    PERMISSIONS.VIEW_LEAD,
    PERMISSIONS.UPDATE_LEAD,
    PERMISSIONS.ASSIGN_LEAD,

    PERMISSIONS.VIEW_EMPLOYEE,

    PERMISSIONS.VIEW_COURSE,

    PERMISSIONS.VIEW_DEPARTMENT,
  ],

  [ROLES.HR]: [
    PERMISSIONS.CREATE_EMPLOYEE,
    PERMISSIONS.VIEW_EMPLOYEE,
    PERMISSIONS.UPDATE_EMPLOYEE,

    PERMISSIONS.VIEW_DASHBOARD,
  ],

  [ROLES.COUNSELLOR]: [
    PERMISSIONS.VIEW_LEAD,
    PERMISSIONS.UPDATE_LEAD,

    PERMISSIONS.VIEW_COURSE,

    PERMISSIONS.VIEW_DASHBOARD,
  ],

  [ROLES.ACCOUNTANT]: [
    PERMISSIONS.VIEW_DASHBOARD,
  ],

  [ROLES.STUDENT]: [],

});

/**
 * =====================================================
 * Authorization Middleware
 * =====================================================
 */

const authorize = (...requiredPermissions) => {

  return (req, res, next) => {

    if (!req.user) {
      return next(
        new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          "Authentication required."
        )
      );
    }

    const role = req.user.role;

    const permissions =
      ROLE_PERMISSIONS[role] || [];

    const hasPermission =
      requiredPermissions.every(
        permission =>
          permissions.includes(permission)
      );

    if (!hasPermission) {

      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          "You do not have permission to perform this action."
        )
      );

    }

    next();

  };

};

export default authorize;
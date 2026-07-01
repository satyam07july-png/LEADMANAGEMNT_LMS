import ROLES from "./roles.js";
import PERMISSIONS from "./permissions.js";

const ROLE_PERMISSIONS = Object.freeze({

    [ROLES.ADMIN]: [
        ...Object.values(PERMISSIONS),
    ],

    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.CREATE_LEAD,
        PERMISSIONS.UPDATE_LEAD,
    ],

    [ROLES.COUNSELLOR]: [
        PERMISSIONS.VIEW_LEAD,
        PERMISSIONS.UPDATE_LEAD,
    ],

});

export default ROLE_PERMISSIONS;
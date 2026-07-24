const ROLES = Object.freeze({
    ADMIN: "ADMIN",
    COUNSELLOR: "COUNSELLOR",
});

export const isValidRole = (role) => {
    return Object.values(ROLES).includes(role);
};

export default ROLES;
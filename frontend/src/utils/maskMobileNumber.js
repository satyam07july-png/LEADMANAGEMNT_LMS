export const maskMobileNumber = (mobile) => {
    if (!mobile || mobile.length !== 10) return mobile;

    return `${mobile.slice(0, 6)}XXXX`;
};
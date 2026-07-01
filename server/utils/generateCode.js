const generateCode = (prefix, lastCode) => {
  if (!lastCode) {
    return `${prefix}000001`;
  }

  const number = parseInt(
    lastCode.replace(prefix, ""),
    10
  );

  return `${prefix}${String(number + 1).padStart(6, "0")}`;
};

export default generateCode;
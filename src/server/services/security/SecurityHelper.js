
function errorOrFalse(error, throwError = true) {
  if (throwError) {
    throw error;
  } else {
    return false;
  }
}

module.exports = {
  errorOrFalse
};

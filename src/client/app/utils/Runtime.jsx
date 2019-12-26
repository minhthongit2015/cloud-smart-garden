

const isLocal = window.location.hostname.includes('localhost');
const isStaging = window.location.hostname.includes('staging');
const isDevelopment = isLocal || isStaging;
const isProduction = !isDevelopment;


export default {
  isLocal,
  isStaging,
  isDevelopment,
  isProduction
};

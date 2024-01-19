const process_env_status = process.env.REACT_APP_ENV_STATUS;

console.log(`⚠️ Couldn't find process.env file ⚠️: ${process_env_status}`);
// console.log(`⚠️ Couldn't find window._env_ file ⚠️: ${window_env_status}`);

const config = {
  BASE_URL:
    window._env_.REACT_APP_BASE_URL,
    // //  ||
    // process.env.REACT_APP_BASE_URL,
  CLIENT_ID:
    window._env_.REACT_APP_CLIENT_ID,
    // ||
    // process.env.REACT_APP_CLIENT_ID,
  CLIENT_SECRET:
    window._env_.REACT_APP_CLIENT_SECRET,
    // ||
    // process.env.REACT_APP_CLIENT_SECRET,
  AD_CLIENT_ID:
    window._env_.REACT_APP_AD_CLIENT_ID,
    // ||
    // process.env.REACT_APP_AD_CLIENT_ID,
  AD_AUTHORITY:
    window._env_.REACT_APP_AUTHORITY_URL,
    // ||
    // process.env.REACT_APP_AUTHORITY_URL,
};

const { BASE_URL, CLIENT_ID, CLIENT_SECRET, AD_CLIENT_ID, AD_AUTHORITY } =
  config;

module.exports = {
  BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  AD_CLIENT_ID,
  AD_AUTHORITY,
};

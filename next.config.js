const currentUrl = process.env.BASE_URL;
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  reactStrictMode: false,

  env: {
    HOST: currentUrl,
  },
};

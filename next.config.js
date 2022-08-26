const { i18n } = require("./next-i18next.config");

const currentUrl = process.env.BASE_URL;

module.exports = {
  i18n,
  reactStrictMode: false,

  env: {
    HOST: currentUrl,
  },
};

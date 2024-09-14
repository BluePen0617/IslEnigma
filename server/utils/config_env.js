require("dotenv").config()

module.exports = [
  "PORT",
  "STRIPE_PRIVATE_KEY",
  "STRIPE_ENDPOINT_SECRET",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "RECAPTCHA_SECRET_KEY",
  "LINE_PAY_SITE",
  "LINE_PAY_SECRET",
  "LINE_PAY_CHANNELID",
  "MerchantID",
  "HashKey",
  "HashIV",
].reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {})

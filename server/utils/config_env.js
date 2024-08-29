require("dotenv").config

const PORT = process.env.PORT
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
const LINE_PAY_SITE = process.env.LINE_PAY_SITE
const LINE_PAY_SECRET = process.env.LINE_PAY_SECRET
const LINE_PAY_CHANNELID = process.env.LINE_PAY_CHANNELID
const MerchantID = process.env.MerchantID
const HashKey = process.env.HashKey
const HashIV = process.env.HashIV

module.exports = {
  PORT,
  STRIPE_PRIVATE_KEY,
  STRIPE_ENDPOINT_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  RECAPTCHA_SECRET_KEY,
  LINE_PAY_SITE,
  LINE_PAY_SECRET,
  LINE_PAY_CHANNELID,
  MerchantID,
  HashKey,
  HashIV,
}

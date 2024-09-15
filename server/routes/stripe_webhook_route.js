const express = require("express")
const router = express.Router()
const stripe_webhook_controller = require("../controllers/stripe/create_checkout_session")

router.post("/", stripe_webhook_controller)

module.exports = router

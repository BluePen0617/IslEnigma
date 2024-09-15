const express = require("express")
const router = express.Router()
const stripe_webhook_controller = require("../controllers/stripe/stripe_webhook_controller")

router.post("/", stripe_webhook_controller)

module.exports = router

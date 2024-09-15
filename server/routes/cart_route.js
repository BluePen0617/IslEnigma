const express = require("express")
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const authMiddleware = require("../middlewares/authToken")

// import controller
const { cart_controller } = require("../controllers/cart_controller")
const linepay_controller = require("../controllers/linepay/linepay_controller")
const check_payment = require("../controllers/linepay/check_payment")
const create_checkout_session = require("../controllers/stripe/create_checkout_session")
const pay_ecPay = require("../controllers/ecpay/pay_ecpay")
const callback_ecPay = require("../controllers/ecpay/callback_ecPay")
const {
  get_cart_items,
  new_order,
  update_item_quantity,
  remove_item,
  new_cart_item,
} = cart_controller
const { verifyToken } = authMiddleware
// all items
router.get("/", verifyToken, get_cart_items)

router.post("/new_cart_item", verifyToken, new_cart_item)
// new order
router.post("/", verifyToken, new_order)

// update item quantity
router.put("/:id", verifyToken, update_item_quantity)

// delete item
router.delete("/:id", verifyToken, remove_item)

// linePay create payment
router.post("/line-test", verifyToken, linepay_controller)

// linePay check payment
router.post("/line-test/check-payment", check_payment)

// create stripe payment
router.post("/create-checkout-session", create_checkout_session)

// ecPay create payment
router.post("/ecpay", verifyToken, pay_ecPay)

//ecPay call back
router.post("/payment/:id", callback_ecPay)

module.exports = router

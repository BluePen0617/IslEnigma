const express = require("express")
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const authMiddleware = require("../middlewares/authToken")
const crypto = require("crypto")

// import controller
const { cart_controller } = require("../controllers/cart_controller")
const {
  LINE_PAY_SITE,
  LINE_PAY_SECRET,
  LINE_PAY_CHANNELID,
  HashKey,
  MerchantID,
  HashIV,
} = require("../utils/config_env")
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
router.post("/line-test", verifyToken, async (req, res, next) => {
  const { data, orderInfo } = req.body
  const { total_amount, order_id, order_item } = data

  const products = order_item.map((item) => {
    if (item.room) {
      return {
        id: `${item.room.room_id}`,
        name: item.room.room_type,
        imageUrl: item.room.img.url,
        quantity: item.quantity,
        price: item.room.price,
      }
    } else if (item.ticket) {
      return {
        id: `${item.ticket.ticket_id}`,
        name: item.ticket.type,
        imageUrl: item.ticket.img.url,
        quantity: item.quantity,
        price: item.ticket.price,
      }
    }
  })

  function handleBigInteger(text) {
    const largeNumberRegex = /:\s*(\d{16,})\b/g
    const processedText = text.replace(largeNumberRegex, ': "$1"')

    const data = JSON.parse(processedText)

    return data
  }
  function signKey(clientKey, msg) {
    const encoder = new TextEncoder()
    return crypto
      .createHmac("sha256", encoder.encode(clientKey))
      .update(encoder.encode(msg))
      .digest("base64")
  }

  async function requestOnlineAPI({
    method,
    baseUrl = LINE_PAY_SITE,
    apiPath,
    queryString = "",
    data = null,
    signal = null,
  }) {
    const nonce = crypto.randomUUID()
    let signature = ""

    if (method === "GET") {
      signature = signKey(
        LINE_PAY_SECRET,
        LINE_PAY_SECRET + apiPath + queryString + nonce
      )
    } else if (method === "POST") {
      signature = signKey(
        LINE_PAY_SECRET,
        LINE_PAY_SECRET + apiPath + JSON.stringify(data) + nonce
      )
    }
    const headers = {
      "X-LINE-ChannelId": LINE_PAY_CHANNELID,
      "X-LINE-Authorization": signature,
      "X-LINE-Authorization-Nonce": nonce,
    }

    const response = await fetch(
      `${baseUrl}${apiPath}${queryString !== "" ? "&" + queryString : ""}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: data ? JSON.stringify(data) : null,
        signal: signal,
      }
    )

    const processedResponse = handleBigInteger(await response.text())
    console.log(processedResponse)
    return processedResponse
  }

  try {
    let response = await requestOnlineAPI({
      method: "POST",
      baseUrl: LINE_PAY_SITE,
      apiPath: "/v3/payments/request",
      data: {
        amount: total_amount,

        currency: "TWD",
        orderId: order_id,
        packages: [
          {
            id: order_id,
            amount: total_amount,
            products: products,
          },
        ],

        redirectUrls: {
          confirmUrl: "https://localhost:5173/cart/shoppingSuccess",
          cancelUrl: "https://store.example.com/order/payment/cancel",
        },
      },
    })

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
})

// linePay check payment
router.post("/line-test/check-payment", async (req, res) => {
  const { transactionId, orderId, order_info } = req.body
  const order_id = parseInt(orderId)

  function handleBigInteger(text) {
    const largeNumberRegex = /:\s*(\d{16,})\b/g
    const processedText = text.replace(largeNumberRegex, ': "$1"')

    const data = JSON.parse(processedText)

    return data
  }

  function signKey(clientKey, msg) {
    const encoder = new TextEncoder()
    return crypto
      .createHmac("sha256", encoder.encode(clientKey))
      .update(encoder.encode(msg))
      .digest("base64")
  }

  async function requestOnlineAPI({
    method,
    baseUrl = LINE_PAY_SITE,
    apiPath,
    queryString = "",
    data = null,
    signal = null,
  }) {
    const nonce = crypto.randomUUID()
    let signature = ""

    if (method === "GET") {
      signature = signKey(
        LINE_PAY_SECRET,
        LINE_PAY_SECRET + apiPath + queryString + nonce
      )
    } else if (method === "POST") {
      signature = signKey(
        LINE_PAY_SECRET,
        LINE_PAY_SECRET + apiPath + JSON.stringify(data) + nonce
      )
    }
    const headers = {
      "X-LINE-ChannelId": LINE_PAY_CHANNELID,
      "X-LINE-Authorization": signature,
      "X-LINE-Authorization-Nonce": nonce,
    }

    const response = await fetch(
      `${baseUrl}${apiPath}${queryString !== "" ? "&" + queryString : ""}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: data ? JSON.stringify(data) : null,
        signal: signal,
      }
    )

    const processedResponse = handleBigInteger(await response.text())

    return processedResponse
  }

  const order = await prisma.customer_order.findUnique({
    where: { order_id: parseInt(orderId) },
    select: {
      total_amount: true,
    },
  })

  try {
    let response = await requestOnlineAPI({
      method: "POST",
      baseUrl: LINE_PAY_SITE,
      apiPath: `/v3/payments/${transactionId}/confirm`,
      data: {
        amount: order.total_amount,
        currency: "TWD",
      },
    })
    if (response.returnCode === "0000") {
      await prisma.customer_order.update({
        where: {
          order_id,
        },
        data: {
          status: "PAID",
        },
      })

      const info = await prisma.order_info.create({
        data: {
          ...order_info,
          order_id,
        },
      })
    }

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// create stripe payment
router.post("/create-checkout-session", async (req, res) => {
  const { data, orderInfo } = req.body
  const order_id = data.order_id
  const order_info_json = JSON.stringify(orderInfo)

  try {
    const session = await stripe.checkout.sessions.create({
      //metadata只接受string
      metadata: {
        order_id,
        order_info: order_info_json,
      },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: data.order_item.map((item) => {
        return {
          price_data: {
            currency: "TWD",
            product_data: {
              name: item.room?.room_type || item.ticket?.type,
            },
            unit_amount: item.room?.price || item.ticket?.price,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `https://localhost:5173/cart/shoppingSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://localhost:5173/cart/checkout`,
    })

    res.json({ url: session.url })
    console.log(session)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

// ecPay create payment
router.post("/ecpay", verifyToken, async (req, res) => {
  const { amount, itemName, cusInfo } = req.body
  const { customer, phone_number, address } = cusInfo
  function generateCheckMacValue(params) {
    const filteredParams = Object.keys(params).reduce((acc, key) => {
      if (key !== "CheckMacValue") {
        acc[key] = params[key]
      }
      return acc
    }, {})

    const sortedParams = Object.keys(filteredParams)
      .sort()
      .reduce((acc, key) => {
        acc[key] = filteredParams[key]
        return acc
      }, {})

    let checkString = `HashKey=${HashKey}`
    Object.keys(sortedParams).forEach((key) => {
      checkString += `&${key}=${sortedParams[key]}`
    })
    checkString += `&HashIV=${HashIV}`

    let encodedString = encodeURIComponent(checkString).toLowerCase()

    encodedString = encodedString
      .replace(/%20/g, "+")
      .replace(/%21/g, "!")
      .replace(/%2a/g, "*")
      .replace(/%28/g, "(")
      .replace(/%29/g, ")")
      .replace(/%2d/g, "-")
      .replace(/%5f/g, "_")
      .replace(/%2e/g, ".")

    const hash = crypto.createHash("sha256").update(encodedString).digest("hex")

    return hash.toUpperCase()
  }

  function formatDate(date) {
    const pad = (num) => (num < 10 ? "0" + num : num)

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
  }

  const itemStrings = itemName
    .map((item) => {
      if (item.room) {
        return `${item.room.room_type} x ${item.quantity}`
      } else if (item.ticket) {
        return `${item.ticket.type} x ${item.quantity}`
      } else {
        return null
      }
    })
    .filter(Boolean)

  const merchantTradeNo = `TEST${Date.now()}`
  const merchantTradeDate = formatDate(new Date())
  const params = {
    MerchantID,
    MerchantTradeNo: merchantTradeNo,
    MerchantTradeDate: merchantTradeDate,
    PaymentType: "aio",
    TotalAmount: amount,
    TradeDesc: "測試交易",
    ItemName: itemStrings,
    ReturnURL: "https://localhost:5173/cart/shoppingSuccess",
    ClientBackURL: "https://localhost:5173/cart/shoppingSuccess",
    OrderResultURL: `http://localhost:3001/cart/payment/${itemName[0].order_id}`,
    ChoosePayment: "ALL",
    EncryptType: "1",
    CustomField1: customer,
    CustomField2: phone_number,
    CustomField3: address,
  }

  const checkMacValue = generateCheckMacValue(params)

  const formData = {
    ...params,
    CheckMacValue: checkMacValue,
  }
  res.json({ formData })
})

//ecPay call back

router.post("/payment/:id", async (req, res) => {
  const order_id = parseInt(req.params.id)

  const {
    CustomField1: customer,
    CustomField2: phone_number,
    CustomField3: address,
    PaymentType: payment_method,
  } = req.body

  try {
    await prisma.customer_order.update({
      where: {
        order_id,
      },
      data: {
        status: "PAID",
      },
    })

    await prisma.order_info.create({
      data: {
        customer,
        phone_number,
        address,
        order_id,
        payment_method,
      },
    })
    res.redirect("https://localhost:5173/cart/shoppingSuccess")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// router.post("/payment-status", (req, res) => {
//   const { sessionIdParam } = req.body

//   stripe.checkout.sessions.retrieve(sessionIdParam, (err, session) => {
//     if (err) {
//       res.status(500).json(err)
//     } else {
//       res.status(200).json(session)
//     }
//   })
// })

// router.post("/order-info", async (req, res) => {
//   console.log(123)
//   try {
//     const res = await prisma.order_info.create({
//       data: {
//         order_info_id: "info2",
//         order_id: "order123",
//         customer: "Eric",
//         phone_number: "0982748292",
//         address: "台灣市台中路",
//         payment_method: "CREDITCARD",
//       },
//     })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json(e)
//   }
// })

module.exports = router

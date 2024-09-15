const crypto = require("crypto")
const { HashKey, MerchantID, HashIV } = require("../../utils/config_env")

const pay_ecPay = async (req, res) => {
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
}

module.exports = pay_ecPay

const { LINE_PAY_SITE } = require("../../utils/config_env")
const linePayUtils = require("../../utils/linepay_utils")

const linepay_controller = async (req, res, next) => {
  const { data, orderInfo } = req.body
  const { total_amount, order_id, order_item } = data

  //將商品資訊轉為linePay所需格式
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

  try {
    //創建linePay支付請求
    //向requestOnlineAPI function 傳入商品資訊以及回傳網址
    let response = await linePayUtils.requestOnlineAPI({
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
}

module.exports = linepay_controller

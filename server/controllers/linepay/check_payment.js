const linePayUtils = require("../../utils/linepay_utils")
const { LINE_PAY_SITE } = require("../../utils/config_env")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const check_payment = async (req, res) => {
  const { transactionId, orderId, order_info } = req.body
  const order_id = parseInt(orderId)

  const order = await prisma.customer_order.findUnique({
    where: { order_id: parseInt(orderId) },
    select: {
      total_amount: true,
    },
  })
  try {
    let response = await linePayUtils.requestOnlineAPI({
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
}

module.exports = check_payment

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const callback_ecPay = async (req, res) => {
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
}

module.exports = callback_ecPay

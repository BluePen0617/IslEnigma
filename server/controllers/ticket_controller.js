const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var { v4: uuidv4 } = require("uuid")
const { ticket } = require("../models/memberInfo_models")

const addTicketItem = async (req, res) => {
  try {
    const memberId = req.user.id
    const ticketData = req.body
    const order = await prisma.customer_order.findFirst({
      where: {
        member_id: memberId,
        status: "CREATED",
      },
      select: {
        order_id: true,
      },
    })

    const orderId = order?.order_id
    ticketData.forEach(async (data) => {
      if (data.quantity > 0) {
        const { id: ticket_id, booked_date, quantity } = data

        await prisma.order_item.create({
          data: {
            order_item_id: uuidv4(),
            order_id: orderId,
            ticket_id,
            check_in_date: new Date(booked_date),
            quantity,
          },
        })

        const ticket = await prisma.ticket.findUnique({
          where: {
            ticket_id,
          },
          select: {
            price: true,
          },
        })
        const od = await prisma.customer_order.update({
          where: { order_id: orderId },
          data: {
            total_amount: {
              increment: ticket.price * quantity,
            },
          },
        })
      }
    })

    res.status(200).json({ message: "成功加入購物車" })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err })
  }
}
module.exports = addTicketItem

//@author : 許哲誠
//東西太多了考慮改用FP
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const passwordHelpers = require("../utils/passwordHelpers")
const order = {
  read: async (memberId, res) => {
    try {
      const orders = await prisma.customer_order.findMany({
        where: {
          member_id: memberId,
          status: "PAID",
        },
      })

      for (const order of orders) {
        const orderID = order.order_id
        const orderItems = await prisma.order_item.findMany({
          where: {
            order_id: orderID,
          },
          select: {
            room_id: true,
            ticket_id: true,
            check_in_date: true,
            check_out_date: true,
            quantity: true,
          },
        })
        const orderInfo = await prisma.order_info.findFirst({
          where: {
            order_id: orderID,
          },
          select: {
            customer: true,
            address: true,
            phone_number: true,
            payment_method: true,
          },
        })
        order.orderItems = orderItems
        order.orderInfo = orderInfo
      }

      return orders
    } catch (error) {
      console.error("getOrder error:", error)
      res.status(500).json({ error: "bad Server" })
    }
  },
}
const payMethod = {
  create: async (memberId, payMethodData) => {
    const { cardNumber, expiryDate, cvv } = payMethodData
    console.log(132)
    console.log(memberId)
    console.log(payMethodData)
    try {
      const newPayMethod = await prisma.credit_card.create({
        data: {
          member_id: memberId,
          number: cardNumber,
          expiry: new Date(expiryDate),
          cvv,
        },
      })
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  read: async (memberId) => {
    try {
      const payMethod = await prisma.credit_card.findMany({
        where: {
          member_id: memberId,
        },
      })
      return payMethod
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  delete: async (memberId, payMethodNum) => {
    try {
      const creditCard = await prisma.credit_card.findFirst({
        where: {
          member_id: memberId,
          number: payMethodNum,
        },
      })
      const deleteCreditCard = await prisma.credit_card.delete({
        where: {
          credit_card_id: creditCard.credit_card_id,
        },
      })
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
const memberInfo = {
  read: async (memberId) => {
    try {
      const memberInfo = await prisma.member.findUnique({
        where: {
          member_id: memberId,
        },
      })
      return memberInfo
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  update: async (memberId, memberInfoData) => {
    try {
      const updateMemberInfo = await prisma.member.update({
        where: {
          member_id: memberId,
        },
        data: {
          account: memberInfoData.email,
          name: memberInfoData.name,
          address: memberInfoData.address,
          phone: memberInfoData.phone,
          birth: new Date(memberInfoData.birth),
        },
      })
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
const password = {
  read: async (memberId) => {
    try {
      const password = await prisma.member.findUnique({
        where: {
          member_id: memberId,
        },
      })
      return password
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  update: async (memberId, newPassword) => {
    try {
      const hashedPassword = await passwordHelpers.hash(newPassword)
      const updatePassword = await prisma.member.update({
        where: {
          member_id: memberId,
        },
        data: {
          password: hashedPassword,
        },
      })
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
const ticket = {
  read: async (ticketId) => {
    try {
      const ticket = await prisma.ticket.findUnique({
        where: {
          ticket_id: ticketId,
        },
        select: {
          type: true,
        },
      })
      return { name: ticket.type }
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
const room = {
  read: async (roomId) => {
    try {
      const room = await prisma.room.findUnique({
        where: {
          room_id: roomId,
        },
        select: {
          room_type: true,
        },
      })
      return { name: room.room_type }
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
module.exports = {
  ticket,
  room,
  order,
  payMethod,
  memberInfo,
  password,
}

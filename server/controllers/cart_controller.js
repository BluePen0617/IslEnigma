const { PrismaClient } = require("@prisma/client")
const { v4: uuidv4 } = require("uuid")
const prisma = new PrismaClient()

const cart_controller = {
  get_cart_items: async (req, res) => {
    const { id } = req.user
    try {
      let shoppingCartWithItems = await prisma.customer_order.findFirst({
        where: {
          member_id: id,
          status: "CREATED",
        },
        include: {
          order_item: {
            include: {
              room: true,
              ticket: true,
            },
          },
        },
      })

      if (!shoppingCartWithItems) {
        shoppingCartWithItems = await prisma.customer_order.create({
          data: {
            member_id: id,
            status: "CREATED",
            total_amount: 0,
          },
          include: {
            order_item: {
              include: {
                room: true,
                ticket: true,
              },
            },
          },
        })
      }

      res.status(200).json(shoppingCartWithItems)
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." })
    }
  },

  new_cart_item: async (req, res) => {
    const {
      // order_id = null,
      dateRange,
      people,
      roomId,
      roomCount: room_count,
    } = req.body

    const member_id = req.user.id

    const order = await prisma.customer_order.findFirst({
      where: {
        member_id,
        status: "CREATED",
      },
      select: {
        order_id: true,
      },
    })
    const order_id = order.order_id
    // const memberWithOrders = await prisma.member.findUnique({
    //   where: {
    //     member_id, // Replace `member_id` with the actual ID variable
    //   },
    //   include: {
    //     customer_order: {
    //       where: {
    //         status: "CREATED",
    //       },

    //       select: {
    //         order_id: true,
    //       },
    //     },
    //   },
    // })
    // console.log(memberWithOrders)

    try {
      const existingItem = await prisma.order_item.findFirst({
        where: {
          order_id: order_id,
          room_id: roomId ?? null,
          check_in_date: dateRange[0],
          check_out_date: dateRange[1],
        },
      })

      if (existingItem) {
        return res.status(400).json("該日期範圍已經在購物車中!")
      }

      const room = await prisma.room.findUnique({
        where: { room_id: roomId },
        select: { price: true },
      })

      if (!room) {
        return res.status(404).json("房間不存在")
      }

      const currentOrder = await prisma.customer_order.findUnique({
        where: { order_id },
        select: { total_amount: true },
      })

      if (!currentOrder) {
        return res.status(404).json("訂單不存在")
      }

      // const newTotalAmount = currentOrder.total_amount + room.price

      const od = await prisma.customer_order.update({
        where: { order_id },
        data: {
          total_amount: {
            increment: room.price,
          },
        },
      })

      await prisma.order_item.create({
        data: {
          order_item_id: uuidv4(),
          order_id,
          room_id: roomId || null,
          check_in_date: dateRange[0],
          check_out_date: dateRange[1],
          people_count: people,
          quantity: 1,
          room_count,
        },
      })
      res.status(200).json("成功新增商品!")
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  new_order: async (req, res) => {
    const { cartItems } = req.body

    if (cartItems.length === 0) return
    try {
      const updatedOrderItem = await prisma.customer_order.update({
        where: {
          order_id: cartItems[0].order_id,
        },
        data: {
          status: "PAID",
        },
      })
      return res.json(updatedOrderItem)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Failed to update order item status" })
    }
    res.json("good")
  },
  update_item_quantity: async (req, res) => {
    const { quantity } = req.body
    const itemId = req.params.id

    try {
      const currentItem = await prisma.order_item.findUnique({
        where: { order_item_id: itemId },
        select: {
          quantity: true,
          order_id: true,
          room: {
            select: { price: true },
          },
          ticket: {
            select: { price: true },
          },
        },
      })

      if (!currentItem) {
        return res.status(404).json({ message: "Item not found" })
      }

      const unitPrice = currentItem.room
        ? currentItem.room.price
        : currentItem.ticket.price
      const oldQuantity = currentItem.quantity
      const priceDifference = unitPrice * (quantity - oldQuantity)

      const updatedItem = await prisma.order_item.update({
        where: { order_item_id: itemId },
        data: { quantity },
      })

      const updatedOrder = await prisma.customer_order.update({
        where: { order_id: currentItem.order_id },
        data: {
          total_amount: {
            increment: priceDifference,
          },
        },
      })

      console.log(updatedOrder)

      res.status(200).json({ updatedItem, updatedOrder })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  remove_item: async (req, res) => {
    const id = req.params.id
    try {
      const currentItem = await prisma.order_item.findUnique({
        where: { order_item_id: id },
        select: {
          quantity: true,
          order_id: true,
          room: {
            select: { price: true },
          },
          ticket: {
            select: { price: true },
          },
        },
      })

      if (!currentItem) {
        return res.status(404).json({ message: "Item not found" })
      }

      const unitPrice = currentItem.room
        ? currentItem.room.price
        : currentItem.ticket.price
      const totalPrice = unitPrice * currentItem.quantity

      const response = await prisma.order_item.delete({
        where: {
          order_item_id: id,
        },
      })

      const updatedOd = await prisma.customer_order.update({
        where: { order_id: currentItem.order_id },
        data: {
          total_amount: {
            decrement: totalPrice,
          },
        },
      })
      console.log(updatedOd)
      res.status(200).json(response)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
}

module.exports = { cart_controller }

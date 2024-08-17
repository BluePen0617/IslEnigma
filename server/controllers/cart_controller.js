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
    const { order_id, dateRange, people } = req.body
    console.log(req.body)

    const existingItem = await prisma.order_item.findFirst({
      where: {
        order_id: order_id,
        room_id: req.body.roomId ?? null,
        ticket_id: req.body.ticketId ?? null,
        check_in_date: dateRange[0],
        check_out_date: dateRange[1],
      },
    })

    if (existingItem) {
      return res.status(400).json("剛日期範圍已經在購物車中!")
    }

    try {
      await prisma.order_item.create({
        data: {
          order_item_id: uuidv4(),
          order_id,
          room_id: req.body.roomId || null,
          check_in_date: dateRange[0],
          check_out_date: dateRange[1],
          people_count: people,
          quantity: 1,
        },
      })

      res.status(200).json("成功新增商品!")
      res.status(200)
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
    console.log(itemId, quantity)
    try {
      const updatedItem = await prisma.order_item.update({
        where: {
          order_item_id: itemId,
        },
        data: {
          quantity,
        },
      })

      console.log(updatedItem)
      res.status(200).json(updatedItem)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  remove_item: async (req, res) => {
    const id = req.params.id

    try {
      const response = await prisma.order_item.delete({
        where: {
          order_item_id: id,
        },
      })

      res.status(200).json(response)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = { cart_controller }

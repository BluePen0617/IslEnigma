const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const search_rooms_controller = async (req, res) => {
  const { dateRange, roomCount, people } = req.body
  console.log(dateRange)
  const paidOrderItems = await prisma.order_item.findMany({
    where: {
      customer_order: {
        status: "PAID",
      },
      check_in_date: {
        lte: dateRange[1],
      },
      check_out_date: {
        gte: dateRange[0],
      },
    },
    include: {
      room: true,
    },
  })
  const room_ids = paidOrderItems
    .map((item) => item.room_id)
    .filter((id) => id !== null)

  const allRooms = await prisma.room.findMany()
  const availableRooms = allRooms.filter(
    (room) => !room_ids.includes(room.room_id)
  )

  const filteredRooms = availableRooms.filter((room) => {
    const capacity = room.capacity >= people
    const room_count = room.room_count >= roomCount
    return capacity && room_count
  })

  res.status(200).json(filteredRooms)
}

module.exports = search_rooms_controller

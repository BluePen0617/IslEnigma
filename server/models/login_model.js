//@author: 許哲誠
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const login_Model = {
  read: async (account) => {
    try {
      const member = await prisma.member.findUnique({
        where: {
          account: account,
        },
      })
      return member
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
module.exports = login_Model

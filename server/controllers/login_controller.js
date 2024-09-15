//@author : 許哲誠
const login_model = require("../models/login_model")
const passwordHelpers = require("../utils/passwordHelpers")
const generateToken = require("../utils/jwtHelpers")
const cookieHelpers = require("../utils/setCookie")
const validReCaptcha = require("../utils/validReCaptcha")
const { PrismaClient } = require("@prisma/client")
const { randomUUID } = require("crypto")
const { v4: uuidv4 } = require("uuid")

const prisma = new PrismaClient()
const login_controller = {
  login: async (req, res) => {
    try {
      const { account, password, token } = req.body.memberData
      const { localCartData = null } = req.body
      const member = await login_model.read(account)

      const isReCaptchaValid = await validReCaptcha.valid(token)
      if (!isReCaptchaValid.success) {
        return res.status(422).json({
          error: "ReCaptcha 驗證失敗",
          message: "提供的 ReCaptcha 響應無效或已過期。請重試。",
        })
      }
      if (!member) {
        return res.status(404).json({
          error: "未找到",
          message: "找不到用戶，是否以註冊?",
        })
      }

      const isPasswordCorrect = await passwordHelpers.compare(
        password,
        member.password
      )
      if (!isPasswordCorrect) {
        return res.status(401).json({
          error: "認證失敗",
          message: "密碼不正確。",
        })
      }

      const total_amount = localCartData?.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)

      let userCart = await prisma.customer_order.findFirst({
        where: {
          member_id: member.member_id,
          status: "CREATED",
        },
      })
      if (!userCart) {
        userCart = await prisma.customer_order.create({
          data: {
            member_id: member.member_id,
            total_amount: total_amount || 0,
            status: "CREATED",
          },
        })
      } else {
        await prisma.customer_order.update({
          where: {
            order_id: userCart.order_id,
            status: "CREATED",
          },
          data: {
            total_amount: {
              increment: total_amount || 0,
            },
          },
        })
      }
      const convertToDate = (dateString) => {
        if (!dateString) return null
        const [year, month, day] = dateString.split("/")
        return new Date(year, month - 1, day)
      }

      if (localCartData) {
        const createOrderItems = localCartData.map((data) =>
          prisma.order_item.create({
            data: {
              order_item_id: uuidv4(),
              check_in_date:
                convertToDate(data.booked_date) ||
                (data.dateRange ? data.dateRange[0] : null),
              check_out_date: data.dateRange ? data.dateRange[1] : null,
              ticket_id: data.roomId ? null : data.id,
              room_id: data.roomId ?? null,
              people_count: data.people ?? null,
              room_count: data.roomCount,
              quantity: data.quantity,
              order_id: userCart.order_id,
            },
          })
        )

        await Promise.all(createOrderItems)
      }

      const payload = {
        account: member.account,
        id: member.member_id,
      }

      const { password: pwd, ...memberData } = member
      const cookieToken = await generateToken.generateToken(payload)
      await cookieHelpers.setAuthCookie(res, cookieToken)
      res.status(200).json({ message: `歡迎回來! ${member.name}!`, memberData })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({ error: "Server error" })
    }
  },
}
module.exports = login_controller

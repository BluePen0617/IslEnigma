//@author : 許哲誠
const express = require("express")
const router = express.Router()
const login_controller = require("../controllers/login_controller")
const register_controller = require("../controllers/register_controller")
const logout_controller = require("../controllers/logout_controller")
const authToken = require("../middlewares/authToken")
const { verifyToken } = authToken
const {
  getOrder,
  getPayMethod,
  postPayMethod,
  deletePayMethod,
  getMemberInfo,
  putMemberInfo,
  changePassword,
} = require("../controllers/memberInfo_controllers")

router.post("/login", login_controller.login)
router.post("/register", register_controller.register)
router.post("/logout", verifyToken, logout_controller)
router.get("/order", verifyToken, getOrder)

router.get("/payMethod", verifyToken, getPayMethod)
router.post("/payMethod", verifyToken, postPayMethod)
router.delete("/payMethod", verifyToken, deletePayMethod)

router.get("/memberInfo", verifyToken, getMemberInfo)
router.put("/memberInfo", verifyToken, putMemberInfo)

router.post("/changePassword", verifyToken, changePassword)

module.exports = router

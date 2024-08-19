const cookieHelpers = require("../utils/setCookie")

console.log(123)
console.log(cookieHelpers)
const logout_controller = (req, res) => {
  try {
    res.clearCookie("JWTToken")

    res.status(200).json({ message: "成功登出" })
  } catch (error) {
    console.log("登出時發生錯誤", error.message)
    res.status(500).json({ error: "發生錯誤" })
  }
}

module.exports = logout_controller

//@author : 許哲誠
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../utils/config_env")

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.JWTToken
    if (!token) {
      return res.status(401).json({ error: "No token" })
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = decoded
      return next()
    } catch (error) {
      console.error("Token verify failed:", error)
      return res.status(401).json({ error: "bad token" })
    }
  },
}
module.exports = authMiddleware

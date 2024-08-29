require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
app.use(cookieParser())
require("dotenv").config()
const member_route = require("./routes/member_route")
const cart_route = require("./routes/cart_route")
const stripe_webhook_route = require("./routes/stripe_webhook_route")
const search_rooms_route = require("./routes/search_rooms_route")
const map_route = require("./routes/map_route")
const ticket_route = require("./routes/ticket_route")
const { PORT } = require("./utils/config_env")

app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [
      "https://localhost:5173",
      "http://api.openweathermap.org/data/2.5/weather",
    ],
    credentials: true,
  })
)

app.use(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripe_webhook_route
)
app.use(express.json())
app.use("/member", member_route)
app.use("/rooms", search_rooms_route)
app.use("/cart", cart_route)
app.use("/map", map_route)
app.use("/ticket", ticket_route)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

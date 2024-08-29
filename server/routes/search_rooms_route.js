const express = require("express")
const router = express.Router()

const search_rooms_controller = require("../controllers/search_rooms_controller")
const search_rooms_date = require("../controllers/serach _rooms_date")

router.post("/", search_rooms_controller)
router.post("/:id", search_rooms_date)
module.exports = router

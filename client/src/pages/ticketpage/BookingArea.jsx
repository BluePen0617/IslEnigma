import React, { useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import BookingTicketOption from "./BookingTicketOption.jsx"
import Button from "/src/components/common/Button.jsx"
import DateCalendar from "./DateCalendar.jsx"
import "react-calendar/dist/Calendar.css"
import Cookies from "universal-cookie"
import axios from "axios"
import { useAuthContext } from "../../context/AuthContext.jsx"

function BookingArea({
  dateShow,
  showCalendar,
  handleAlertShow,
  handleAlertShowDate,
  handleAlertShowCart,
  bookingDate,
  selectDate,
  standardNum,
  setStandardNum,
  plusStandard,
  minusStandard,
  zeroStandard,
  VIPNum,
  setVIPNum,
  plusVIP,
  minusVIP,
  zeroVIP,
}) {
  const { member } = useAuthContext()

  // 點選左右箭頭更換月份
  let [date, setDate] = useState(new Date())
  let changeView = ({ activeStartDate }) => {
    setDate(activeStartDate)
  }
  // 設定不可選的日期樣式
  let today = new Date()
  today.setHours(0, 0, 0, 0) // 需要清除時間再進行比較，否則當天也會小於 new Date()
  let tileClassName = ({ date, view }) => {
    if (view === "month" && date < today) {
      return "disableSelectDate"
    }
  }
  const cookies = new Cookies()
  let cart = null

  // 整理資料傳到購物車
  function addCart() {
    if (bookingDate) {
      //新增商品到localStorage

      if (standardNum > 0 || VIPNum > 0) {
        if (cookies.get("token") === undefined) {
          cart = [
            {
              id: 1,
              type: "vip票",
              booked_date: bookingDate,
              quantity: VIPNum,
              price: 5000,
            },
            {
              id: 2,
              type: "一般票",
              booked_date: bookingDate,
              quantity: standardNum,
              price: 2000,
            },
          ]

          if (!member) {
            let cartData = JSON.parse(localStorage.getItem("cart")) || []

            cart.forEach((newItem) => {
              if (newItem.quantity > 0) {
                const existingItem = cartData.find(
                  (item) =>
                    item.id === newItem.id &&
                    item.check_in_date === newItem.check_in_date
                )

                if (existingItem) {
                  existingItem.quantity += newItem.quantity
                } else {
                  cartData.push(newItem)
                }
              }
            })

            localStorage.setItem("cart", JSON.stringify(cartData))
            handleAlertShowCart()

            return
          }
        } else {
          cart = [
            {
              id: 1,
              booked_date: bookingDate,
              quantity: VIPNum,
              userToken: cookies.get("token"),
            },
            {
              id: 2,
              booked_date: bookingDate,
              quantity: standardNum,
              userToken: cookies.get("token"),
            },
          ]
        }
        axios
          .post("http://localhost:3001/ticket/addTicketItem", cart, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response)
          })
        handleAlertShowCart()
      } else {
        handleAlertShow()
      }
    } else {
      handleAlertShowDate()
    }
  }

  return (
    <div className="bookingArea">
      <div className="divBookingItem">
        <div className="col-6">
          <p>日期</p>
        </div>
        <div className="col-6 divCalendar">
          <input
            required
            type="tel"
            className="col-8"
            value={bookingDate}
            onClick={(e) => {
              showCalendar(e)
            }}
            onChange={(e) => {
              showCalendar(e)
            }}
          />
          <FaCalendarAlt
            size={30}
            onClick={(e) => {
              showCalendar(e)
            }}
            className="col-4"
          />
          <DateCalendar
            today={today}
            date={date}
            dateShow={dateShow}
            selectDate={selectDate}
            changeView={changeView}
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </div>
      </div>
      <BookingTicketOption
        ticketOption={"VIP票"}
        ticketPrice={"NT$ 5,000"}
        ticketNum={VIPNum}
        setPlus={plusVIP}
        setMinus={minusVIP}
        setZero={zeroVIP}
        setTicketNum={setVIPNum}
        handleAlertShow={handleAlertShow}
      />
      <BookingTicketOption
        ticketOption={"標準票"}
        ticketPrice={"NT$ 2,000"}
        ticketNum={standardNum}
        setPlus={plusStandard}
        setMinus={minusStandard}
        setZero={zeroStandard}
        setTicketNum={setStandardNum}
        handleAlertShow={handleAlertShow}
      />
      <div
        onClick={(e) => {
          addCart(e)
        }}
      >
        <Button btnContent={"加入購物車"} />
      </div>
    </div>
  )
}

export default BookingArea

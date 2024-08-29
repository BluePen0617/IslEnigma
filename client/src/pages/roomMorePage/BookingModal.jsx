import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import ConfPopup from "../roomPage/ConfPopup"
import { useState, useEffect, useMemo } from "react"
import { useNewCartItem } from "../../hooks/useNewCartItem"
import { useAuthContext } from "../../context/AuthContext"

const BookingModal = ({
  toggleBookingModal,
  setToggleBookingModal,
  bookedDate,
  roomId,
  price,
  roomType,
}) => {
  const { member } = useAuthContext()
  const [showConfPopup, setShowConfPopup] = useState(false)

  const {
    mutate: newCartItem,
    isLoading: addingItem,
    data: item,
    errors,
  } = useNewCartItem()
  const [value, onChange] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const [queryData, setQueryData] = useState({
    dateRange: [],
    roomCount: 1,
    people: 1,
    roomType: "",
    roomId: null,
  })
  const [selectedDates, setSelectedDates] = useState([null, null])
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  const disableBookedDates = ({ date }) => {
    return bookedDate.some(
      (bookedDate) =>
        bookedDate.getFullYear() === date.getFullYear() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getDate() === date.getDate()
    )
  }
  const formatLocalDate = (date) => {
    if (!date) return ""
    return date.toLocaleDateString({
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  }
  const handleUpdate = (e) => {
    const { name, className } = e.target

    setQueryData((prev) => {
      let updatedValue = prev[name]

      switch (className) {
        case "increase":
          ++updatedValue
          break
        case "decrease":
          --updatedValue
          break
        default:
          break
      }
      if (updatedValue < 1) updatedValue = 1
      if (updatedValue > 5) updatedValue = 5

      return {
        ...prev,
        [name]: updatedValue,
      }
    })
  }

  // const handleDateChange = (dates) => {
  //   setSelectedDates(dates)
  //   console.log("Selected Dates:", dates)
  // }
  useEffect(() => {
    // const price = selectedOption.getAttribute("data-price")

    if (value && value.length === 2) {
      setQueryData((prev) => ({
        ...prev,
        dateRange: value,
        roomId: roomId + 1,
        roomType,
        price,
      }))
    }
  }, [value])

  const handleAddCart = () => {
    const itemData = {
      ...queryData,
      quantity: 1,
    }

    //新增商品到localStorage
    if (!member) {
      console.log(queryData)

      const existingCartData = JSON.parse(localStorage.getItem("cart")) || []

      const itemId = Date.now()

      const itemDataWithId = {
        ...itemData,
        id: itemId,
      }

      existingCartData.push(itemDataWithId)

      localStorage.setItem("cart", JSON.stringify(existingCartData))
      setShowConfPopup(true)
      setToggleBookingModal(false)
      setQueryData(() => ({
        dateRange: [],
        roomCount: 1,
        people: 1,
        roomType: "",
        roomId: null,
      }))
      return
    }

    newCartItem(itemData, {
      onSuccess: () => {
        setShowConfPopup(true)
        setToggleBookingModal(false)
        setQueryData((prev) => ({
          ...prev,
          roomType: "",
          roomId: null,
        }))
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <>
      <ConfPopup
        roomTypeName={roomType}
        checkInDate={formatLocalDate(queryData.dateRange[0])}
        checkOutDate={formatLocalDate(queryData.dateRange[1])}
        onClose={() => setShowConfPopup(false)}
        isVisible={showConfPopup}
      />

      {toggleBookingModal && (
        <div id="quickReservationModal" className="quickModal">
          <div className="quickModalContent">
            <span
              className="closeQuickModal"
              onClick={() => {
                setToggleBookingModal(false)
              }}
            >
              &times;
            </span>
            <div className="modalLeft">
              <h2>
                露營訂房<i className="bi bi-calendar-week-fill"></i>
              </h2>
              <div>
                <DateRangePicker
                  onChange={onChange}
                  value={value}
                  clearIcon={false}
                  closeCalendar={false}
                  disableCalendar={false}
                  isOpen={true}
                  shouldCloseCalendar={({ reason }) =>
                    reason !== "outsideAction"
                  }
                  calendarProps={{
                    tileDisabled: disableBookedDates,
                  }}
                  locale="en-us"
                  onCalendarOpen={() => {
                    return handleOpenCalendar(index)
                  }}
                  minDate={today}
                />

                {/* <DateRangePicker
            onChange={handleDateChange}
            value={selectedDates}
            clearIcon={false}
            closeCalendar={false}
            disableCalendar={false}
            shouldCloseCalendar={({ reason }) => reason !== "outsideAction"}
            locale="en-us"
            calendarProps={{
              tileDisabled: disableBookedDates,
            }}
            onCalendarOpen={() => {
              handleOpenCalendar(index)
            }}
            minDate={today}
          /> */}
              </div>
              {/* <a
                className="buttonSearch"
                // onClick={handleSearch}
                // disabled={validateSearch()}
              >
                搜索 <i className="bi bi-search"></i>
              </a> */}
            </div>
            <div className="modalRight">
              <div className="reservationForm">
                <div className="dateInputs">
                  <div className="dateInput">
                    <label htmlFor="checkInDate">入住日期</label>
                    <input
                      type="text"
                      id="checkInDate"
                      readOnly
                      value={formatLocalDate(queryData.dateRange[0]) || ""}
                    />
                  </div>
                  <div className="dateInput">
                    <label htmlFor="checkOutDate">退房日期</label>
                    <input
                      type="text"
                      id="checkOutDate"
                      readOnly
                      value={formatLocalDate(queryData.dateRange[1]) || ""}
                    />
                  </div>
                </div>
                <div className="guestInputs">
                  <div className="inputGroup">
                    <label>間數</label>
                    <div className="numberInput">
                      <button
                        className="decrease"
                        name="roomCount"
                        onClick={handleUpdate}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="roomCount"
                        value={queryData.roomCount || ""}
                        min="0"
                        max="4"
                        readOnly
                      />
                      <button
                        className="increase"
                        name="roomCount"
                        onClick={handleUpdate}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="inputGroup">
                    <label>人數</label>
                    <div className="numberInput">
                      <button
                        className="decrease"
                        name="people"
                        onClick={handleUpdate}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="guestCount"
                        value={queryData.people || ""}
                        min="0"
                        max="10"
                        readOnly
                      />
                      <button
                        className="increase"
                        name="people"
                        onClick={handleUpdate}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="totalPrice">
                    <span>NT$</span>
                    <input
                      type="text"
                      id="totalPriceInput"
                      value={price}
                      readOnly
                    />
                  </div>
                </div>
                {/* {data && (
                  <div className="roomTypeSelectWrapper">
                    <select
                      id="roomTypeSelect"
                      className="roomTypeSelect"
                      //   onChange={handleSelect}
                      //   value={queryData.roomId || ""}
                    >
                      <option value="" disabled>
                        選擇房型
                      </option>
                      {data.map((room) => (
                        <option
                          key={room.room_id}
                          value={room.room_id}
                          data-price={room.price}
                          data-name={room.room_type}
                        >
                          {room.room_type}
                        </option>
                      ))}
                    </select>
                  </div>
                )} */}
                <button
                  id="searchResults"
                  onClick={handleAddCart}
                  disabled={!queryData.dateRange.length}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <ConfPopup
        roomTypeName={queryData.roomType}
        checkInDate={formatLocalDate(queryData.dateRange[0])}
        checkOutDate={formatLocalDate(queryData.dateRange[1])}
        onClose={() => setShowConfPopup(false)}
        isVisible={showConfPopup}
      /> */}
    </>
  )
}

export default BookingModal

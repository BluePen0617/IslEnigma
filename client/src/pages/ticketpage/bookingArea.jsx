import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import BookingTicketOption from "./BookingTicketOption.jsx";
import Button from "/src/components/common/Button.jsx";
import DateCalendar from "./DateCalendar.jsx";

import "react-calendar/dist/Calendar.css";

function BookingArea({
	dateShow,
	setDateShow,
	showCalendar,
	handleAlertShow,
	handleAlertShowDate,
}) {
	// 點選左右箭頭更換月份
	let [date, setDate] = useState(new Date());
	let changeView = ({ activeStartDate }) => {
		setDate(activeStartDate);
	};
	// 設定不可選的日期樣式
	let today = new Date();
	today.setHours(0, 0, 0, 0); // 需要清除時間再進行比較，否則當天也會小於 new Date()
	let tileClassName = ({ date, view }) => {
		if (view === "month" && date < today) {
			return "disableSelectDate";
		}
	};
	// 得到使用者選取的日期，並把月曆關掉
	let [bookingDate, setBookingDate] = useState("");
	let selectDate = (value) => {
		setDateShow(false);
		setBookingDate(value.toLocaleDateString());
	};
	// 得到票種、張數
	const [standardNum, setStandardNum] = useState(0);
	const [VIPNum, setVIPNum] = useState(0);
	// 整理資料傳到購物車
	function addCart() {
		if (bookingDate) {
			if (standardNum > 0 || VIPNum > 0) {
				console.log("cart", [
					{
						date: bookingDate,
						standardNum: standardNum,
						standardPrice: standardNum * 2000,
						VIPNum: VIPNum,
						VIPPrice: VIPNum * 5000,
					},
				]);
			} else {
				handleAlertShow();
			}
		} else {
			handleAlertShowDate();
		}
	}

	return (
		<div className="bookingArea">
			<div className="divBookingItem container">
				<div className="col-6">
					<p>日期</p>
				</div>
				<div className="col-6 divCalendar">
					<input
						required
						type="tel"
						className="col-6"
						value={bookingDate}
						onClick={(e) => {
							showCalendar(e);
						}}
						onChange={(e) => {
							showCalendar(e);
						}}
					/>
					<FaCalendarAlt
						size={30}
						onClick={(e) => {
							showCalendar(e);
						}}
						className="col-6"
					/>
					<DateCalendar
						date={date}
						dateShow={dateShow}
						selectDate={selectDate}
						changeView={changeView}
						tileClassName={tileClassName}
						onClick={(e) => {
							e.stopPropagation();
						}}
					/>
				</div>
			</div>
			<BookingTicketOption
				ticketOption={"VIP票"}
				ticketPrice={"NT$ 5,000"}
				ticketNum={standardNum}
				setTicketNum={setStandardNum}
				handleAlertShow={handleAlertShow}
			/>
			<BookingTicketOption
				ticketOption={"標準票"}
				ticketPrice={"NT$ 2,000"}
				ticketNum={VIPNum}
				setTicketNum={setVIPNum}
				handleAlertShow={handleAlertShow}
			/>
			<div
				onClick={(e) => {
					addCart(e);
				}}
			>
				<Button btnContent={"加入購物車"} />
			</div>
		</div>
	);
}

export default BookingArea;

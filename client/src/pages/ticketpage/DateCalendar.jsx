import React, { useMemo } from "react"
import DatePicker from "react-date-picker"

import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

function DateCalendar({
	today,
	date,
	dateShow,
	selectDate,
	changeView,
}) {
	if (dateShow) {
		return (
			<div
				className="calendarArea"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<DatePicker
					value={date}
					onChange={selectDate}
					clearIcon={false}
					closeCalendar={false}
					disableCalendar={false}
					isOpen={true}
					shouldCloseCalendar={({ reason }) => reason !== "outsideAction"}
					locale="en-us"
					calendarType={"gregory"}
					minDate={today}
					onActiveStartDateChange={changeView}
				/>
			</div>
		);
	}
}

export default DateCalendar

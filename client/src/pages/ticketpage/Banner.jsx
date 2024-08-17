import React, { useState } from "react";
// components
import LogoArea from "/src/components/common/LogoArea.jsx";
import BookingArea from "./BookingArea.jsx";
import BtnDown from "./BtnDown.jsx";
// image
import imgBanner from "/images/ticketBanner.png";
import imgLogo from "/00logo/LogoType_Light_2.png";

function Banner({
	dateShow,
	showCalendar,
	closeCalendar,
	handleAlertShow,
	handleAlertShowDate,
	cartShow,
	handleAlertShowCart,
	closeAlertShowCart,
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
	zeroVIP
}) {
	return (
		<div
			id="divBanner"
			onClick={() => {
				closeCalendar();
			}}
		>
			<LogoArea imgLogo={imgLogo} areaName={"訂票資訊"} />
			<img src={imgBanner} alt="" className="imgBackground" />
			<div className="divSafe">
				<h5>*為安全起見，園區內設施限制 18 歲以上方能搭乘</h5>
			</div>
			<BookingArea
				dateShow={dateShow}
				showCalendar={showCalendar}
				closeCalendar={closeCalendar}
				handleAlertShow={handleAlertShow}
				handleAlertShowDate={handleAlertShowDate}
				cartShow={cartShow}
				handleAlertShowCart={handleAlertShowCart}
				closeAlertShowCart={closeAlertShowCart}
				bookingDate={bookingDate}
				selectDate={selectDate}
				standardNum={standardNum}
				setStandardNum={setStandardNum}
				plusStandard={plusStandard}
				minusStandard={minusStandard}
				zeroStandard={zeroStandard}
				VIPNum={VIPNum}
				setVIPNum={setVIPNum}
				plusVIP={plusVIP}
				minusVIP={minusVIP}
				zeroVIP={zeroVIP}
			/>
			<BtnDown />
		</div>
	);
}

export default Banner;

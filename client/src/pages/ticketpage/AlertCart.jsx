import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

function AlertCart({
	cartShow,
	closeAlertShowCart,
	bookingDate,
	standardNum,
	VIPNum,
}) {
	if (cartShow) {
		if (standardNum && VIPNum) {
			return (
				<div className="divAlert">
					<div className="col-10 ticketIcon">
						<img src="/00myIcon/ticket.png" alt="" />
					</div>
					<div className="col-10">
						<h2>謝謝您的訂購</h2>
						<p>
							您已訂購{bookingDate}的<br />
							VIP票{VIPNum}張，以及標準票{standardNum}張
						</p>
					</div>
					<p onClick={closeAlertShowCart} className="btnClose">
						X
					</p>
					<div className="col-10 socialLinks">
						<p>追蹤我們</p>
						<a href="#" className="socialIcon">
							<FaFacebook />
						</a>
						<a href="#" className="socialIcon">
							<FaInstagram />
						</a>
						<a href="#" className="socialIcon">
							<FaYoutube />
						</a>
					</div>
					<div className="col-12 divAlertBtn">
						<a href="/cart">
							<button className="btnCart" onClick={closeAlertShowCart}>
								前往購物車
							</button>
						</a>
						<a href="/rooms">
							<button className="btnCart" onClick={closeAlertShowCart}>
								前往訂房
							</button>
						</a>
					</div>
				</div>
			);
		} else if (VIPNum && !standardNum) {
			return (
				<div className="divAlert">
					<div className="col-10 ticketIcon">
						<img src="/public/00myIcon/ticket.png" alt="" />
					</div>
					<div className="col-10">
						<h2>謝謝您的訂購</h2>
						<p>
							您已訂購{bookingDate}的<br />
							VIP票{VIPNum}張
						</p>
					</div>
					<p onClick={closeAlertShowCart} className="btnClose">
						X
					</p>
					<div className="col-10 socialLinks">
						<p>追蹤我們</p>
						<a href="#" className="socialIcon">
							<FaFacebook />
						</a>
						<a href="#" className="socialIcon">
							<FaInstagram />
						</a>
						<a href="#" className="socialIcon">
							<FaYoutube />
						</a>
					</div>
					<div className="col-12 divAlertBtn">
						<a href="/cart">
							<button className="btnCart" onClick={closeAlertShowCart}>
								前往購物車
							</button>
						</a>
						<a href="/rooms">
							<button className="btnCart" onClick={closeAlertShowCart}>
								前往訂房
							</button>
						</a>
					</div>
				</div>
			);
		} else if (standardNum && !VIPNum) {
			return (
				<div className="divAlert">
					<div className="col-10 ticketIcon">
						<img src="/public/00myIcon/ticket.png" alt="" />
					</div>
					<div className="col-10">
						<h2>謝謝您的訂購</h2>
						<p>
							您已訂購{bookingDate}的<br />
							標準票{standardNum}張
						</p>
					</div>
					<p onClick={closeAlertShowCart} className="btnClose">
						X
					</p>
					<div className="col-10 socialLinks">
						<p>追蹤我們</p>
						<a href="#" className="socialIcon">
							<FaFacebook />
						</a>
						<a href="#" className="socialIcon">
							<FaInstagram />
						</a>
						<a href="#" className="socialIcon">
							<FaYoutube />
						</a>
					</div>
					<div className="col-12 divAlertBtn">
						<a href="/cart">
							<button className="btnCart" onClick={closeAlertShowCart}>
								前往購物車
							</button>
						</a>
						<a href="/rooms">
							<button className="btnCart" onClick={closeAlertShowCart}>
								前往訂房
							</button>
						</a>
					</div>
				</div>
			);
		}
	}
}

export default AlertCart;

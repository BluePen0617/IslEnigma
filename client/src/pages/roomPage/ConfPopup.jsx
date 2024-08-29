import { Link } from "react-router-dom"

const ConfPopup = ({
  roomTypeName,
  checkInDate,
  checkOutDate,
  onClose,
  isVisible,
}) => {
  if (!isVisible) return null

  return (
    <div id="cartConfirmationPopup" className="popupOverlay active">
      <div className="popupContent">
        <img
          src="/00myIcon/booking-info.png"
          alt="Tent Icon"
          className="tentIcon"
        />
        <h2>謝謝您的訂購</h2>
        <p>
          您已訂購 "<span>{roomTypeName}</span>" 入住日期" "
          <span>{checkInDate}</span>" 退房日期" "<span>{checkOutDate}</span>"
        </p>
        <div className="socialLinks">
          <p>追蹤我們</p>
          <a href="#" className="socialIcon">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="socialIcon">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="socialIcon">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
        <Link to="/cart" id="goToCartBtn" className="actionBtn">
          前往購物車
        </Link>
        <button
          id="continueShoppingBtn"
          className="actionBtn secondary"
          onClick={onClose}
        >
          繼續瀏覽
        </button>
      </div>
    </div>
  )
}

export default ConfPopup

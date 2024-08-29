import { Link, useLocation, useParams } from "react-router-dom"
// import "./ShoppingSuccessPage.scss";
import { useEffect, useState } from "react"
import axios from "axios"
import useCartStore from "../../zustand/cartStore"
import { useNavigate } from "react-router-dom"
import { SERVER_URL } from "../../utils/helpers"
const ShoppingSuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState("Checking payment status...")
  const { cartItems, loading, fetchCartData } = useCartStore()
  const params = new URLSearchParams(location.search)
  const sessionIdParam = params.get("session_id")

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const transactionId = searchParams.get("transactionId")
    const orderId = searchParams.get("orderId")
    const checkPayMent = async () => {
      const order_info = JSON.parse(localStorage.getItem("order_info"))
      const res = await axios.post(
        `${SERVER_URL}/cart/line-test/check-payment`,
        {
          transactionId,
          orderId,
          order_info,
        }
      )
    }
    if (transactionId) checkPayMent()
    console.log(transactionId, orderId)
  }, [])

  return (
    <>
      <div id="shoppingSuccess" className="successBox">
        <img
          className="big-ticket"
          src="/shoppingSuccess/bigger-ticket.png"
          alt="Big Ticket"
        />
        <p className="successTitle">謝謝您的購買</p>
        <p className="remind">
          訂購成功後，系統會發送「訂單明細」及「電子票券連結」至結帳時所留下的信箱與手機。
        </p>
        <div className="followUs">
          <p className="followUsText">追蹤我們</p>
          <img src="/shoppingSuccess/fb-icon.png" alt="Facebook Icon" />
          <img src="/shoppingSuccess/yt-icon.png" alt="YouTube Icon" />
          <img src="/shoppingSuccess/ig-icon.png" alt="Instagram Icon" />
        </div>

        <Link to="/profile">
          {" "}
          <button className="btnOrder">查看訂單 </button>
        </Link>

        <Link to="/cart">
          <button className="btnOrder">返回購物車</button>
        </Link>
      </div>
    </>
  )
}

export default ShoppingSuccessPage

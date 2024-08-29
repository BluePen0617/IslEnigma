import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useCartItemsData } from "../../hooks/useCartItem"
import { useUpdateQty } from "../../hooks/useUpdateQty"
import { useRemoveCartItem } from "../../hooks/useDeleteItem"
import CartItem from "./CartItem"
import arrow from "/shoppingCart/breadcrumbArrow.png"
import "./shoppingCart.scss"
import { useAuthContext } from "../../context/AuthContext"

const ShoppingCartPage = () => {
  const { mutate: removeCartItem } = useRemoveCartItem()
  const { data, isLoading } = useCartItemsData()
  const [cartData, setCartData] = useState([])
  const { member } = useAuthContext()
  const location = useLocation()

  const handleDelete = async (itemId) => {
    await axios.delete(`http://localhost:3001/cart/${itemId}`)
    // Remove from local storage
    const updatedCart = cartData.filter((item) => item.id !== itemId)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCartData(updatedCart)
  }

  // Handle quantity update
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartData.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCartData(updatedCart)
  }

  const countTotalPrice = () => {
    return (
      data?.order_item.reduce((total, item) => {
        const roomPrice = item.room?.price || 0
        const ticketPrice = item.ticket?.price || 0
        const itemTotal =
          roomPrice * item.quantity + ticketPrice * item.quantity
        return total + itemTotal
      }, 0) || 0
    )
  }

  const countLocalPrice = () => {
    return (
      cartData.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0) || 0
    )
  }
  useEffect(() => {
    if (data && data.order_item) {
      const sortedItems = data.order_item.sort((a, b) => {
        if (a.room_id < b.room_id) return -1
        if (a.room_id > b.room_id) return 1

        if (a.ticket_id < b.ticket_id) return -1
        if (a.ticket_id > b.ticket_id) return 1

        return 1
      })

      setCartData(sortedItems)
      console.log(sortedItems)
    }
  }, [data])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!member) {
      const localCartItem = JSON.parse(localStorage.getItem("cart")) || []
      setCartData(localCartItem)
    }
  }, [member])
  if (isLoading) return <p>Loading...</p>
  return (
    <div className="shoppingCart">
      <div className="apple"></div>
      {cartData.length > 0 ? (
        <div className="itemList">
          {cartData.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              onUpdateQuantity={(newQuantity) =>
                handleUpdateQuantity(item.id, newQuantity)
              }
              cartData={cartData}
              setCartData={setCartData}
            />
          ))}
        </div>
      ) : (
        <div>購物車上未有任何商品</div>
      )}
      <div className="right">
        <div className="totalPriceContainer">
          <div className="totalPrice">
            <span className="title">小計:</span>
            <span>
              NT$
              {member
                ? cartData.length > 0
                  ? countTotalPrice()
                  : 0
                : cartData.length > 0
                ? countLocalPrice()
                : 0}
            </span>
          </div>
          <Link to="checkout" className="buyNow">
            前往購買手續
            <img src={arrow} alt="箭頭" className="breadcrumbArrow" />
          </Link>
          <button className="continueShopping">繼續購物</button>
        </div>
        <div className="customerService">
          <div className="customerAlerm">
            <img
              className="customerAlermImg"
              src="/shoppingCart/對話框.png"
              alt=""
            />
            <p>需要訂房嗎?</p>
          </div>
          <img
            className="customerImg"
            src="/shoppingCart/客服人員.png"
            alt="客服"
          />
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartPage

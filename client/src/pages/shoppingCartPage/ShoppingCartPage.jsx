import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useCartItemsData } from "../../hooks/useCartItem";
import { useUpdateQty } from "../../hooks/useUpdateQty";
import { useRemoveCartItem } from "../../hooks/useDeleteItem";
import CartItem from "./CartItem";
import arrow from "/shoppingCart/breadcrumbArrow.png";
import "./shoppingCart.scss";

const ShoppingCartPage = () => {
  const { mutate: removeCartItem } = useRemoveCartItem();
  const { data, error, isLoading } = useCartItemsData();
  const [cartData, setCartData] = useState([]);

  const location = useLocation();

  const handleDelete = async (itemId) => {
    await axios.delete(`http://localhost:3001/cart/${itemId}`);
    removeCartItem(itemId); // Ensure UI reflects the deletion
  };

  useEffect(() => {
    if (data && data.order_item) {
      const sortedItems = data.order_item.sort((a, b) => {
        if (a.room_id < b.room_id) return -1;
        if (a.room_id > b.room_id) return 1;

        if (a.ticket_id < b.ticket_id) return -1;
        if (a.ticket_id > b.ticket_id) return 1;

        return 1;
      });

      setCartData(sortedItems);
      console.log(sortedItems);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="shoppingCart">
      <div className="apple"></div>
      {cartData.length > 0 ? (
        <div className="itemList">
          {cartData.map((item) => (
            <CartItem key={item.order_item_id} item={item} />
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
              {cartData.length > 0
                ? cartData.reduce((total, item) => {
                    const roomPrice = item.room?.price || 0;
                    const ticketPrice = item.ticket?.price || 0;
                    const itemTotal =
                      roomPrice * item.quantity + ticketPrice * item.quantity;
                    return total + itemTotal;
                  }, 0)
                : 0}
            </span>
          </div>
          {/* <div className="onSale">
            <span className="title">首購優惠:</span>
            <span>NT$1,800</span>
          </div> */}
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
  );
};

export default ShoppingCartPage;

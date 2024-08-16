import { useRemoveCartItem } from "../../hooks/useDeleteItem"
import { useUpdateQty } from "../../hooks/useUpdateQty"
import { formatDate } from "../../utils/helpers"
// icon
import { FaTrashCan } from "react-icons/fa6"
import roomImg from "/shoppingCart/roomImg.png"

const CartItem = ({ item }) => {
  const { ticket = null, room = null } = item

  const { mutate: removeCartItem } = useRemoveCartItem()

  const { mutate: updateQty, isLoading: qtyLoading, isError } = useUpdateQty()

  const handleUpdateQty = (newQty) => {
    updateQty(
      { id: item.order_item_id, quantity: newQty },
      {
        onSuccess: () => {
          console.log("Quantity updated successfully!")
        },
        onError: (error) => {
          console.error("Error updating quantity:", error)
        },
      }
    )
  }

  const handlePlus = () => {
    if (item.quantity < 10) {
      const newQuantity = item.quantity + 1

      handleUpdateQty(newQuantity)
    }
  }

  const handleMinus = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1
      handleUpdateQty(newQuantity)
    }
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("確定要刪除這個商品嗎？")
    if (isConfirmed) {
      removeCartItem(id)
    }
  }

  return (
    <div className="item">
      <div className="itemTop">
        <div className="itemContent">
          <div className="imgContainer">
            <img
              src={
                item.room
                  ? roomImg
                  : "https://i.mj.run/u/6d8aa752-4375-4c2e-b46b-012f73974faf/578ae76eff4ac5a8e014647ede78abf64a83cce813d34b66d8ab8008b315541e_384_N.png"
              }
              alt="房間圖片"
              className="roomImg"
            />
          </div>
          <div class="shoppingCartItemInfo">
            <h5 class="itemTitle">{room?.room_type || ticket?.type}</h5>
            <p className="itemDate">
              入住日期: {formatDate(item.check_in_date)}
              {item.room && (
                <>
                  {" - "}退房日期: {formatDate(item.check_out_date)}
                </>
              )}
            </p>
            {room && (
              <>
                <p class="itemBeds">床數 : {room?.room_count}</p>
                <p class="itemPeople">人數 : {item.people_count}位</p>
              </>
            )}
          </div>
        </div>
        <div className="btngroups">
          <div className="shoppingCartCounterBox">
            <div className="shoppingCartCounter">
              <div className="minusButton" onClick={handleMinus}>
                <span> - </span>
              </div>
              <span>{item.quantity}</span>
              <div className="plusButton" onClick={handlePlus}>
                <span> ＋ </span>
              </div>
            </div>
          </div>
          <div
            className="shoppingCartGarbageCan"
            onClick={() => {
              handleDelete(item.order_item_id)
            }}
          >
            <FaTrashCan />
          </div>
        </div>
      </div>
      <div className="itemBottom">
        <button className="changeButton">
          <i className="bi bi-pencil-square"></i>改變心意
        </button>
        <p class="itemPrice">
          NT${" "}
          {item.room?.price * item.quantity ||
            item.ticket?.price * item.quantity}
        </p>
      </div>
    </div>
  )
}

export default CartItem

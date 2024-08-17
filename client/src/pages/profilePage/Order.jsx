import { useState } from "react"
import ProfileModal from "./ProfileModal"
import { useProfileOrders } from "../../hooks/useProfileOrders"

const Order = () => {
  const { data: orderData, isLoading, error } = useProfileOrders()
  const [orderPeople, setOrderPeople] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const handleShowModal = (id) => {
    const targetOrder = orderData.find((order) => order.order_id === id)

    setOrderPeople(targetOrder.orderPeople)
    setOpenModal(true)
  }

  if (isLoading) return <div>isLoading..</div>

  const groupedOrders = orderData.reduce((acc, item) => {
    const key = item.room_type ? "room" : "ticket"
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div id="orderContent" style={{ display: "flex" }}>
      {Object.keys(groupedOrders).length === 0 ? (
        <div className="none-container">
          <img
            className="none-picture"
            src="/00logo/LOGO_Colorful_1.png"
            alt="PayMethod Image"
          />
          <p id="none-text">沒有任何訂單</p>
          <button className="submit-btn" id="addPayMethod">
            前往訂票
          </button>
        </div>
      ) : (
        <div className="order-tables-container">
          {groupedOrders.room && (
            <>
              <h2 className="order-table-title">訂房資訊</h2>
              <table className="order-table__room">
                <thead>
                  <tr>
                    <th>訂單編號</th>
                    <th>房型</th>
                    <th>金額</th>
                    <th>入住日期</th>
                    <th>退房日期</th>
                    <th>數量</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedOrders.room.map((data) => (
                    <tr key={data.order_id}>
                      <td data-label="訂單ID">{data.order_id}</td>
                      <td data-label="房型">{data.room_type}</td>
                      <td data-label="金額">{data.amount}</td>
                      <td data-label="入住日期">{data.checkin_date}</td>
                      <td data-label="退房日期">{data.checkout_date}</td>
                      <td data-label="數量">{data.quantity}</td>
                      <td data-label="操作">
                        <button
                          className="seeMore-btn"
                          onClick={() => handleShowModal(data.order_id)}
                        >
                          查看更多
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {groupedOrders.ticket && (
            <>
              <h2 className="order-table-title">訂票資訊</h2>
              <table className="order-table__ticket">
                <thead>
                  <tr>
                    <th>訂單編號</th>
                    <th>票種</th>
                    <th>金額</th>
                    <th>入場日期</th>
                    <th>數量</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedOrders.ticket.map((data) => (
                    <tr key={data.order_id}>
                      <td data-label="訂單ID">{data.order_id}</td>
                      <td data-label="票種">{data.ticket_type}</td>
                      <td data-label="金額">{data.amount}</td>
                      <td data-label="入場日期">{data.checkin_date}</td>
                      <td data-label="數量">{data.quantity}</td>
                      <td data-label="操作">
                        <button
                          className="seeMore-btn"
                          onClick={() => handleShowModal(data.order_id)}
                        >
                          查看更多
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
      <ProfileModal
        data={orderPeople}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  )
}

export default Order

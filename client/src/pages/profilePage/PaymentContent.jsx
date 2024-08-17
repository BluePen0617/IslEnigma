import { checkCardType } from "../../utils/helpers"
import { formatCardNumber } from "../../utils/helpers"
import { useDeleteCard } from "../../hooks/useDeleteCard"
import visaIcon from "/memberInfo/visa.svg"
import mastercardIcon from "/memberInfo/mastercard.svg"
const PaymentContent = ({ cardInfo, setOpenModal }) => {
  const { mutate: deleteCard, isLoading } = useDeleteCard()

  const handleDelete = (cardId) => {
    deleteCard(cardId)
  }

  return (
    <div id="payMethodContent">
      {cardInfo.length === 0 ? (
        <div class="none-container">
          <img
            class="none-picture"
            src="/00logo/LOGO_Colorful_1.png"
            alt="PayMethod Image"
          />
          <p id="none-text">沒有任何付款方式</p>
          <button
            class="submit-btn"
            id="addPayMethod"
            onClick={() => {
              setOpenModal(true)
            }}
          >
            新增付款方式
          </button>
        </div>
      ) : (
        <>
          <div class="payMethod-container">
            <div className="payMethod-addBtn-true">
              <button
                className="payMethod-addBtn"
                onClick={() => {
                  setOpenModal(true)
                }}
              >
                新增付款方式
              </button>
            </div>
            {cardInfo.map((data) => {
              return (
                <div class="payMethod-card">
                  <div class="payMethod-cardInfo">
                    <img
                      class="payMethod-cardType"
                      src={checkCardType(data.number)}
                      alt="Visa"
                    />
                    <p class="payMethod-cardNumber">
                      {formatCardNumber(data.number)}
                    </p>
                  </div>
                  <button
                    class="payMethod-deleteBtn"
                    onClick={() => {
                      handleDelete(data.credit_card_id)
                    }}
                  >
                    刪除
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentContent

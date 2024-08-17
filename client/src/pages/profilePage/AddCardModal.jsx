import { useForm } from "react-hook-form"
import { useUpdateCard } from "../../hooks/useUpdateCard"

const AddCardModal = ({ openModal, setOpenModal }) => {
  const { mutate: updateCard, isLoading: loadingUpdate } = useUpdateCard()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1-")
  }

  const onSubmit = (data) => {
    const newData = {
      ...data,
      cardNumber: data.cardNumber.replace(/-/g, ""),
    }

    updateCard(newData, {
      onSuccess: () => setOpenModal(false),
    })
  }
  if (!openModal) return
  return (
    <div className="modal" id="addPayMethodModal">
      <div className="modal-content__profile">
        <span className="close-btn" onClick={() => setOpenModal(false)}>
          ×
        </span>
        <h2 className="modal-title">新增付款方式</h2>
        <form className="payMethod-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>信用卡號碼</label>
            <input
              type="text"
              id="cardNumber"
              className="memberInput-field"
              maxLength="19"
              {...register("cardNumber", {
                required: "請輸入信用卡號碼",
                pattern: {
                  value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                  message: "信用卡號碼格式錯誤，請輸入 xxxx-xxxx-xxxx-xxxx",
                },
                onChange: (e) => {
                  e.target.value = formatCardNumber(e.target.value)
                },
              })}
            />
            {errors.cardNumber && (
              <span className="modal-errorMessage">
                {errors.cardNumber.message}
              </span>
            )}
          </div>
          <div>
            <label>有效日期</label>
            <input
              type="month"
              id="expiryDate"
              className="memberInput-field"
              min="2024-08"
              {...register("expiryDate", {
                required: "請選擇有效日期",
              })}
            />
            {errors.expiryDate && (
              <span className="modal-errorMessage">
                {errors.expiryDate.message}
              </span>
            )}
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              id="cvv"
              className="memberInput-field"
              maxLength="3"
              {...register("cvv", {
                required: "請輸入CVV",
                pattern: {
                  value: /^\d{3}$/,
                  message: "CVV格式錯誤",
                },
              })}
            />
            {errors.cvv && (
              <span className="modal-errorMessage">{errors.cvv.message}</span>
            )}
          </div>
          <button type="submit" id="submitPayMethod" className="submit-btn">
            確認新增
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCardModal

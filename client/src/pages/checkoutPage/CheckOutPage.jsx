import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCartItemsData } from "../../hooks/useCartItem"
import { formatDate, SERVER_URL } from "../../utils/helpers"
import { useMemberInfo } from "../../hooks/useMemberInfo"

const CheckOutPage = () => {
  const { data: memberData, isLoading: memberDataLoading } = useMemberInfo()
  const { data: cartData, isLoading: cartDataLoading } = useCartItemsData()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customer: "",
      phone_number: "",
      address: "",
    },
  })

  useEffect(() => {
    if (memberData) {
      reset({
        customer: memberData.name || "",
        phone_number: memberData.phone || "",
        address: memberData.address || "",
      })
    }
  }, [memberData, reset])

  const handleCreatePayment = async (formData) => {
    try {
      const res = await axios.post(
        `${SERVER_URL}/cart/create-checkout-session`,
        {
          data: cartData,
          orderInfo: formData,
        }
      )
      window.location.href = res.data.url
    } catch (error) {
      console.error("支付創建失敗:", error)
    }
  }

  if (memberDataLoading || cartDataLoading) {
    return <p>正在加載資料...</p>
  }

  return (
    <div className="checkout">
      <form onSubmit={handleSubmit(handleCreatePayment)}>
        <div className="checkout-left">
          <div className="customer dropdown-section">
            <div className="title">
              <h2>訂購人資訊</h2>
            </div>
            <div className="dropdown-content show">
              <div className="customer-info">
                {["customer", "phone_number", "address"].map((field) => (
                  <div
                    key={field}
                    className={`form-group ${
                      field === "address" ? "address" : ""
                    }`}
                  >
                    <label htmlFor={field}>
                      {field === "customer"
                        ? "姓名"
                        : field === "phone_number"
                        ? "電話"
                        : "地址"}
                    </label>
                    <input
                      {...register(field, { required: "* 此欄位為必填" })}
                      type={field === "phone_number" ? "tel" : "text"}
                      id={field}
                      placeholder={
                        field === "customer"
                          ? "王小明"
                          : field === "phone_number"
                          ? "0912 345 678"
                          : "請輸入詳細地址"
                      }
                    />
                    {errors[field] && (
                      <p className="error-message">{errors[field].message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-right">
          <button className="confirm-payment" type="submit">
            確認付款
          </button>
          <button
            className="back-btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            返回上一步
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckOutPage

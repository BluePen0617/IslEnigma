import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useCartItemsData } from "../../hooks/useCartItem"
import { useMemberInfo } from "../../hooks/useMemberInfo"
import { PaymentService } from "../../utils/paymentService"
import Select from "react-select"

const CheckOutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState({
    value: "stripe",
    label: "Stripe",
  })
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false) // 添加此状态
  const { data: memberData, isLoading: memberDataLoading } = useMemberInfo()
  const { data: cartData, isLoading: cartDataLoading } = useCartItemsData()
  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customer: "",
      phone_number: "",
      address: "",
      payment_method: { value: "stripe", label: "Stripe" },
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

  const onSubmit = (formData) => {
    console.log(formData)
    const updatedFormData = {
      ...formData,
      payment_method: formData.payment_method.value,
    }
    console.log(updatedFormData)
    const paymentService = new PaymentService(
      formData.payment_method.value,
      updatedFormData,
      cartData
    )
    paymentService.pay()
  }

  if (memberDataLoading || cartDataLoading) {
    return <p>正在加載資料...</p>
  }

  const options = [
    {
      value: "stripe",
      label: "Stripe",
      image: "/shoppingCart/stripe.png",
    },
    { value: "ecPay", label: "綠界科技", image: "/shoppingCart/ecpay.svg" },
    { value: "linePay", label: "LinePay", image: "/lineLogo/line.png" },
  ]

  return (
    <div className="checkout">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Controller
            name="payment_method"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption)
                  setPaymentMethod(selectedOption)
                  setIsPaymentMethodSelected(true) // 设置为已选择付款方式
                }}
                value={paymentMethod}
                getOptionLabel={(option) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "155px",
                      height: "20px",
                      marginLeft: "-50px",
                    }}
                  >
                    {option.image && (
                      <img
                        src={option.image}
                        alt={option.label}
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "contain",
                        }}
                      />
                    )}
                    {option.label}
                  </div>
                )}
                getOptionValue={(option) => option.value}
                className="custom-select"
              />
            )}
          />
          {errors.paymentMethod && (
            <p className="error-message">{errors.paymentMethod.message}</p>
          )}
          <button
            className="confirm-payment"
            type="submit"
            disabled={!isPaymentMethodSelected}
            style={{
              backgroundColor: isPaymentMethodSelected
                ? "transparent"
                : "#e0e0e0",
              cursor: isPaymentMethodSelected ? "pointer" : "not-allowed",
              opacity: isPaymentMethodSelected ? 1 : 0.6,
            }}
          >
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

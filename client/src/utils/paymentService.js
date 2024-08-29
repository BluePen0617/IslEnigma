import axios from "axios"
import { toast } from "react-toastify"
import { SERVER_URL } from "./helpers"

export class PaymentService {
  #paymentMethod
  #cartData
  #formData

  constructor(paymentMethod, formData, cartData) {
    this.#paymentMethod = paymentMethod
    this.#formData = formData
    this.#cartData = cartData
  }

  async pay() {
    switch (this.#paymentMethod) {
      case "stripe":
        await this.#payWithStripe()
        break
      case "linePay":
        localStorage.setItem("order_info", JSON.stringify(this.#formData))
        await this.#payWithLinePay()
        break
      case "ecPay":
        localStorage.setItem("order_info", JSON.stringify(this.#formData))
        await this.#payWithEcPay()
        break
      default:
        console.error("未知的支付方式")
    }
  }

  // Stripe 支付
  async #payWithStripe() {
    try {
      const res = await axios.post(
        `${SERVER_URL}/cart/create-checkout-session`,
        {
          data: this.#cartData,
          orderInfo: this.#formData,
        },
        {
          withCredentials: true,
        }
      )
      window.location.href = res.data.url
    } catch (error) {
      console.error("支付創建失敗:", error)
    }
  }

  // LinePay 支付
  async #payWithLinePay() {
    console.log(this.#formData)

    try {
      const res = await axios.post(
        `${SERVER_URL}/cart/line-test`,
        {
          data: this.#cartData,
          orderInfo: this.#formData,
        },
        {
          withCredentials: true,
        }
      )

      if (res.data.returnCode === "1172")
        toast.error(
          "您的訂單已付款，可能是之前版本問題導致，請重新註冊新帳號在測試看看！或是將資料庫中customer_order的status改為PAID"
        )

      const paymentUrl = res.data.info?.paymentUrl?.web

      window.location.href = paymentUrl
    } catch (error) {
      console.error("支付創建失敗:", error)
    }
  }

  // 綠界支付
  async #payWithEcPay() {
    const { total_amount: amount } = this.#cartData

    try {
      const response = await axios.post(
        `${SERVER_URL}/cart/ecpay`,
        {
          amount,
          itemName: this.#cartData.order_item,
          cusInfo: this.#formData,
        },
        {
          withCredentials: true,
        }
      )

      if (response.data && response.data.formData) {
        this.#submitForm(response.data.formData)
      } else {
        throw new Error("無效的回應數據")
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 提交表單給綠界支付
  #submitForm(formData) {
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }
}

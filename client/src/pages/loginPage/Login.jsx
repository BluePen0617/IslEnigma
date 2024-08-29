import { useState, useEffect } from "react"
import "./Login.scss"
import ReCAPTCHA from "react-google-recaptcha"
import LoginImg from "/00logo/favicon.ico"
import { SERVER_URL, ReCAPTCHA_SITE_KEY } from "../../utils/helpers"
import { useForm } from "react-hook-form"
import { useLogin } from "../../hooks/useLogin"
import { Link } from "react-router-dom"

const Login = () => {
  const { mutate, isLoading, isError, error } = useLogin()

  const [loginForm, setLoginForm] = useState({
    account: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      validateForm()
    }
  }, [loginForm])

  const validateForm = () => {
    const errors = {}

    if (!loginForm.account) {
      errors.account = "* 此 欄 位 為 必 填"
    } else if (!/\S+@\S+\.\S+/.test(loginForm.account)) {
      errors.account = "* 格 式 錯 誤 ， 請 重 新 輸 入"
    }

    if (!loginForm.password) {
      errors.password = "* 此 欄 位 為 必 填"
    } else if (loginForm.password.length < 6) {
      errors.password = "* 密 碼 長 度 必 須 大 於 6 位 數"
    }

    if (!recaptchaToken) {
      errors.recaptcha = "請完成 reCAPTCHA 驗證"
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("good")
      mutate({
        ...loginForm,
        token: recaptchaToken,
      })
    } else {
      console.log("Form is invalid.")
    }
  }
  function onChange(value) {
    setRecaptchaToken(value)
  }
  return (
    <div className="loginPage">
      <div className="index">
        <div className="login-container">
          <div className="login-image">
            <img src={LoginImg} alt="Logo.png" />
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email-input">電子郵件(帳號)</label>
              <input
                type="text"
                id="email-input"
                name="account"
                className={errors.account ? "inputError" : "inputBlock"}
                value={loginForm.account}
                onChange={handleInputChange}
              />
              {errors.accountl && (
                <div className="inputError-message">{errors.account}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password-input">密碼</label>
              <input
                type="password"
                id="password-input"
                name="password"
                className={errors.password ? "inputError" : "inputBlock"}
                value={loginForm.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="inputError-message">{errors.password}</div>
              )}
            </div>
            <ReCAPTCHA
              sitekey={ReCAPTCHA_SITE_KEY}
              onChange={onChange}
              className="g-recaptcha"
            />
            {errors.recaptcha && (
              <div className="inputError-message">{errors.recaptcha}</div>
            )}
            <div className="message-container"></div>
            <div className="form-actions">
              <div className="button-group">
                <button type="submit" className="submit-btn login-button">
                  登入
                </button>
                <button type="reset" className="submit-btn">
                  忘記密碼
                </button>
              </div>
              <Link to="/register" className="submit-btn">
                創建新帳號
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

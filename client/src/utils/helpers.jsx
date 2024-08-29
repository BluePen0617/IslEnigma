import mastercardIcon from "/memberInfo/mastercard.svg"
import visaIcon from "/memberInfo/visa.svg"

export const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const ReCAPTCHA_SITE_KEY = import.meta.env.VITE_ReCAPTCHA_SITE_KEY
export const formatDate = (str) => {
  const date = new Date(str)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  const formattedDate = `${year}/${month}/${day}`

  return formattedDate
}

export const formatDateForInput = (dateStr) => {
  const [year, month, day] = dateStr.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

export const checkCardType = (data) => {
  switch (data[0]) {
    case "4":
      return visaIcon
    case "5":
      return mastercardIcon
  }
}

export const formatCardNumber = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1-")
}
export const generateDateRange = (checkInDate, checkOutDate) => {
  const dateList = []
  let currentDate = new Date(checkInDate)

  while (currentDate <= new Date(checkOutDate)) {
    dateList.push(new Date(currentDate).toISOString())
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dateList
}

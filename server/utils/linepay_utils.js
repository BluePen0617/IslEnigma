//創建支付請求所需的function

const crypto = require("crypto")

const {
  LINE_PAY_CHANNELID,
  LINE_PAY_SECRET,
  LINE_PAY_SITE,
} = require("./config_env")

class LinePayUtils {
  //解決了 JavaScript 在處理非常大的整數時可能出現的精度問題
  handleBigInteger(text) {
    const largeNumberRegex = /:\s*(\d{16,})\b/g
    const processedText = text.replace(largeNumberRegex, ': "$1"')
    const data = JSON.parse(processedText)
    return data
  }
  //這個函數用於生成一個基於 HMAC-SHA256 的數字簽名
  signKey(clientKey, msg) {
    const encoder = new TextEncoder()
    return crypto
      .createHmac("sha256", encoder.encode(clientKey))
      .update(encoder.encode(msg))
      .digest("base64")
  }

  async requestOnlineAPI({
    method,
    baseUrl = LINE_PAY_SITE,
    apiPath,
    queryString = "",
    data = null,
    signal = null,
  }) {
    const nonce = crypto.randomUUID()
    let signature = ""

    if (method === "GET") {
      signature = this.signKey(
        LINE_PAY_SECRET,
        LINE_PAY_SECRET + apiPath + queryString + nonce
      )
    } else if (method === "POST") {
      signature = this.signKey(
        LINE_PAY_SECRET,
        LINE_PAY_SECRET + apiPath + JSON.stringify(data) + nonce
      )
    }

    const headers = {
      "X-LINE-ChannelId": LINE_PAY_CHANNELID,
      "X-LINE-Authorization": signature,
      "X-LINE-Authorization-Nonce": nonce,
    }

    const response = await fetch(
      `${baseUrl}${apiPath}${queryString !== "" ? "&" + queryString : ""}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: data ? JSON.stringify(data) : null,
        signal: signal,
      }
    )

    const processedResponse = this.handleBigInteger(await response.text())

    return processedResponse
  }
}

const linePayUtils = new LinePayUtils()

module.exports = linePayUtils

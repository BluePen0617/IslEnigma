import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RainEffect from "./RainEffect"

const RoomBanner = () => {
  const [isRaining, setIsRaining] = useState(false)

  useEffect(() => {
    const randomWeatherChange = () => {
      const shouldRain = Math.random() < 0.5
      setIsRaining(shouldRain)
    }

    // 初始天氣
    randomWeatherChange()

    // 每10秒改變一次天氣
    const interval = setInterval(randomWeatherChange, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div id="roomBanner" className={` ${isRaining ? "raining" : ""}`}>
      <RainEffect isRaining={isRaining} />
      <div className="bannerContent">
        <div className="bannerLogo">
          <img
            src="../../public/00logo/LogoType_Light_2.png"
            alt="神秘樂園logo"
          />
        </div>
        <div className="bannerTextGroup">
          <span className="bannerLine"></span>
          <h1 className="bannerTitle">房型介紹</h1>
          <span className="bannerLine"></span>
        </div>
        <p className="bannerTagline">
          在 ISLENIGMA，每一刻都是驚喜，每一夜都是冒險。
          <br />
          準備好揭開島嶼的神秘面紗，開啟您的奇幻之旅了嗎？
        </p>
      </div>
      <div className="footprints">
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <span className={`footprint footprint-left`}>
              <i className="fas fa-shoe-prints fa-flip-horizontal"></i>
            </span>
            <span className={`footprint footprint-right`}>
              <i className="fas fa-shoe-prints fa-flip-horizontal"></i>
            </span>
          </React.Fragment>
        ))}
      </div>
      <div className="leftButtons">
        <div className="containerMain">
          <div className="drop dropOne">
            <div className="content">
              <a className="h2" href="#grasstempo">
                <i className="fa-solid fa-campground"></i>
              </a>
              <a href="#grasstempo">草原步調</a>
            </div>
          </div>
          <div className="drop dropTwo">
            <div className="content">
              <a className="h2" href="#oceanserenity">
                <i className="fa-solid fa-disease"></i>
              </a>
              <a href="#oceanserenity">沉靜海洋</a>
            </div>
          </div>
          <div className="drop dropThree">
            <div className="content">
              <a className="h2" href="#islandtrails">
                <i className="fa-solid fa-bridge-water"></i>
              </a>
              <a href="#islandtrails">島嶼蹤跡</a>
            </div>
          </div>
          <div className="drop dropFour">
            <div className="content">
              <a className="h2" href="#starrydome">
                <i className="fa-brands fa-galactic-republic"></i>
              </a>
              <a href="#starrydome">夢幻星空</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomBanner

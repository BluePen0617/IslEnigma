import { FaCampground, FaDisease } from "react-icons/fa6"
import { PiIslandFill } from "react-icons/pi"
import { FaStarAndCrescent } from "react-icons/fa6"
import { GiFallingStar } from "react-icons/gi"
import { GiGrass } from "react-icons/gi"

import { FaShoePrints } from "react-icons/fa6"
import ReservationModal from "./ReservationModal"
import { useState } from "react"
import ConfPopup from "./ConfPopup"

const Banner = () => {
  const [toggleReservation, setToggleReservation] = useState(false)
  const [showConfPopup, setShowConfPopup] = useState(false)

  return (
    <div id="roomBanner" class="bannerWrapper">
      <div class="leftButtons">
        <div class="containerMain">
          <div class="drop dropOne">
            <div class="content">
              <h2>
                <GiGrass />
              </h2>
              <a href="#">草原步調</a>
            </div>
          </div>
          <div class="drop dropTwo">
            <div class="content">
              <h2>
                <FaDisease />
              </h2>
              <a href="#">沉靜海洋</a>
            </div>
          </div>
          <div class="drop dropThree">
            <div class="content">
              <h2>
                <PiIslandFill />
              </h2>
              <a href="#">島嶼蹤跡</a>
            </div>
          </div>
          <div class="drop dropFour">
            <div class="content">
              <h2>
                <GiFallingStar />
              </h2>
              <a href="#">夢幻星空</a>
            </div>
          </div>
        </div>
      </div>
      <div class="bannerContent">
        <div class="bannerLogo">
          <img src="/00logo/LogoType_Light_2.png" alt="神秘樂園logo" />
        </div>
        <div class="bannerTextGroup">
          <span class="bannerLine"></span>
          <p class="bannerTitle">訂房資訊</p>
          <span class="bannerLine"></span>
        </div>
        <p class="bannerTagline">
          在
          ISLENIGMA，每一刻都是驚喜，每一夜都是冒險。準備好揭開島嶼的神秘面紗，開啟您的奇幻之旅了嗎？
        </p>
        <div class="bannerButtons">
          <a href="#roomTypes" class="primaryButton">
            <i class="fa-solid fa-tents"></i>查看房型
          </a>
          <a
            class="primaryButton"
            onClick={() => {
              setToggleReservation(!toggleReservation)
            }}
          >
            <i class="fa-regular fa-calendar-plus"></i>快速預約
          </a>
        </div>
      </div>
      <div class="footprints">
        <FaShoePrints className="footprint footprint-right" />
        <FaShoePrints className="footprint footprint-left" />
        <FaShoePrints className="footprint footprint-right" />
        <FaShoePrints className="footprint footprint-left" />
      </div>
      <ReservationModal
        toggleReservation={toggleReservation}
        setToggleReservation={setToggleReservation}
        setShowConfPopup={setShowConfPopup}
      />
      {/* <ConfPopup
        roomTypeName={queryData.roomType}
        checkInDate={formattedDate(queryData.dateRange[0])}
        checkOutDate={formattedDate(queryData.dateRange[1])}
        onClose={() => setShowConfPopup(false)}
        isVisible={showConfPopup}
      /> */}
    </div>
  )
}

export default Banner

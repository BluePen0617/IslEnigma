import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext"
import memberPng from "/00myIcon/menber.png"
import catGif from "/00myIcon/cat.gif"

const Nav = ({ toggleNavbar }) => {
  const { member } = useAuthContext()

  return (
    <nav className={toggleNavbar ? "navbar hidden" : "navbar active"}>
      <Link to="/homepage">
        <picture className="logo-container">
          <source
            media="(min-width:1024px)"
            srcSet="/00logo/LogoType_Light_2.png"
          />
          <source
            media="(min-width:850px)"
            srcSet="/00logo/LogoType_Light_1.png"
          />
          <img src="/00logo/LOGO_Light_1.png" alt="Logo" className="logo" />
        </picture>
      </Link>
      <div className="navRight">
        <ul className="navLink">
          <li className="navItem facility">
            <Link to="/mappage">
              <img src="/00myIcon/facility.png" alt="樂園設施" />
              <p data-text="樂園設施">樂園設施</p>
            </Link>
          </li>
          <li className="navItem ticket">
            <Link to="/ticketpage">
              <img src="/00myIcon/ticket-info.png" alt="訂票資訊" />
              <p data-text="訂票資訊">訂票資訊</p>
            </Link>
          </li>
          <li className="navItem book">
            <Link to="/rooms">
              <img src="/00myIcon/booking-info.png" alt="訂房資訊" />
              <p data-text="訂房資訊">訂房資訊</p>
            </Link>
          </li>
          <li className="navItem food">
            <Link to="/restaurantpage">
              <img src="/00myIcon/restaurant-info.png" alt="飲食購物" />
              <p data-text="飲食購物">飲食購物</p>
            </Link>
          </li>
          <li className="navItem traffic">
            <Link to="/boatpage">
              <img src="/00myIcon/traffic-info.png" alt="交通資訊" />
              <p data-text="交通資訊">交通資訊</p>
            </Link>
          </li>
          <li className="navItem about">
            <Link to="/about-us">
              <img src="/00myIcon/about.png" alt="關於我們" />
              <p data-text="關於我們">關於我們</p>
            </Link>
          </li>
          <li className="navItem info">
            <Link to="/infoEventPage">
              <img src="/00myIcon/park-info.png" alt="樂園資訊" />
              <p data-text="樂園資訊">樂園資訊</p>
            </Link>
          </li>
          <li className="navItem menber">
            <Link to="/profile">
              <img src={member ? catGif : memberPng} alt="登入" />
              <p data-text="會員">{member?.name || "會員登入"}</p>
            </Link>
          </li>
        </ul>
        <Link to="/ticketpage">
          <img src="/00myIcon/ticket.png" alt="Ticket" className="ticketImg" />
        </Link>
      </div>
    </nav>
  )
}

export default Nav

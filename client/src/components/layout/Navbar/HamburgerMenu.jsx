import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import { FaFacebook } from "react-icons/fa"
import { BsInstagram } from "react-icons/bs"
import { TfiYoutube } from "react-icons/tfi"
import { FaLine } from "react-icons/fa"
import { IoTicketSharp } from "react-icons/io5"

const HamburgerMenu = ({
  toggleHamburgerMenu,
  isPlaying,
  togglePlayPause,
  setToggleHamburgerMenu,
}) => {
  // 新增一個關閉菜單的函數
  const closeMenu = () => {
    setToggleHamburgerMenu(false)
  }

  // 創建一個可重用的菜單項組件
  const MenuItem = ({ to, icon, children }) => (
    <Link to={to} onClick={closeMenu}>
      {icon}
      <span>{children}</span>
      <span>&gt;</span>
    </Link>
  )

  return (
    <div
      id="hamburgerMenu"
      className={toggleHamburgerMenu ? "hamburgerMenu open" : "hamburgerMenu"}
    >
      <div className="menuHeader">
        <span id="closeBtn" className="closeBtn" onClick={closeMenu}>
          &times;
        </span>
        <Link to="/homepage" onClick={closeMenu}>
          <img
            src="/00logo/LogoType_Light_1.png"
            alt="Logo"
            className="menuLogo"
          />
        </Link>
        <Link to="/cart" className="cartIcon" onClick={closeMenu}>
          <i className="bi bi-cart"></i>
        </Link>
      </div>
      {/* 系統按鈕部分保持不變 */}
      <div className="systemButtons">{/* ... 現有代碼 ... */}</div>
      <nav className="menuItems">
        <MenuItem to="/mappage" icon={<Icon.Building />}>
          樂園設施
        </MenuItem>
        <MenuItem to="/ticketpage" icon={<Icon.TicketPerforated />}>
          訂票資訊
        </MenuItem>
        <MenuItem to="/rooms" icon={<Icon.House />}>
          訂房資訊
        </MenuItem>
        <MenuItem to="/restaurantpage" icon={<Icon.Cart3 />}>
          飲食購物
        </MenuItem>
        <MenuItem to="/boatpage" icon={<Icon.CarFront />}>
          交通資訊
        </MenuItem>
        <MenuItem to="/about-us" icon={<Icon.InfoCircle />}>
          關於我們
        </MenuItem>
        <MenuItem to="/infoEventPage" icon={<Icon.PatchQuestion />}>
          樂園資訊
        </MenuItem>
      </nav>
      <div className="menuFooter">
        <div className="socialIcons">
          {/* 社交圖標保持不變，因為它們可能鏈接到外部網站 */}
          <a href="#">
            <FaFacebook size={40} />
          </a>
          <a href="#">
            <BsInstagram size={40} />
          </a>
          <a href="#">
            <TfiYoutube size={40} />
          </a>
          <a href="#">
            <FaLine size={40} />
          </a>
        </div>
        <div className="copyright">
          <Link to="/about" onClick={closeMenu}>
            ©bluepen team
          </Link>
        </div>
      </div>
      <Link to="/ticketpage" className="ticketIcon" onClick={closeMenu}>
        <IoTicketSharp size={30} />
      </Link>
    </div>
  )
}

export default HamburgerMenu

import { Link } from "react-router-dom"

const MiddleBox = () => {
  return (
    <div className="middleBox">
      <div className="logoBox">
        <img src="/footerDeco/footerLogo.png" alt="footer logo" />
      </div>
      <nav className="footerNav">
        <ul>
          <Link to="/mappage">樂園設施</Link>
        </ul>
        <ul>
          <Link to="/ticketpage">訂票</Link>
        </ul>
        <ul>
          <Link to="/rooms">訂房</Link>
        </ul>
        <ul>
          <Link to="/restaurantpage">飲食購物</Link>
        </ul>
        <ul>
          <Link to="/boatpage">交通資訊</Link>
        </ul>
        <ul>
          <Link to="/about-us">關於我們</Link>
        </ul>
        <ul>
          <Link to="/infoEventPage">樂園資訊</Link>
        </ul>
      </nav>
      <nav className="MobileFooterNav">
        <div>
          <ul>
            <Link to="/mappage">樂園設施</Link>
          </ul>
          <ul>
            <Link to="/ticketpage">訂票</Link>
          </ul>
          <ul>
            <Link to="/rooms">訂房</Link>
          </ul>
        </div>
        <div>
          <ul>
            <Link to="/restaurantpage">飲食購物</Link>
          </ul>
          <ul>
            <Link to="/boatpage">交通資訊</Link>
          </ul>
          <ul>
            <Link to="/about-us">關於我們</Link>
          </ul>
          <ul>
            <Link to="/infoEventPage">樂園資訊</Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default MiddleBox

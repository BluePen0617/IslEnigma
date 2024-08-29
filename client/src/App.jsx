import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"

import "./App.css"
import Layout from "./components/layout/Layout"
import ShoppingCart from "./pages/shoppingCartPage/ShoppingCartPage"
import CheckOutPage from "./pages/checkoutPage/CheckOutPage"

import ShoppingSuccessPage from "./pages/shoppingSuccessPage/ShoppingSuccessPage"
import CartLayout from "./components/layout/CartLayout"
import Restaurant from "./pages/restaurantpage/Restaurant"
import Rooms from "./pages/roomPage/Rooms"
import Login from "./pages/loginPage/Login"
import Register from "./pages/registerPage/Register"
//toast
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAuthContext } from "./context/AuthContext"

import MapPage from "./pages/mappage"
import TicketPage from "./pages/ticketpage"
import RestaurantPage from "./pages/restaurantpage"
import Homepage from "./pages/homepage"
import BoatPage from "./pages/boatpage"
import InfoEventPage from "./pages/infoEventPage"
import InfoInfoPage from "./pages/infoInfoPage"
import InfoFAQPage from "./pages/infoFAQPage"
import RoomMorePage from "./pages/roomMorePage"
import RestaurantPaginationPage from "./pages/restaurantPaginationPage"
import AboutUsPage from "./pages/aboutUsPage"
import Profile from "./pages/profilePage/Profile"

function App() {
  const { member } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/register"
            element={member ? <Navigate to="/rooms" /> : <Register />}
          />

          <Route
            path="/login"
            element={member ? <Navigate to="/homepage" /> : <Login />}
          />

          <Route
            path="/profile"
            element={member ? <Profile /> : <Navigate to="/login" />}
          />

          <Route path="cart" element={<CartLayout />}>
            <Route index element={<ShoppingCart />} />
            <Route
              path="checkout"
              element={!member ? <Navigate to="/login" /> : <CheckOutPage />}
            />
            <Route
              path="shoppingSuccess"
              element={
                !member ? <Navigate to="/login" /> : <ShoppingSuccessPage />
              }
            />
          </Route>
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="/mappage" element={<MapPage />} />
          <Route path="/ticketpage" element={<TicketPage />} />
          <Route path="/restaurantpage" element={<RestaurantPage />} />
          <Route
            path="/restaurantpage/pagination/:urlId"
            element={<RestaurantPaginationPage />}
          />
          <Route path="/boatpage" element={<BoatPage />} />
          <Route path="/infoEventPage" element={<InfoEventPage />} />
          <Route
            path="/infoEventPage/infoInfoPage"
            element={<InfoInfoPage />}
          />
          <Route path="/infoEvent/infoFAQPage" element={<InfoFAQPage />} />
          <Route path="/room/roomMorePage" element={<RoomMorePage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

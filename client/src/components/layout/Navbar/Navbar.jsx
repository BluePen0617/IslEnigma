import { useEffect, useRef, useState } from "react"
import Robot from "./Robot/Robot"

import "./Navbar.css"
// import 音樂
import sound from "../../../assets/music/music.mp3"

//icons
import HamburgerMenu from "./HamburgerMenu"
import TopNav from "./TopNav"
import Nav from "./Nav"

const Navbar = () => {
  const [toggleHamburgerMenu, setToggleHamburgerMenu] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [toggleNavbar, setToggleNavbar] = useState(false)

  //撥放主題音樂
  const music = useRef(new Audio(sound))

  const togglePlayPause = () => {
    if (isPlaying) {
      music.current.pause()
    } else {
      music.current.currentTime = 0.5
      music.current
        .play()
        .then(() => {})
        .catch((error) => {
          console.error(error)
        })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div id="navbarAll" className="navbarAll">
      <TopNav
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        toggleNavbar={toggleNavbar}
        setToggleNavbar={setToggleNavbar}
        toggleHamburgerMenu={toggleHamburgerMenu}
        setToggleHamburgerMenu={setToggleHamburgerMenu}
      />
      <Nav toggleNavbar={toggleNavbar} />
      <HamburgerMenu
        toggleHamburgerMenu={toggleHamburgerMenu}
        setToggleHamburgerMenu={setToggleHamburgerMenu}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
      />

      <Robot />
    </div>
  )
}

export default Navbar

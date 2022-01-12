import { useEffect, useState } from "react"
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    console.log("nav useEffect")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener("scroll")
    }
  }, [])

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
        alt="Netflix Logo"
      />

      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User Avatar"
      />
    </div>
  )
}

export default Nav

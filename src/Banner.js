import { useState, useEffect } from "react"
import axios from "./axios"
import requests from "./requests"
import "./Banner.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      const randMovie = Math.floor(Math.random() * request.data.results.length -1)
      setMovie((request.data.results[randMovie]))
      return request
    }
    fetchData()
  }, [])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">More Info</button>
        </div>

        <h1 className="banner_description">
          {truncate(movie?.overview, 160)}
        </h1>
      </div>

      <div className="banner_fade"></div>
    </header>
  )
}

export default Banner

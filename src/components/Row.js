import React, { useState, useEffect } from "react"
import axios from "../axios"
import "../stylesheets/Row.css"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  }

  const playTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("")
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url) => {
        console.log({ url })
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get("v"))
      }).catch(error => {
        const errorMessage = error.message.split(":")[0]
        const beautifiedMes = errorMessage.charAt(0).toLowerCase() + errorMessage.slice(1)
        alert( "Sorry it " + beautifiedMes )
      })
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => playTrailer(movie)}
            className={`row_poster ${isLargeRow && "row_poster_large"}`}
            src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      
      const request = await axios.get(requests.fetchTopRated);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [movies]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <>
      {movies.length > 0 && (
        <header
          className="banner"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies[currentMovieIndex]?.backdrop_path}")`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="banner_contents">
            {/* title */}
            <h1 className="banner_title">
              {movies[currentMovieIndex]?.title ||
                movies[currentMovieIndex]?.name ||
                movies[currentMovieIndex]?.original_name}
            </h1>
            {/* div > 2 buttons */}
            <div className="banner_buttons">
              <button className="banner_button">Play</button>
              <button className="banner_button">Watch Later</button>
            </div>
            {/* description */}
            <h1 className="banner_description">
              {truncate(movies[currentMovieIndex]?.overview, 150)}
            </h1>
          </div>
          {/* Background Image */}
          <div className="banner--fadeBottom" />
        </header>
      )}
    </>
  );
};

export default Banner;

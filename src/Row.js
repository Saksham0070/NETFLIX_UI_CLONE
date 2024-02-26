import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import { BiChevronRightCircle, BiChevronLeftCircle } from "react-icons/bi";

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow, rowId }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const fetchTrailer = async (movie) => {
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        q: `${movie.title} trailer`,
                        part: 'snippet',
                        type: 'video',
                        maxResults: 1,
                        key: 'AIzaSyBKts1U2qSxPqMoByGsiv7cIzc6GyVgftk', // Replace with your actual YouTube API key
                    },
                }
            );

            const trailerVideoId =
                response.data.items[0]?.id.videoId || 'DEFAULT_VIDEO_ID';
            setTrailerUrl(trailerVideoId);
        } catch (error) {
            console.error('Error fetching trailer: ', error);
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            fetchTrailer(movie);
        }
    };
    const slideRight = () => {
        var slider = document.getElementById(`slider-${rowId}`);
        slider.scrollBy({ left: -500, behavior: 'smooth' });
    }
    const slideLeft = () => {
        var slider = document.getElementById(`slider-${rowId}`);
        slider.scrollBy({ left: 500, behavior: 'smooth' });
    }
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div>
              <div className='chevrons'>
              <BiChevronLeftCircle className='chevronleft' onClick={slideLeft} />
              <BiChevronRightCircle className='chevronRight' onClick={slideRight} />
              </div>
                
                <div className='row_posters' id={`slider-${rowId}`}>

                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterlarge'}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>

                
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;

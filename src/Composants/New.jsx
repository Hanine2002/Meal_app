import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './popular.css';

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;

  .splide__list {
    display: flex;
  }

  .splide__slide {
    margin-right: 10px;
  }

  img {
    width: 90%;
    height: 85%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 16px;
    margin: 8px 0 4px;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
`;

const New = () => {
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const fetchNewMovies = async () => {
      try {
        // Check if data is already in localStorage
        const storedData = localStorage.getItem('loveMovies');

        if (storedData) {
          // If data exists in localStorage, use it
          setNewMovies(JSON.parse(storedData));
        } else {
          // Otherwise, fetch data from the API
          const response = await axios.get('http://www.omdbapi.com/?apikey=990cf57&s=love&type=movie');
          const moviesData = response.data.Search || [];

          // Save data to localStorage for future use
          localStorage.setItem('loveMovies', JSON.stringify(moviesData));

          setNewMovies(moviesData);
        }
      } catch (error) {
        console.error('Error fetching new movies:', error);
      }
    };

    fetchNewMovies();
  }, []);

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      {/* Your other elements here if necessary */}
      <h2>Films 2023</h2>
      <MovieList>
        <Splide
          options={{
            type: 'loop',
            perPage: 4,
            perMove: 1,
            pagination: false,
            focus: 'center',
            breakpoints: {
              600: {
                perPage: 1,
                gap: '1rem',
              },
              900: {
                perPage: 2,
                gap: '1rem',
              },
            },
          }}
        >
          {newMovies.map((movie) => (
            <SplideSlide key={movie.imdbID} className="custom-splide-slide">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>Année: {movie.Year}</p>
            </SplideSlide>
          ))}
        </Splide>
      </MovieList>
    </div>
  );
};

export default New;



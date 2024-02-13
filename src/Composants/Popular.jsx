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

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        // Check if data is already in localStorage
        const storedData = localStorage.getItem('popularMovies');

        if (storedData) {
          // If data exists in localStorage, use it
          setPopularMovies(JSON.parse(storedData));
        } else {
          // Otherwise, fetch data from the API
          const response = await axios.get('http://www.omdbapi.com/?apikey=990cf57&s=popular&type=movie');
          console.log('API Response:', response.data);
          const moviesData = response.data.Search || [];

          // Save data to localStorage for future use
          localStorage.setItem('popularMovies', JSON.stringify(moviesData));

          setPopularMovies(moviesData);
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      {/* Your other elements here if necessary */}
      <h2>Films Populaires</h2>
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
          {popularMovies.map((movie) => (
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

export default Popular;

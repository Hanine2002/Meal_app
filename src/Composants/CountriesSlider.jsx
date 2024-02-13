import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const countriesData = {
  "meals": [
    { "strArea": "us", "name": "American" },
    { "strArea": "gb", "name": "British" },
    { "strArea": "ca", "name": "Canadian" },
    { "strArea": "ma", "name": "Moroccan" },
    { "strArea": "it", "name": "Italian" },
    { "strArea": "tn", "name": "Tunisian" },
    { "strArea": "es", "name": "Spanish" },
    { "strArea": "jp", "name": "Japanese" },
    { "strArea": "gr", "name": "Greek" },
    { "strArea": "in", "name": "Indian" },
  ]
};

const CountrySliderContainer = styled.div`
  max-width: 80%;
  margin: 20px auto;
`;

const CountryCard = styled.div`
  width: 100px;
  padding: 8px;
  margin: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-right: 25px;
`;

const CountryImage = styled.img`
  width: 100%;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CountrySlider = () => {
  return (
    <>
      <Title>Browse Country</Title>
      <Splide
        options={{
          type: 'loop',
          perPage: 4,
          perMove: 1,
          pagination: false,
          focus: 'center',
        }}
      >
        {countriesData.meals.map((country, index) => (
          <SplideSlide key={index}>
            <Link to={`/Countrie/:${country.name}`} key={country.strArea}>
              <CountryCard>
                <CountryImage
                  src={`https://www.themealdb.com/images/icons/flags/big/64/${country.strArea.toLowerCase()}.png`}
                  alt={country.strArea}
                />
              </CountryCard>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

const CountriesSliders = () => {
  return (
    <CountrySliderContainer>
      <CountrySlider />
    </CountrySliderContainer>
  );
};

export default CountriesSliders;

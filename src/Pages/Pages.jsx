import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import RecipeCategoryDetails from "../Composants/RecipeCategoryDetails";
import Search from "../Composants/Search";
import Favoris from "../Composants/Favoris";
import Footer from '../Composants/Footer';

function Pages() {
  const [favorites, setFavorites] = useState([]);

  // Charger favorite mn localStorage au montage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // mettre a jour favorites ou hta localStorage
  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/Composants/:categoryName"
        element={<RecipeCategoryDetails favorites={favorites} updateFavorites={updateFavorites} />}
      />
      <Route path="/Countrie/:countryname" element={<RecipeCategoryDetails favorites={favorites} updateFavorites={updateFavorites} />} />

      <Route
        path="/search/:input"
        element={<Search favorites={favorites} updateFavorites={updateFavorites} />}
      />
      <Route path="/favoris" element={<Favoris favorites={favorites} />} />
    </Routes>
    <Footer/>
    </>
  );
}

export default Pages;

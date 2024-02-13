import React from 'react';
import RecipeCategoryDetails from './RecipeCategoryDetails';

function Search({ favorites, updateFavorites }) {

  return (
    <>
      <RecipeCategoryDetails favorites={favorites} updateFavorites={updateFavorites} />
    </>
  );
}

export default Search;

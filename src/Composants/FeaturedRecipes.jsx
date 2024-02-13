import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import RecipeDetails from './RecipeDetails'; 
const FeaturedRecipesContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const RecipeCard = styled.div`
  width: 250px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer; // Add cursor pointer
`;

function FeaturedRecipes() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const storedData = localStorage.getItem('featuredRecipes');

        if (storedData) {
          setFeaturedRecipes(JSON.parse(storedData));
        } else {
          const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?f=a');
          const data = await response.json();

          localStorage.setItem('featuredRecipes', JSON.stringify(data.meals || []));
          setFeaturedRecipes(data.meals || []);
        }
      } catch (error) {
        console.error('Error fetching featured recipes:', error);
      }
    };
    fetchFeaturedRecipes();
  }, []);

  const handleSliderClick = (recipeId) => {
    const selectedRecipe = featuredRecipes.find((recipe) => recipe.idMeal === recipeId);
    if (selectedRecipe) {
      setSelectedRecipe(selectedRecipe);
    }
  };

  const handleDetailsClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <FeaturedRecipesContainer>
      <Title>Popular Recipes</Title>
      <Splide
        options={{
          type: 'loop',
          perPage: 3,
          perMove: 1,
          pagination: false,
          focus: 'center',
        }}
      >
        {featuredRecipes.map((recipe) => (
          <SplideSlide key={recipe.idMeal} onClick={() => handleSliderClick(recipe.idMeal)}>
            <RecipeCard>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ maxWidth: '100%' }} />
              <h3>{recipe.strMeal}</h3>
            </RecipeCard>
          </SplideSlide>
        ))}
      </Splide>

      {selectedRecipe && (
        <RecipeDetails recipe={selectedRecipe} onClose={handleDetailsClose} />
      )}
    </FeaturedRecipesContainer>
  );
}

export default FeaturedRecipes;

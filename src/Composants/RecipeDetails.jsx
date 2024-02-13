import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const DetailsContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  display: flex;
  flex-direction: column; 
  max-width: 800px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
  overflow-y: auto; 
  max-height: 80vh; 
`;

const RecipeImage = styled.img`
width: 60%;
  max-height: 60%; 
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto; 
  display: block; 
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  margin-bottom: 20px; /
`;

const IngredientsContainer = styled.div`
  /* No need to style */
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const RecipeDetails = ({ recipe, onClose }) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <DetailsContainer>
      <DetailsContent>
        <RecipeImage src={recipe.strMealThumb} alt={recipe.strMeal} />
        <TextContainer>
          <Title>{recipe.strMeal}</Title>
          <p>{recipe.strInstructions}</p>
        </TextContainer>
        <IngredientsContainer>
          <h3>Ingredients:</h3>
          <IngredientsList>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </IngredientsList>
        </IngredientsContainer>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </DetailsContent>
    </DetailsContainer>
  );
};

export default RecipeDetails;

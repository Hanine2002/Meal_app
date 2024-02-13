import React, { useEffect, useState } from 'react';
import Header2 from './Header2';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`;

const RecipeDetailsContainer = styled.div`
  width: 400px;
  margin: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
`;


const CategoryImage = styled.img`
width: 100%;
max-height: 300px; /* Définissez la hauteur maximale souhaitée */
object-fit: cover;
border-radius: 8px;
margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  font-size: 1.5rem;
`;
/*
const Subtitle = styled.p`
  margin-bottom: 8px;
  color: #555;
`;
*/
const Instructions = styled.p`
  margin-bottom: 16px;
  display: ${(props) => (props.showDetails ? 'block' : 'none')};
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  margin-bottom: 16px;
  display: ${(props) => (props.showIngredients ? 'block' : 'none')};
`;
const RecipeCard = styled.div`
  width: 400px;
  margin: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  text-decoration: underline;
  margin-top: 10px;
`;

const YoutubeLink = styled.a`
  color: #3498db;
  text-decoration: none;
  display: block;
  margin-top: 10px;
`;

// ... (imports)

function Favoris() {
  const [storedFavorites, setStoredFavorites] = useState([]);

  useEffect(() => {
    // Charger les favoris depuis localStorage au montage
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Favorites loaded from localStorage:', favoritesFromStorage);

    // Mettre à jour l'état des favoris
    setStoredFavorites(favoritesFromStorage);
  }, []);

  const RecipeCard = ({ recipe }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);

    if (!recipe || !recipe.strMealThumb || !recipe.strMeal) {
      console.log("Données de recette manquantes ou incorrectes", recipe);
      return null;
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    const isFavorite = storedFavorites.some((fav) => fav.idMeal === recipe.idMeal);

    const handleRemoveFromFavorites = () => {
      // Supprimer la recette des favoris
      const updatedFavorites = storedFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);

      console.log('Removing from favorites:', recipe.idMeal);

      // Mettre à jour l'état des favoris et localStorage
      setStoredFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      console.log('Favorites after removal:', updatedFavorites);
    };

    return (
      <RecipeDetailsContainer>
        <CategoryImage src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div>
          <TitleContainer>
            <Title onClick={() => setShowDetails(!showDetails)}>{recipe.strMeal}</Title>
            <RemoveButton onClick={handleRemoveFromFavorites} isFavorite={isFavorite}>
              <FontAwesomeIcon icon={faTrash} />
            </RemoveButton>
          </TitleContainer>
          {recipe.strYoutube && (
            <YoutubeLink href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </YoutubeLink>
          )}
          <Instructions showDetails={showDetails}>{recipe.strInstructions}</Instructions>
          <ToggleButton onClick={() => setShowIngredients(!showIngredients)}>
            {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
          </ToggleButton>
          <IngredientsList showIngredients={showIngredients}>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </IngredientsList>
        </div>
      </RecipeDetailsContainer>
    );
  };

  return (
    <>
      <Header2 />
      <RecipesContainer>
        {storedFavorites.map((favRecipe) => (
          <RecipeCard key={favRecipe.idMeal} recipe={favRecipe} />
        ))}
      </RecipesContainer>
    </>
  );
}

export default Favoris;

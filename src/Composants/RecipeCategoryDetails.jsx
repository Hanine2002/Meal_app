import React, { useState, useEffect } from 'react';
import {useParams}   from 'react-router-dom';
import styled from 'styled-components';
import RecipeDetails from './RecipeDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Header2 from './Header2';

const CategoryDetailsContainer = styled.div`
  width: 80%;
  margin: 20px auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RecipeCard = styled.div`
  width: 250px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const CategoryImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? 'Magenta' : 'Pink')};
  font-size: 1.5rem;
`;

const YoutubeLink = styled.a`
  color: #3498db;
  text-decoration: none;
  display: block;
  margin-top: 10px;
`;

function RecipeCategoryDetails({ updateFavorites }) {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [reload, setReload] = useState(false); 
  const { categoryName, input } = useParams();

  const searchTerm = input || '';
  const sanitizedCategoryName = categoryName ? categoryName.replace(/:/g, '') : '';
  const { countryname } = useParams();

  const sanitizedCountryName = countryname ? countryname.replace(/:/g, '') : '';


 
  const getFavoritesFromLocalStorage = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return storedFavorites;
  };

  const triggerReload = () => {
    setReload((prevReload) => !prevReload);
  };

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        let apiUrl='';

        const isNumeric = !isNaN(searchTerm);
      
        if(sanitizedCategoryName){
         apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${sanitizedCategoryName}`;
        }else if (sanitizedCountryName) {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${sanitizedCountryName}`;
          console.log('Country Name:', countryname);
        }else if (isNumeric) {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchTerm}`;
        } else  {
          
          const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
          const categoriesData = await categoriesResponse.json();

          
          const searchTermLower = searchTerm.toLowerCase();
          const isCategory = categoriesData.categories.some(
            (category) => category.strCategory.toLowerCase() === searchTermLower
          );

          if (isCategory) {
            apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`;
          } else if (searchTerm) {
            apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
          }
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('API URL:', apiUrl);

        console.log('API Response:', data);

        if (!data.meals) {
          console.error('No meals found for the query:', sanitizedCategoryName);
          return;
        }

        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();

        const mealDetails = await Promise.all(
          data.meals.map(async (meal) => {
            const detailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            const detailsData = await detailsResponse.json();

            if (detailsData.meals && detailsData.meals.length > 0) {
              const isFavorite = favoritesFromLocalStorage.some((fav) => fav.idMeal === meal.idMeal);
              return { ...detailsData.meals[0], isFavorite };
            } else {
              console.error('No details found for meal ID:', meal.idMeal);
              return null;
            }
          })
        );

        const filteredMealDetails = mealDetails.filter((meal) => meal !== null);
        setCategoryDetails(filteredMealDetails || []);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };

    fetchCategoryDetails();
  }, [searchTerm, sanitizedCategoryName, reload]); 

  const handleSliderClick = (recipeId) => {
    const selectedRecipe = categoryDetails.find((recipe) => recipe.idMeal === recipeId);
    if (selectedRecipe) {
      setSelectedRecipe(selectedRecipe);
    }
  };

  const handleDetailsClose = () => {
    setSelectedRecipe(null);
  };

  const addToFavorites = (recipe) => {
    const isFavorite = !recipe.isFavorite;

    const updatedCategoryDetails = categoryDetails.map((item) =>
      item.idMeal === recipe.idMeal ? { ...item, isFavorite } : item
    );

    setCategoryDetails(updatedCategoryDetails);
    
    const updatedFavorites = isFavorite
      ? [...getFavoritesFromLocalStorage(), recipe]
      : getFavoritesFromLocalStorage().filter((fav) => fav.idMeal !== recipe.idMeal);

    updateFavorites(updatedFavorites);

    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    
    triggerReload();
  };

  return (
    <>
      <Header2></Header2>
      <CategoryDetailsContainer>
        <Title>{sanitizedCategoryName} {sanitizedCountryName} {searchTerm} Recipes</Title>
        <RecipesContainer>
          {categoryDetails.map((recipe) => (
            <RecipeCard key={recipe.idMeal}>
              <CategoryImage
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                onClick={() => handleSliderClick(recipe.idMeal)}
              />
              <h3>{recipe.strMeal}</h3>
              <HeartButton onClick={() => addToFavorites(recipe)} isFavorite={recipe.isFavorite}>
                <FontAwesomeIcon icon={faHeart} />
              </HeartButton>
              {recipe.strYoutube && (
            <YoutubeLink href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </YoutubeLink>
          )}
            </RecipeCard>
          ))}
        </RecipesContainer>
        {selectedRecipe && <RecipeDetails recipe={selectedRecipe} onClose={handleDetailsClose} />}
      </CategoryDetailsContainer>
    </>
  );
}

export default RecipeCategoryDetails;

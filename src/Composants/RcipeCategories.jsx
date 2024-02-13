// RecipeCategories.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const CategoriesContainer = styled.div`
  width: 80%;
  margin: 20px auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CategoryCard = styled.div`
  width: 150px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;



function RecipeCategories() {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const storedData = localStorage.getItem('recipeCategories');
  
          if (storedData) {
            setCategories(JSON.parse(storedData));
          } else {
            const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
  
            localStorage.setItem('recipeCategories', JSON.stringify(data.categories || []));
            setCategories(data.categories || []);
          }
        } catch (error) {
          console.error('Error fetching recipe categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
    return (
      <CategoriesContainer>
        <Title>Recipe Categories</Title>
        <Splide
          options={{
            perPage: 5,
            pagination: false,
            breakpoints: {
              600: {
                perPage: 1,
              },
              900: {
                perPage: 2,
              },
            },
          }}
        >
          {categories.map((category) => (
            <SplideSlide key={category.idCategory}>
              <Link to={`/Composants/:${category.strCategory}`}>
                <CategoryCard>
                  <CategoryImage src={category.strCategoryThumb} alt={category.strCategory} />
                  <h3>{category.strCategory}</h3>
                </CategoryCard>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </CategoriesContainer>
    );
  }
  
  export default RecipeCategories;
  
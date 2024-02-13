import React from 'react'
import Header2 from '../Composants/Header2'
import styled from 'styled-components'
import FeaturedRecipes from '../Composants/FeaturedRecipes'
import RecipeCategories from '../Composants/RcipeCategories'
import Footer from '../Composants/Footer';
import About from '../Composants/About';
import CountriesSlider from '../Composants/CountriesSlider.jsx';


const Container=styled.div`
display:flex;
flex-direction:column;
`;
function Home() {

  return (
    <>
    <Container>
    <Header2></Header2>
    <About></About>
    <FeaturedRecipes/>
    <RecipeCategories/>
    <CountriesSlider/>
    
    
    </Container>
    </>
  )
}

export default Home
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
margin-top:30px;
  padding: 50px;
  text-align: center;
  background-color: #f8f8f8;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: #555;
`;

const CreativeText = styled.p`
  font-style: italic;
  color: #ff66b2;
`;

function About() {
  return (
    <AboutContainer>
      <Title>About Nadia's Kitchen</Title>
      <Description>
        Welcome to Nadia's Kitchen, your ultimate destination to discover delicious recipes
        from around the world. Our mission is to share the passion for cooking and inspire
        food enthusiasts to try new dishes and flavors.
      </Description>
      <CreativeText>
        Let yourself be taken on a unique culinary journey and explore the extraordinary flavors
        that the world of cuisine has to offer.
      </CreativeText>
    </AboutContainer>
  );
}

export default About;

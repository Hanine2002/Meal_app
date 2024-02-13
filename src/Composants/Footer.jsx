import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const StyledFooter = styled.div`
  color: white;
  background-color: grey;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 15px;
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  bottom: 0;
  width: 100%;
  position:relative;
`;

const FooterSection = styled.div`
  margin-bottom: 10px;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 10px;
`;

const SocialIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterSection>
        <h4 style={{color:"pink"}}>Contacte Us</h4>
        <p>Email: contact@nadiaskitchen.com</p>
      </FooterSection>

      <FooterSection>
        <h4 style={{color:"pink"}}>Social Media</h4>
        <SocialIcon icon={faFacebook} size="2x" color="white" />
        <SocialIcon icon={faTwitter} size="2x" color="white" />
        <SocialIcon icon={faInstagram} size="2x" color="white" />
      </FooterSection>

      <FooterSection>
        <h4 style={{color:"pink"}}>Subscribe to our newsletter</h4>
        <p>Receive delicious recipes directly in your inbox.</p>
        <input placeholder='Write your Email'></input>
      </FooterSection>

    </StyledFooter>
  );
}

export default Footer;

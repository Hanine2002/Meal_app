import styled from "styled-components";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUtensils, faHeart } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

const Head = styled.div`
  color: white;
  background-color: grey;
  align-items: center; /* Centrage vertical */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  position: fixed;
  height:70px;
  width: 100%;
  left:0;
  top: 0;
  z-index: 1000;
`;

const SearchBarre = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  justify-content: flex-end;
  width: 40%;
  margin-right:10px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

const Header = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
      console.log('valeur : ' + e.target.value);
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <>
      <Head>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <FontAwesomeIcon icon={faUtensils} size="3x" color="pink" style={{ marginRight: "10px" }} />
          <h1>Nadia'<span style={{ color: "pink" }}>s</span> Kitchen</h1>
        </Link>
        
        <SearchBarre>
          <FontAwesomeIcon icon={faSearch} size="3x" color="pink" />
          <SearchInput
            placeholder="Search Recipe"
            onKeyDown={handleSearch}
          />
        </SearchBarre>
        <Link to="/favoris" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', marginLeft: '20px',marginRight:'30px' }}>
          <FontAwesomeIcon icon={faHeart} size="2x" color="pink" style={{ marginRight: "10px" }} />
        </Link>
      </Head>
      {/* Placeholder for content to prevent it from being hidden behind the fixed header */}
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Header;

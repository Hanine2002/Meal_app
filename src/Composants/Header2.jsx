import React from 'react';
import { useState } from 'react';
import Header from './Header';

function Header2() {
    const [searchTerm, setSearchTerm] = useState('');
  return (
    <Header onSearch={setSearchTerm}></Header>
  )
}

export default Header2
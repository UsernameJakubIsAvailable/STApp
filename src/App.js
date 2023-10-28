import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './elements/header/Header.js';
import Main from './elements/main/Main.js';
import Nav from './elements/nav/Nav.js';
import { useState } from 'react';



function App() {
  const [searchValue, setSearchValue] = useState()
  const handleValueChange = (e)=>{
    setSearchValue(e.target.value)
    }
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Nav handleValueChange={handleValueChange} searchValue={searchValue}/>
      <Main searchValue={searchValue}/>
      </BrowserRouter>
    </>
  );
}

export default App;

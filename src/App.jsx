import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Photos from './components/Photos';
import Favourites from './components/Favourites';
import { FaSearch } from 'react-icons/fa';



function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <nav className="navbar">
            <div className="navbar_logo">   
              FOTOFLIX
            </div>
            <form action='' className='navbar_search-form'>
              <input type='text' className='form-input' placeholder='search'/>
              <button type='submit' className='submit-btn'>
                <FaSearch />
              </button>
            </form>
            <div className="navbar_links">
              <Link to="/">Home</Link>
              <Link to="/Favourites">Favourites</Link>
            </div>
          </nav>
          <Routes>
            <Route path='/' element={<Photos />}/>
            <Route path='/Favourites' element={<Favourites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App

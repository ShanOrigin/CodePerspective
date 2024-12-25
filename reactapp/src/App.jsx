import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import NavBar from './Components/Header/Header';
import HeadNavigation from './Components/Header/Navigation';

import MainNavigation from './Components/Main/Navigation';

import Footer from './Components/Footer/Footer';
import FooterNavigation from './Components/Footer/Navigation';

//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isThemeModeDark, setIsThemeModeDark] = useState(
    JSON.parse(localStorage.getItem('isThemeModeDark'))
  );
  return (
    <>
      <div
        className={`root-container ${
          isThemeModeDark ? 'night-mode' : 'day-mode'
        }  `}
      >
        <BrowserRouter>
          <NavBar theme={[isThemeModeDark, setIsThemeModeDark]} />

          <main className="main-container">
            {/* Main section */}
            <HeadNavigation /> {/* Calling header Navigation*/}
            <MainNavigation /> {/*Calling Main Navigation*/}
            <FooterNavigation /> {/* Calling Footer Navigation*/}
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

/*
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from './Images/logo.svg';

import FilterdSearch from './SubComponents/JS/Search';
import Offcanvas from './SubComponents/JS/LeftOffCanvas';

export default function NavBar(props) {
  const [isToggle, setIsToggle] = useState(false);
  const [isThemeModeDark, setIsThemeModeDark] = props.theme;

  const [input, setInput] = useState('');
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowSize(window.innerWidth));
  }, []);

  return (
    <>
      <header className={`header-container `}>
        <nav className="nav-bar">
          <div className="left-navbar-container">
            <div className="dashbord">
              <Offcanvas></Offcanvas>
            </div>
            <div className="logo">
              <img src={Logo} alt="p logo" />
            </div>
            <button
              onClick={() => {
                setIsToggle(!isToggle);
                setInput('');
              }}
              className="toggle-button"
            >
              <i className={`fa-solid fa-${isToggle ? 'x' : `bars`}`}></i>
            </button>
          </div>

          <div
            className={`right-navbar-container ${isToggle ? 'showMenu' : ''}`}
          >
            <div className="link-container">
              <NavLink className="links" exact to="/">
                <span className="nav-links">Home</span>{' '}
              </NavLink>
              <NavLink className="links" exact to="/LogIn">
                <span className="nav-links">LogIn</span>
              </NavLink>
            </div>

            <div className="search-view-mode">
              <div className="search-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  value={input}
                  placeholder="Search for a operation..."
                  onChange={(e) => {
                    setInput(e.target.value.toLowerCase());
                    console.log(input);
                  }}
                />

                {windowSize > 500 && input.length > 0 ? (
                  <div className="filter-search">
                    <FilterdSearch queryArray={[input, setInput]} />
                  </div>
                ) : null}
              </div>

              <div className="theme-changer">
                <button
                  className="button-none"
                  onClick={() => {
                    setIsThemeModeDark(!isThemeModeDark);
                    localStorage.setItem('isThemeModeDark', !isThemeModeDark);
                  }}
                >
                  <i
                    className={`fa-solid fa-${isThemeModeDark ? 'sun' : 'moon'}`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {windowSize < 500 && input.length > 0 ? (
          <div className="filter-search">
            <FilterdSearch queryArray={[input, setInput]} />
          </div>
        ) : null}
      </header>
    </>
  );
}

*/

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from './Images/logo.svg';

import FilterdSearch from './SubComponents/JS/Search';
import Offcanvas from './SubComponents/JS/LeftOffCanvas';
import { useNavigationData } from '../../Hooks/useNavigationData';

export default function NavBar(props) {
  const [isToggle, setIsToggle] = useState(false);
  const [isThemeModeDark, setIsThemeModeDark] = props.theme;

  useEffect(() => {
    console.log('rendering parent component');
  });

  return (
    <>
      <header className={`header-container `}>
        <nav className="nav-bar">
          <div className="left-navbar-container">
            <div className="dashbord">
              <Offcanvas></Offcanvas>
            </div>
            <div className="logo">
              <img src={Logo} alt="p logo" />
            </div>
            <button
              onClick={() => {
                setIsToggle(!isToggle);
              }}
              className="toggle-button"
            >
              <i className={`fa-solid fa-${isToggle ? 'x' : `bars`}`}></i>
            </button>
          </div>

          <div
            className={`right-navbar-container ${isToggle ? 'showMenu' : ''}`}
          >
            <div className="link-container">
              <NavLink className="links" exact to="/">
                <span className="nav-links">Home</span>{' '}
              </NavLink>
              <NavLink className="links" exact to="/LogIn">
                <span className="nav-links">LogIn</span>
              </NavLink>
            </div>

            <div className="search-view-mode">
              <div className="search-area">
                <FilterdSearch Data={useNavigationData()} />
              </div>
              <div className="theme-changer">
                <button
                  className="button-none"
                  onClick={() => {
                    setIsThemeModeDark(!isThemeModeDark);
                    localStorage.setItem('isThemeModeDark', !isThemeModeDark);
                  }}
                >
                  <i
                    className={`fa-solid fa-${isThemeModeDark ? 'sun' : 'moon'}`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

import React from 'react';
import '../css/style.css';
import '../css/font.css';
import logoK from '../img/K.png';
import logo from '../img/frak.png';
import logoConf from '../img/confi.png';
import logoUser from '../img/User_03.svg';
import { Link } from 'react-router-dom';

export const Navbar = ({ onPageChange, setShowLogin, isBlurry }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <header className={isBlurry ? 'blur' : ''}>  {/* Agregar aquí la clase blur */}
      <div className="navbar__logo-opciones">
        <div className="caja">
          <img onClick={() => handlePageClick('home')} src={logo} alt="Logo" className="logito" />
        </div>
        <div className="navbar__opciones">
          <Link to="/market" className="button" onClick={() => handlePageClick('market')}>Market</Link>
          <Link to="/token" className="button" onClick={() => handlePageClick('token')}>Token</Link>
          <Link to="/trade" className="button" onClick={() => handlePageClick('trade')}>Trade</Link>
          <Link to="/wallet" className="button" onClick={() => handlePageClick('wallet')}>Wallet</Link>
          <Link to="/global" className="button" onClick={() => handlePageClick('global')}>Global</Link>
          <Link to="/news" className="button" onClick={() => handlePageClick('news')}>News</Link>
        </div>
      </div>

      <div className="navbar__inicio-config">
        <div className="caja3">
          <img onClick={() => setShowLogin(true)} src={logoUser} alt="Logo" className="logoUser" />
        </div>
        <div className="caja2">
          <img src={logoConf} alt="Logo" className="logoConf" />
        </div>
      </div>
      <div className="celu">
        <div className="cajaK">
          <img src={logoK} alt="Logo" className="logitoK" />
        </div>
        <div className="cajaK">
          <img src={logo} alt="Logo" className="logitok" />
        </div>
        <label className="container">
          <input type="checkbox" />
          <div className="checkmark">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </label>
      </div>
    </header>
  );
};


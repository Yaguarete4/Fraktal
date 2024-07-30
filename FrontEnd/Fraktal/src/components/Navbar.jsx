import React from 'react';
import '../css/style.css';
import '../css/font.css';
import logoK from '../img/K.png';
import logo from '../img/frak.png';
import logoConf from '../img/confi.png';
import logoUser from '../img/User_03.svg';

export const Navbar = ({ onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <header>
      <div className="navbar__logo-opciones">
        <div className="caja">
          <img src={logo} alt="Logo" className="logito" />
        </div>
        <div className="navbar__opciones">
          <button onClick={() => handlePageClick('market')}>Market</button>
          <button onClick={() => handlePageClick('token')}>Token</button>
          <button onClick={() => handlePageClick('trade')}>Trade</button>
          <button onClick={() => handlePageClick('wallet')}>Wallet</button>
          <button onClick={() => handlePageClick('global')}>Global</button>
          <button onClick={() => handlePageClick('news')}>News</button>
        </div>
      </div>

      <div className="navbar__inicio-config">
        <div className="caja3">
          <img onClick={() => handlePageClick('user')} src={logoUser} alt="Logo" className="logoUser" />
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

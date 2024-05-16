import React from 'react';
import '../css/style.css';
import '../css/font.css'
import logoK from './K.png';
import logo from './frak.png';
import logoConf from './confi.png';
import logoUser from './User_03.svg';

export const Navbar = ({ onUserClick }) => {
  const handleUserClick = () => {
    onUserClick();
  };

  return (
    <header>
      <div className="caja">
        <img src={logo} alt="Logo" className="logito" />
      </div>
      <div className="stuff">Market</div>
      <div className="stuff">Token</div>
      <div className="stuff">Trade</div>
      <div className="stuff">Wallet</div>
      <div className="stuff">Global</div>
      <div className="stuff">News</div>

      <div className="caja3" onClick={handleUserClick}>
        <img src={logoUser} alt="Logo" className="logoUser" />
      </div>
      <div className="caja2">
        <img src={logoConf} alt="Logo" className="logoConf" />
      </div>
      <div className="celu">
        <div className="cajaK">
          <img src={logoK} alt="Logo" className="logitoK" />
        </div>
        <div className="cajaK">
          <img src={logo} alt="Logo" className="logitok" />
        </div>
        <label className="container">
          <input type="checkbox"/>
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

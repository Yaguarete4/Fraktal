import React from 'react';
import '../css/style.css';
import '../css/font.css';
import logoK from '../img/K.png';
import logo from '../img/frak.png';
import logoConf from '../img/confi.png';
import logoUser from '../img/User_03.svg';
import { Link } from 'react-router-dom';

export const Navbar = ({ onMenuToggle, setShowLogin, isBlurry }) => {
  return (
    <header className={isBlurry ? 'blur' : ''}>  {/* Agregar aquí la clase blur */}
      <div className="navbar__logo-opciones">
      <Link to="/" className="caja">
      <img src={logo} alt="Logo" className="logito" />
        </Link>
        <div className="navbar__opciones">
          <Link to="/market" className="button">Mercado</Link>
          <Link to="/token" className="button">Token</Link>
          <Link to="/trade" className="button">Trade</Link>
          <Link to="/wallet" className="button">Portafolio</Link>
          <Link to="/token-register" className="button">Pre-venta</Link>
          <Link to="/news" className="button">News</Link>
        </div>
      </div>

      <div className="navbar__inicio-config">
        <div className="caja3">
          <Link to="/login">
            <img src={logoUser} alt="Logo" className="logoUser" onClick={() => setShowLogin(true)} />
          </Link>
        </div>
        <div className="caja2">
          <img src={logoConf} alt="Logo" className="logoConf" />
        </div>
      </div>
      <div className="celu">
      <Link to="/" className="cajak">
      <img src={logoK} alt="Logo" className="logitoK" />
        </Link>
        <Link to="/" className="cajak">
        <img src={logo} alt="Logo" className="logitok" />
        </Link>
        <label className="container">
          <input type="checkbox" onChange={onMenuToggle} />
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

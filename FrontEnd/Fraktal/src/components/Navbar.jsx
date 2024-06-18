import React from 'react';
import '../css/style.css';
import '../css/font.css'
import logoK from '../img/K.png';
import logo from '../img/frak.png';
import logoConf from '../img/confi.png';
import logoUser from '../img/User_03.svg';

export const Navbar = ({ onUserClick }) => {
  const handleUserClick = () => {
    onUserClick();
  };

  return (
    <header>
      <div className="caja">
        <img src={logo} alt="Logo" className="logito" />
      </div>
      <button>Market</button>
      <button>Token</button>
      <button>Trade</button>
      <button>Wallet</button>
      <button>Global</button>
      <button>News</button>
      <div className="ini">Iniciar sesion</div>
      <div className="log">Registrarse</div>
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

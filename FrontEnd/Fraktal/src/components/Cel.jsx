import React from "react";
import '../css/cel.css'; 
import flech from '../img/chevron.svg';
import { Link } from 'react-router-dom';


export const Cel = ({ className }) => {
  return (
    <div className={`dropdowns ${className}`}>
      <div className="dropdown">
      <button className="button-class" onClick={(e) => e.target.focus()}>
  Tokens
  <img 
    src={flech} 
    className="img-class" 
    alt="chevron" 
    onClick={(e) => {
      e.stopPropagation();  // Evita que se propague el evento al botón padre.
      e.target.closest('button').focus();  // Aplica el enfoque al botón padre.
    }} 
  />
</button>

        <div className="dropdown-menu">
        <Link to="/market" className="celup">Mercado
        </Link>
        <Link to="/wallet" className="celup">Portafolio
        </Link>        
        </div>
      </div>
      <div className="dropdown">
      <button className="button-class" onClick={(e) => e.target.focus()}>
  Usuario
  <img 
    src={flech} 
    className="img-class" 
    alt="chevron" 
    onClick={(e) => {
      e.stopPropagation();  // Evita que se propague el evento al botón padre.
      e.target.closest('button').focus();  // Aplica el enfoque al botón padre.
    }} 
  />
</button>

        <div className="dropdown-menu">
        <Link to="/signup" className="celup">Iniciar sesion
        </Link>
        <Link to="/login" className="celup">Registrarse
        </Link>
      </div>
      </div>
      <div className="dropdown">
        <button className="button-class">
          Pre-venta
        </button>
      </div>
    </div>
  );
};

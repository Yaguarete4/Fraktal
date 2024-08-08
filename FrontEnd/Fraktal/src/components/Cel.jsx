import React from "react";
import '../css/cel.css'; 
import flech from '../img/chevron.svg';

export const Cel = ({ className }) => {
  return (
    <div className={`dropdowns ${className}`}>
      <div className="dropdown">
<button className="button-class" onClick={(e) => e.target.focus()}>
  Tokens
  <img src={flech} className="img-class" alt="chevron" />
</button>

        <div className="dropdown-menu">
          <div className="celup">Mercado</div>
          <div className="celup">Portafolio</div>
        </div>
      </div>
      <div className="dropdown">
        <button className="button-class">
          User
          <img src={flech} className="img-class" alt="chevron" />
        </button>
        <div className="dropdown-menu">
          <div className="celup">Iniciar sesion</div>
          <div className="celup">Registrase</div>
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

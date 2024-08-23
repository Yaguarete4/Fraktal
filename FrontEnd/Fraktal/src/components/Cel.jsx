import React, { useContext } from "react";
import '../css/cel.css'; 
import flech from '../img/chevron.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export const Cel = ({ className }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className={`dropdowns ${className}`}>
            {isLoggedIn ? (
                <div className="dropdown">
                    <button className="button-class">
                        Usuario
                    </button>
                </div>
            ) : (
                <div className="dropdown">
                    <button className="button-class" onClick={(e) => e.target.focus()}>
                        Usuario
                        <img 
                            src={flech} 
                            className="img-class" 
                            alt="chevron" 
                            onClick={(e) => {
                                e.stopPropagation();
                                e.target.closest('button').focus();
                            }} 
                        />
                    </button>
                    <div className="dropdown-menu">
                        <Link to="/login" className="celup">Iniciar sesion</Link>
                        <Link to="/signup" className="celup">Registrarse</Link>
                    </div>
                </div>
            )}
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
                <button className="button-class">
                    Pre-venta
                </button>
            </div>
            <div className="dropdown">
                <button className="button-class">
                    Configuracion
                </button>
            </div>
        </div>
    );
};

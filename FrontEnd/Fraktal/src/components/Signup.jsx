import React, { useEffect } from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';
import logoGoogle from '../img/google.svg';

    
export const Signup = () => {
    return (
        <div className="signupContainer">
            <div className="titu">Inicia Sesion</div>
            <input placeholder="Usuario" className="input" name="text" type="text"></input>
            <input placeholder="Contraseña" className="input" name="text" type="text"></input>
            <button className="regi">Iniciar sesion</button>            
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿Es tu primera vez?</div>
                <Link to="/login" className="linki">Registrate</Link>
            </div>      
            <button className="but">
                <img src={logoGoogle} alt="Logo de Google" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Iniciar sesion con Google
            </button>    
        </div>
    );
};


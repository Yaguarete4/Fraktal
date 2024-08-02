import React, { useEffect } from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';
import logoGoogle from '../img/google.svg';
    
export const Login = () => {
    return (
        <div className="loginContainer">
            <div className="titu">Registrarse</div>
            <input placeholder="Nombre de usuario" className="input" name="text" type="text"></input>
            <input placeholder="Mail" className="input" name="text" type="text"></input>
            <input placeholder="Contraseña" className="input" name="text" type="text"></input>
            <input placeholder="Confirmar constraseña" className="input" name="text" type="text"></input>
            <button className="regi">Registrarse</button>            
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿Ya tienes una cuenta?</div>
                <Link to="/signup" className="linki">Iniciar sesión</Link>
            </div>      
            <button className="but">
                <img src={logoGoogle} alt="Logo de Google" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Regístrate con Google
            </button>    
        </div>
    );
};

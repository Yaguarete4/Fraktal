
import React, { useEffect } from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';

export const Login = () => {

    return (
        <div className="loginContainer">
            <div className="titu">Registrarse</div>
            <input placeholder="Nombre de usuario" class="input" name="text" type="text"></input>
            <input placeholder="Mail" class="input" name="text" type="text"></input>
            <input placeholder="Contraseña" class="input" name="text" type="text"></input>
            <input placeholder="Confirmar constraseña" class="input" name="text" type="text"></input>
            <button className="regi">Registrarse</button>            
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿Ya tienes una cuenta?</div>
                <Link to="/signup" className="linki">Iniciar sesion</Link>
            </div>      
            <button className="but">Registrate con Google</button>    
        </div>
  );
};
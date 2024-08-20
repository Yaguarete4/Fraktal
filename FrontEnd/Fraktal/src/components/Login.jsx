import React, { useEffect } from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoGoogle from '../img/google.svg';
    
export const Login = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        name: 'Joaquin',
        surname: 'Barsky',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://fraktalapi.vercel.app/auth/register', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(formValues),
            })
    
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="signupContainer">
            <div className="titu">Iniciar sesion</div>
            <input placeholder="Nombre de usuario" className="input" name="username" type="text" onChange={handleInputChange}></input>
            <input placeholder="Contraseña" className="input" name="password" type="password" onChange={handleInputChange}></input>
            <button className="regi" onClick={handleSubmit}>Iniciar sesion</button>            
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿No tienes una cuenta?</div>
                <Link to="/signup" className="linki">Registrate</Link>
            </div>      
            <button className="but">
                <img src={logoGoogle} alt="Logo de Google" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Regístrate con Google
            </button>    
        </div>
    );
};

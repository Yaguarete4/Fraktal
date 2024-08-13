import React, { useEffect } from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoGoogle from '../img/google.svg';

    
export const Signup = () => {
    const [formValues, setFormValues] = useState({
        usernameEmail: '',
        password: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://fraktalapi.vercel.app/auth/login', {
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
            <div className="titu">Inicia Sesion</div>
            <input placeholder="Usuario" className="input" name="usernameEmail" type="text" onChange={handleInputChange}></input>
            <input placeholder="Contraseña" className="input" name="password" type="password" onChange={handleInputChange}></input>
            <button className="regi" onClick={handleSubmit}>Iniciar sesion</button>            
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


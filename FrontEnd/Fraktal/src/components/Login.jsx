import React, { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import logoGoogle from '../img/google.svg';

export const Login = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        name: 'Joaquin',
        surname: 'Barsky',
        password: '',
        confirmPassword: ''
    });

    const [isRegistered, setIsRegistered] = useState(false);

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
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                // Mostrar mensaje de registro exitoso
                setIsRegistered(true);

                // Redirigir después de 1 segundo
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }

        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="loginContainer">
            <div className="titu">Registrarse</div>
            <input placeholder="Nombre de usuario" className="input" name="username" type="text" onChange={handleInputChange}></input>
            <input placeholder="Mail" className="input" name="email" type="text" onChange={handleInputChange}></input>
            <input placeholder="Contraseña" className="input" name="password" type="password" onChange={handleInputChange}></input>
            <input placeholder="Confirmar constraseña" className="input" name="confirmPassword" type="password" onChange={handleInputChange}></input>
            <button className="regi" onClick={handleSubmit}>Registrarse</button>            
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿Ya tienes una cuenta?</div>
                <Link to="/login" className="linki">Iniciar sesión</Link>
            </div>      
            <button className="but">
                <img src={logoGoogle} alt="Logo de Google" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Regístrate con Google
            </button>    
            
            {isRegistered && (
                <div className="successMessage">
                    Registro exitoso
                </div>
            )}
        </div>
    );
};

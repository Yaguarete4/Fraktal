import React, { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import logoGoogle from '../img/google.svg';
import i from '../img/i.svg';

export const Signup = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleBack = () => {
        setShowError(false);
        setErrorMessage('');
    };

    const handleSubmit = async () => {
        // Validar los campos antes de enviar
        if (!formValues.username || !formValues.email) {
            setErrorMessage('Faltan campos a completar.');
            setShowError(true);
            return;
        }
        
        // Validar si el correo contiene '@gmail.com'
        if (!formValues.email.includes('@gmail.com')) {
            setErrorMessage('El mail es incorrecto');
            setShowError(true);
            return;
        }

        if (!formValues.password || !formValues.confirmPassword) {
            setErrorMessage('La contraseña no es válida.');
            setShowError(true);
            return;
        }
        if (formValues.password !== formValues.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            setShowError(true);
            return;
        }

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

            // Mostrar mensaje de registro exitoso
            setIsRegistered(true);

            // Redirigir después de 1 segundo
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {
            console.error('Error:', err);
            setErrorMessage('Hubo un error en el registro. Inténtalo nuevamente.');
            setShowError(true);
        }
    };

    return (
        <div className="loginContainer">
            <div className="titu">Registrarse</div>
            <input 
                placeholder="Nombre de usuario" 
                className="input" 
                name="username" 
                type="text" 
                onChange={handleInputChange}
                value={formValues.username}
            />
            <input 
                placeholder="Mail" 
                className="input" 
                name="email" 
                type="email" 
                onChange={handleInputChange}
                value={formValues.email}
            />
            <input 
                placeholder="Contraseña" 
                className="input" 
                name="password" 
                type="password" 
                onChange={handleInputChange}
                value={formValues.password}
            />
            <input 
                placeholder="Confirmar contraseña" 
                className="input" 
                name="confirmPassword" 
                type="password" 
                onChange={handleInputChange}
                value={formValues.confirmPassword}
            />
            <button className="regi" onClick={handleSubmit}>Registrarse</button>            
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿Ya tienes una cuenta?</div>
                <Link to="/login" className="linki">Iniciar sesión</Link>
            </div>      
            <button className="but">
                <img src={logoGoogle} alt="Logo de Google" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Regístrate con Google
            </button>    
            
            {showError && (
                <div className="contra">
                    <img src={i} alt="i" className="i-img" />
                    <div className="t">{errorMessage}</div>
                    <div className="t">Haz clic en el botón volver.</div>
                    <button className="volver-form" onClick={handleBack}>Volver</button>
                </div>
            )}

            <div className={`successMessage ${isRegistered ? 'show' : ''}`}>
                Registro exitoso
            </div>
        </div>
    );
};

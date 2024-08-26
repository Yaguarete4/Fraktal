import React, { useContext, useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import logoGoogle from '../img/google.svg';
import i from '../img/i.svg';

export const Login = () => {
    const { login, handleAccessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        usernameEmail: '',
        password: ''
    });

    const [showError, setShowError] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        if (formValues.password  === '') {
            setShowError(true);
            return;
        }

        try {
            const response = await fetch('https://fraktalapi.vercel.app/auth/login', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(formValues),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                login();
                handleAccessToken(data.accessToken);
                navigate('/')
            } else if (data.error === 'Invalid credentials') {
                setShowError(true);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleBack = () => {
        setShowError(false);
    };

    return (
        <> 
        <div className={`overlay ${showError ? 'active' : ''}`}></div>
        <div className="signupContainer">
            <div className="titu">Iniciar sesión</div>
            <input placeholder="Nombre de usuario" className="input" name="usernameEmail" type="text" onChange={handleInputChange} disabled={showError}></input>
            <input placeholder="Contraseña" className="input" name="password" type="password" onChange={handleInputChange} disabled={showError}></input>
            <button className="regi" onClick={handleSubmit} disabled={showError}>Iniciar sesión</button>
            <div className="caja-inicio-sesion">
                <div className="inicio-sesion">¿No tienes una cuenta?</div>
                <Link to="/signup" className="linki">Regístrate</Link>
            </div>
            <button className="but" disabled={showError}>
                <img src={logoGoogle} alt="Logo de Google" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Regístrate con Google
            </button>
        </div>

        {showError && (
            <div className="contra">
                <img src={i} alt="i" className="i-img" />
                <div className="t">La contraseña no es válida.</div>
                <div className="t">Haz clic en el botón volver.</div>
                <button className="volver-form" onClick={handleBack}>Volver</button>
            </div>
        )}
        </>
    );
};

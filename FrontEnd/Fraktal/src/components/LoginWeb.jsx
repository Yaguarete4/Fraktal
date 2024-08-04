import React, { useState } from 'react';
import '../css/style1.css';
import { Barra } from './BarraPrincipal';
import { Login } from './Login';
import { Navbar } from './Navbar'; // Asegúrate de importar el Navbar

export const LoginWeb = () => {
    const [showLogin, setShowLogin] = useState(true);

    const closeLogin = () => {
        setShowLogin(false);
    };

    return (
        <>
            <Navbar onPageChange={(page) => console.log(page)} setShowLogin={setShowLogin} isBlurry={showLogin} />
            <div className={`conte ${showLogin ? "blur" : ""}`}>
                <div className="titulo">Invertir&nbsp;</div>
                <div className="animated-text"><span></span></div>
            </div>
            <div className="wrapper">
                <div className="itemLeft item1"></div>
                <div className="itemLeft item2"></div>
                <div className="itemLeft item3"></div>
                <div className="itemLeft item4"></div>
                <div className="itemLeft item5"></div>
                <div className="itemLeft item6"></div>
                <div className="itemLeft item7"></div>
                <div className="itemLeft item8"></div>
            </div>
            {showLogin && (
                <div className="modal">
                    <Login />
                </div>
            )}
        </>
    );
};

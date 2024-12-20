import React, { useState } from 'react';
import '../css/style1.css';
import { Barra } from './BarraPrincipal';
import { Login } from './Login';
import { Navbar } from './Navbar'; // Asegúrate de importar el Navbar
import { Signup } from './Signup';
import a2 from '../img/eth.svg';
import a1 from '../img/bitcoin.png';
import a3 from '../img/chami.svg';
import a4 from '../img/Skibidi Sigma.png';

export const SignupWeb = () => {
    const [showLogin, setShowLogin] = useState(true);

    const closeLogin = () => {
        setShowLogin(false);
    };

    return (
        <>
            <Navbar onPageChange={(page) => console.log(page)} setShowLogin={setShowLogin} isBlurry={showLogin} />
            {/* <div className={`conte ${showLogin ? "blur" : ""}`}> */}
            <div className={`conte ${showLogin ? "blur" : ""}`}>
                <div className="titulo">Invertir&nbsp;</div>        
                <div className="animated-text"><span></span></div>
            </div>
                <div className={`subconte ${showLogin ? "blur" : ""}`}>
                    <div className="subtitu">Inverti en proyectos con potencial mediante tokens</div>
                </div>
            <div className={`wrapper ${showLogin ? "blur" : ""}`}>
            <div className="itemLeft item1">
                    <img className="wrap-img" src={a1}></img>
                </div>
                <div className="itemLeft item2">
                    <img className="wrap-img" src={a2}></img>
                </div>
                <div className="itemLeft item3">
                    <img className="wrap-img" src={a3}></img>
                </div>
                <div className="itemLeft item4">
                    <img className="wrap-img" src={a4}></img>
                </div>
                <div className="itemLeft item5">
                    <img className="wrap-img" src={a1}></img>
                </div>
                <div className="itemLeft item6">
                    <img className="wrap-img" src={a2}></img>
                </div>
                <div className="itemLeft item7">
                    <img className="wrap-img" src={a3}></img>
                </div>
                <div className="itemLeft item8">
                <img className="wrap-img" src={a4}></img>
                </div>
            </div>
            {showLogin && (
                <div className="modal">
                    <Signup />
                </div>
            )}
        </>
    );
};

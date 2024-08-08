import React, { useState } from 'react';
import '../css/style1.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import a2 from '../img/eth.svg';
import a1 from '../img/bitcoin.png';


export const PaginaPrincipal = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);

    const handleMenuToggle = () => {
      setIsCelVisible(!isCelVisible);
    };
    return (
        <>
        <Navbar onMenuToggle={handleMenuToggle} />
        {isCelVisible && (
                <div className="modal2">
                    <Cel className="cel-center" />
                </div>
            )}
            <div className="conte">
                <div className="titulo">Invertir&nbsp;</div>        
                <div className="animated-text"><span></span></div>
            </div>
                <div className="subconte">
                    <div className="subtitu">Inverti en proyectos con potencial mediante tokens</div>
                </div>
           
            <div className="wrapper">
            <div className="itemLeft item1">
                </div>
                <div className="itemLeft item2">
                </div>
                <div className="itemLeft item3"></div>
                <div className="itemLeft item4"></div>
                <div className="itemLeft item5"></div>
                <div className="itemLeft item6"></div>
                <div className="itemLeft item7"></div>
                <div className="itemLeft item8"></div>
            </div>
        </>
    );
};

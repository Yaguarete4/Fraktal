import '../css/tokeninfo.css'; 
import a1 from '../img/bitcoin.png';
import React, { useState, useRef } from 'react'; // Elimina la importación redundante de useState
import { Cel } from './Cel';
import { Navbar } from './Navbar';

export const Tokeninfo = () => {
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
        <div className="caja-g">
            <div className="caja-nombre">
                <img className="logo-token" src={a1}></img>
                <div className="titu-token">Bitcoin Co</div>
                <button className="info-comprar">Comprar</button>
            </div>
        </div>
    </>
  );
};

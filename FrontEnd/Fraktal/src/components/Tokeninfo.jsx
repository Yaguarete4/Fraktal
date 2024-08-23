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
            <div className="caja-ben">
              <div className="titu-ben">Beneficios</div>
              <div className="cont-ben">Beneficio que el dueño le ofrece a los compradires. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
              <div className="cont-ben">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex </div>
              <div className="cont-ben">ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non</div>
              <div className="cont-ben">proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
            <div className="caja-inf">
              <div className="titu-ben">Informacion sobre el proyecto</div>
              <div className="cont-ben">Beneficio que el dueño le ofrece a los compradires. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
              <div className="cont-ben">proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
            <div className="caja-inf">
              <div className="titu-ben">Miembros</div>
              <div className="cont-ben">Joaquin Bar(tonto)sky, Matías Ronconi (Dios), Luca Cha(masome)mi y Matias Bu(pedorro)ñes</div>
            </div>
        </div>
    </>
  );
};

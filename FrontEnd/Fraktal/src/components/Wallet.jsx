
import '../css/wallet.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import React, { useState } from 'react'; 


export const Wallet = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);

    const handleMenuToggle = () => {
      setIsCelVisible(!isCelVisible);
    }
    return (
        <>
          <Navbar onMenuToggle={handleMenuToggle} />
        {isCelVisible && (
                <div className="modal2">
                    <Cel className="cel-center" />
                </div>
            )}
          <div className="caja-portafolio">
            <div className="titu-portafolio">Portafolio</div>
            <div className="plata">$ 1.683,36</div>
            <div className="profit">7,34% (+$43,22)</div>
            <div className="caja-but">
              <div className="but-portafolio">Ingresar</div>
              <div className="but-portafolio2">Retirar</div>
            </div>              
            <div className="caja-rendimiento">
                <div className="rendimiento-titu">Rendimientos</div>
                <div className="caja-chiki">
                  <div className="ren">
                    <div className="ren-nombre">Bitcoin BTC</div>
                  </div>
                  <div className="ren">
                    <div className="ren-nombre">Bitcoin B</div>
                  </div>
                  <div className="ren">
                    <div className="ren-nombre">Bitcoin B</div>
                  </div>
                </div>
              </div>
            <div className="caja-reparticion">
              <div className="dona-container">
                <div className="dona"></div>
                <div className="dona-text">$ 1.683,36</div>
              </div>

              <div className="caja-porcentaje">
                <div className="cuadra">
                  <div className="c1"></div>
                  <div className="c2"></div>
                  <div className="c3"></div>
                  <div className="c4"></div>
                </div>
                <div className="nombres-tokens">
                  <div className="t1">CHM</div>
                  <div className="t1">CHM</div>
                  <div className="t1">CHM</div>
                  <div className="t1">CHM</div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}


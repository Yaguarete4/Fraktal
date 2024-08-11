import React, { useState, useEffect } from 'react'; 
import '../css/wallet.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import a2 from '../img/eth.svg';
import a1 from '../img/bitcoin.png';

export const Wallet = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);
    const [animateProfit, setAnimateProfit] = useState(false);

    const handleMenuToggle = () => {
      setIsCelVisible(!isCelVisible);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateProfit(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
            <div className={`profit ${animateProfit ? 'animate' : ''}`}>
              7,34% (+$43,22)
            </div>
            <div className="caja-but">
              <div className="but-portafolio">Ingresar</div>
              <div className="but-portafolio2">Retirar</div>
            </div>              
            <div className="caja-rendimiento">
              <div className="rendimiento-titu">Rendimientos</div>
              <div className="caja-chiki">
                <div className="ren">
                  <img className="ren-img" src={a1} alt="Bitcoin" />
                  <div className="ren-nombre">Bitcoin BTC</div>
                  <div className="ren-ren">
                    <div className="ren1-green">+254.71</div>
                    <div className="ren-green">+0.36%</div>
                  </div>
                </div>
                <div className="ren">
                  <img className="ren-img" src={a2} alt="Etherium" />
                  <div className="ren-nombre">Etherium ETH</div>
                  <div className="ren-ren">
                    <div className="ren1-green">+74.95</div>
                    <div className="ren-green">+0.27%</div>
                  </div>
                </div>
                <div className="ren">
                  <img className="ren-img" src={a2} alt="ChamiCoin" />
                  <div className="ren-nombre">ChamiCoin CHM</div>
                  <div className="ren-ren">
                    <div className="ren1-red">-464.38</div>
                    <div className="ren-red">-0.89%</div>
                  </div>
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

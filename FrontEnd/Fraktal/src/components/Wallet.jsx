import React, { useState, useEffect } from 'react'; 
import '../css/wallet.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import a2 from '../img/l3.svg';
import a1 from '../img/l1.svg';
import a3 from '../img/l2.svg';
import a5 from '../img/usd.png';

export const Wallet = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);
    const [animateProfit, setAnimateProfit] = useState(false);
    const [animateCajaBut, setAnimateCajaBut] = useState(false);  // Asegúrate de definir el estado aquí
    const [animateRen, setAnimateRen] = useState(false);  // Asegúrate de definir el estado aquí

    const handleMenuToggle = () => {
      setIsCelVisible(!isCelVisible);
    }
    useEffect(() => {
      const handleScroll = () => {
          const profitElement = document.querySelector('.profit');
          const cajaButElement = document.querySelector('.caja-but');
          const renElement = document.querySelector('.caja-rendimiento');

          if (profitElement) {
              const rect = profitElement.getBoundingClientRect();
              if (rect.top < 120) {
                  setAnimateProfit(true);
              } else {
                  setAnimateProfit(false);
              }
          }

          if (cajaButElement) {
              const rect = cajaButElement.getBoundingClientRect();
              if (rect.top < 120) {  // Ajusta esta condición según cuándo quieras que la animación se dispare
                  setAnimateCajaBut(true);
              } else {
                  setAnimateCajaBut(false);
              }
          }
          if (renElement) {
            const rect = renElement.getBoundingClientRect();
            if (rect.top < 120) {  // Ajusta esta condición según cuándo quieras que la animación se dispare
                setAnimateRen(true);
            } else {
                setAnimateRen(false);
            }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
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
            <div className={`profit ${animateProfit ? 'fade-out' : 'fade-in'}`}>
              7,34% (+$43,22)
            </div>
            <div className={`caja-but ${animateCajaBut ? 'fade-out' : 'fade-in'}`}>
                    <div className="but-portafolio">Ingresar</div>
                    <div className="but-portafolio2">Retirar</div>
            </div>                       
            <div className={`caja-rendimiento ${animateRen ? 'fade-out' : 'fade-in'}`}>
              <div className="rendimiento-titu">Rendimientos</div>
              <div className="caja-chiki">
                <div className="ren">
                  <img className="ren-img" src={a1} alt="Bitcoin" />
                  <div className="ren-nombre">Aid Optics ADO</div>
                  <div className="ren-ren">
                    <div className="ren1-green">+254.71</div>
                    <div className="ren-green">+0.36%</div>
                  </div>
                </div>
                <div className="ren">
                  <img className="ren-img" src={a2} alt="Etherium" />
                  <div className="ren-nombre">Smart Security SEC</div>
                  <div className="ren-ren">
                    <div className="ren1-green">+74.95</div>
                    <div className="ren-green">+0.27%</div>
                  </div>
                </div>
                <div className="ren">
                  <img className="ren-img" src={a3} alt="ChamiCoin" />
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
                  <div className="sector">
                   <div className="c1"></div>
                   <div className="t1">CHM</div>
                   <img className="t-img" src={a3}></img>
                   <div className="porc">45%</div>
                  </div>
                  <div className="sector">
                   <div className="c2"></div>
                   <div className="t1">USD</div>
                   <img className="t-img" src={a5}></img>
                   <div className="porc">37.7%</div>
                  </div>
                  <div className="sector">
                   <div className="c3"></div>
                   <div className="t1">SEC</div>
                   <img className="t-img" src={a2}></img>
                   <div className="porc">10.8%</div>
                  </div>
                  <div className="sector">
                   <div className="c4"></div>
                   <div className="t1">ADO</div>
                   <img className="t-img" src={a1}></img>
                   <div className="porc">6.5%</div>
                  </div>                  
                </div>
              </div>
            </div>
            <div className="caja-act">
              <div className="act-pad">
                <div className="rendimiento-titu">Ultimas Transacciones</div>
                <div className="fecha">( 18 / 03 / 2024 )</div>       
                <div className="infoo">
                  <img src={a1} className="info-img"></img>  
                  <div className="caja-info">
                    <div className="compra">Compra</div>
                    <div className="qcompra">ADO</div>
                  </div>
                  <div className="info-porc1">-330 USD</div>
                </div>     
                <div className="fecha">( 11 / 03 / 2024 )</div>       
                <div className="infoo">
                  <img src={a1} className="info-img"></img>  
                  <div className="caja-info">
                    <div className="compra">Venta</div>
                    <div className="qcompra">ADO</div>
                  </div>
                  <div className="info-porc">+110 USD</div>
                </div>  
                <div className="infoo">
                  <img src={a2} className="info-img"></img>  
                  <div className="caja-info">
                    <div className="compra">Venta</div>
                    <div className="qcompra">SEC</div>
                  </div>
                  <div className="info-porc">+200 USD</div>
                </div>         
                <div className="fecha">( 10 / 03 / 2024 )</div>       
                <div className="infoo">
                  <img src={a1} className="info-img"></img>  
                  <div className="caja-info">
                    <div className="compra">Compra</div>
                    <div className="qcompra">ADO</div>
                  </div>
                  <div className="info-porc1">-100 USD</div>
                </div>     
                <div className="infoo">
                  <img src={a2} className="info-img"></img>  
                  <div className="caja-info">
                    <div className="compra">Compra</div>
                    <div className="qcompra">SEC</div>
                  </div>
                  <div className="info-porc1">-100 USD</div>
                </div>    
              </div>
            </div>
          </div>
        </>
    );
}

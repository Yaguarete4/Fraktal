import React, { useState, useRef } from 'react'; // Elimina la importación redundante de useState
import '../css/style1.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import a2 from '../img/l3.svg';
import a1 from '../img/l1.svg';
import a3 from '../img/l2.svg';
import a4 from '../img/Skibidi Sigma.png';
import { Spline } from './Spline';
import b1 from '../img/aq1.svg';
import b2 from '../img/aq2.svg';
import b3 from '../img/aq3.svg';
import b4 from '../img/aq4.svg';
import b5 from '../img/aq5.svg';


export const PaginaPrincipal = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);

    const handleMenuToggle = () => {
        setIsCelVisible(!isCelVisible);
    };
    const [flipped, setFlipped] = useState([false, false, false, false, false]);

    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };
    return (
        <>
            <Navbar onMenuToggle={handleMenuToggle} />
            {isCelVisible && (
                <div className="modal2">
                    <Cel className="cel-center" />
                </div>
            )}
            {/* <div className="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> */}
            <div className="conte">
                <div className="titulo">Invertir&nbsp;</div>        
                <div className="animated-text"><span></span></div>
            </div>
            <div className="subconte">
                <div className="subtitu">Inverti en proyectos con potencial mediante tokens</div>
            </div>
            <div className="wrapper">
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
            <div className="spi">
            <Spline/>
            </div>
            <div className="cartas">
                <div className="etapa">Etapas</div>
                <div className="card-board">
            <div className={`card small-card ${flipped[0] ? 'flipped' : ''}`} onClick={() => handleFlip(0)}>
                <div className="card-inner">
                    <div className="card-front">
                        <img className="img-ca" src={b1}></img>
                        <h2>Publicacion</h2>
                    </div>
                    <div className="card-back">
                        <h3>En un primer lugar, el publicador decide promover su negocio/pyme/startup en nuestra página en busca de inversiones qué lo ayuden a crecer.</h3>
                    </div>
                </div>
            </div>
            <div className={`card small-card ${flipped[1] ? 'flipped' : ''}`} onClick={() => handleFlip(1)}>
                <div className="card-inner">
                    <div className="card-front">
                        <img className="img-ca" src={b2}></img>
                        <h2>Evaluacion</h2>
                    </div>
                    <div className="card-back">
                        <h3>Cada token de cada proyecto qué se publica en Fraktal pasa por un proceso de revisión y análisis para evitar estafas y tokens qué no tengan sentido.</h3>
                    </div>
                </div>
            </div>
            <div className={`card small-card ${flipped[2] ? 'flipped' : ''}`} onClick={() => handleFlip(2)}>
                <div className="card-inner">
                    <div className="card-front">
                        <img className="img-ca" src={b3}></img>
                        <h2>Mercado</h2>
                    </div>
                    <div className="card-back">
                        <h3>Una vez el token es aprobado, pasa al mercado en el qué ya aparece en la página y los inversores pueden verlo.</h3>
                    </div>
                </div>
            </div>
            <div className={`card small-card ${flipped[3] ? 'flipped' : ''}`} onClick={() => handleFlip(3)}>
                <div className="card-inner">
                    <div className="card-front">
                        <img className="img-ca" src={b4}></img>
                        <h2>Compra</h2>
                    </div>
                    <div className="card-back">
                        <h3>Cuando un inversor decide comprar tokens de un proyecto, mediante la tecnología de Blockchain, el token pasa a estar en la wallet individual del inversor.</h3>
                    </div>
                </div>
            </div>
            <div className={`card large-card ${flipped[4] ? 'flipped' : ''}`} onClick={() => handleFlip(4)}>
                <div className="card-inner">
                    <div className="card-front">
                        <img className="img-ca" src={b5}></img>
                        <h2>Venta</h2>
                    </div>
                    <div className="card-back">
                        <h3>En el momento en el qué todos los tokens de una empresa se vendan, ya se va a poder vender el token qué se compró. También está el caso de querer retenerlo en la cuenta hasta qué el proyecto empieza a generar ganancias y es ahí donde el inversor saca un beneficio por confiar e invertir en el proyecto.</h3>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </>
    );
};


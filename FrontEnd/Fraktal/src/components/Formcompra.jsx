import '../css/formcompre.css';
import Waves from "./Waves";
import { Navbar } from './Navbar';


export const Formcompra = () => {
  return (
      <>
                  <Navbar />

    <div className="todo">
        <div className="contnombre">
            <div className="contnombre2">
                <div className="logonombre"></div>
                <div className="contnombres">
                    <div className="ntoken">Nombre del token</div>
                    <div className="n2token">FKT</div>
                </div>
                <div className="plati">$0,893</div>
            </div>
        </div>
        <div className="contresto">
            <div className="rtitle">¿Que monto queres invertir?</div>
            <input placeholder="USD$0,00"
            className="platy"
            type="text"
            />
        <div className="rtitle">Tokens aproximados a recibir</div>
        <div className="platy2">
            <div className="logonombre2"></div>
            <div className="ndtok">Numero de tokens</div>
        </div>
        <div className="rtitle">Dinero disponible: $1954,5349</div>
        </div>
        <div className="but-comprar2">Comprar</div>
        
    </div>
    <Waves />
 </> );
};

import '../css/formcompre.css';
import Waves from "./Waves";

export const Formcompra = () => {
  return (
      <>
    <div className="todo">
        <div className="contvender">
            <div className="but-vender">Vender</div>
            <div className="but-comprar">Comprar</div>
        </div>
        <div className="contnombre">
            <div className="contnombre2">
                <div className="logonombre"></div>
                <div className="contnombres">
                    <div className="ntoken"></div>
                </div>
            </div>
        </div>
    </div>
    <Waves />
 </> );
};

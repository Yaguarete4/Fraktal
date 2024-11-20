import '../css/formcompre.css';
import Waves from "./Waves";
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';
import { buyToken } from './BuyFunctions'
import { useState } from 'react';


export const Formcompra = () => {
    const { data } = useLocation().state;
    const [amount, setAmount] = useState(0);

    const handleAmount = (event) => {
        const input = event.target.value
        setAmount(parseInt(input / data.tokenData.price))
    }

  return (
  <>
    <Navbar />

    <div className="todo">
        <div className="contnombre">
            <div className="contnombre2">
                <img src={data.tokenData.image} className="logonombre" />
                <div className="contnombres">
                    <div className="ntoken">{data.tokenData.name}</div>
                    <div className="n2token">FKT</div>
                </div>
                <div className="plati">${data.tokenData.price}</div>
            </div>
        </div>
        <div className="contresto">
            <div className="rtitle">¿Que monto queres invertir?</div>
            <input placeholder="USD$0,00"
            className="platy"
            type="text"
            onChange={handleAmount}
            />
        <div className="rtitle">Tokens aproximados a recibir</div>
        <div className="platy2">
            <img src={data.tokenData.image} className="logonombre2" />
            <div className="ndtok">Numero de tokens: {amount}</div>
        </div>
        {/* <div className="rtitle">Dinero disponible: $1954,5349</div> */}
        </div>
        <div className="but-comprar2" onClick={() => buyToken(data.companyData.public_key, data.tokenData.id, amount)}>Comprar</div>
        
    </div>
    <Waves />
 </> );
};

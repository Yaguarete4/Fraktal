import '../css/footer.css';
import a1 from '../img/frak.png';

export const Footer = () => {
  return (
    <><footer>
        <div className="ff1">
            <div className="contac">Contactanos</div>
        </div>
        <div className="ff2">
            <div className="cff2">
                <div className="cfff2">
                    <div className="fbut">Trade</div>
                    <div className="fbut">Token</div>
                    <div className="fbut">Market</div>
                    <div className="fbut">Wallet</div>
                    <div className="fbut">Pre-venta</div>
                    <div className="fbut">News</div>
                </div>
                <div className="gi">fraktal.proyect@gmail.com</div>
            </div>
        </div>
        <div className="ff3">
                <img className="im" src={a1}></img>
            
        </div>
    </footer></>
  );
};

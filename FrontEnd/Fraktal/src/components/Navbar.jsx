import '../style.css';
import '../font.css'
import logoK from './K.png';
import logo from './sexoso.png';


export const Navbar = () => {
    return (
        <header>
             <div className="caja">
                <img src={logo} alt="Logo" className="logito" />
            </div>
            <div className="stuff">Market</div>
            <div className="stuff">Token</div>
            <div className="stuff">Trade</div>
            <div className="stuff">Wallet</div>
            <div className="stuff">Global</div>
            <div className="stuff">News</div>

            <div className="celu">
            <div className="cajaK">
                <img src={logoK} alt="Logo" className="logitoK" />
            </div>
            <label class="container">
            <input type="checkbox"/>
            <div class="checkmark">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </label>
            </div>
        </header>
    );
}
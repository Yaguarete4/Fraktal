import { Navbar } from "../components/Navbar";
import Waves from "../components/Waves";
import { FirstForm } from "../components/TokenForm";
import Background from '../img/wave.svg';
import '../css/pages/TokenRegisterPage.css';
import '../css/login.css';

export const TokenRegisterPage = () => {
    return (
        <>
            <Navbar />
            <div className="token-reg">
                <div className="tokContainer">
                    <div className="titu-tok">Registra tu token</div>
                    <input placeholder="Nombre del Token" className="input2" type="text"></input>
                    <input placeholder="Abreviación (3 letras)" className="input2" type="text"></input>
                    <div className="caja-tok">
                        <div className="caja-tok2">
                            <div className="sub-titu-tok">Logo del token</div>
                            <div className="circ">Inserte aqui</div>
                        </div>
                    </div>
                </div>
                <Waves />
            </div>
        </>
    )
}
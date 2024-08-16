import { Navbar } from "../components/Navbar";
import Background from '../img/FondeRegistroToken.svg';
import '../css/pages/TokenRegisterPage.css';

export const TokenRegisterPage = () => {
    return (
        <>
            <Navbar />

            <div className="token-reg">
                <img src={Background} alt="fondo" />
            </div>
        </>
    )
}
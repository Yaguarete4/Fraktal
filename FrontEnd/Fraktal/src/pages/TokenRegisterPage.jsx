import { Navbar } from "../components/Navbar";
import Waves from "../components/Waves";
import { FirstForm } from "../components/TokenForm";
import Background from '../img/wave.svg';
import '../css/pages/TokenRegisterPage.css';

export const TokenRegisterPage = () => {
    return (
        <>
            <Navbar />

            <div className="token-reg">
                <FirstForm />
                <Waves />
            </div>
        </>
    )
}
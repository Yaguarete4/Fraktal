import i from '../img/i.svg';
import '../css/ErrorWindow.css'

export const ErrorWindow = (props) => {
    return (
        <div className="contra">
            <img src={i} alt="i" className="i-img" />
            <div className="t">{props.children}</div>
            <div className="t">Haz clic en el botón volver.</div>
            <button className="volver-form" onClick={props.handleError}>Volver</button>
        </div>
    );
}
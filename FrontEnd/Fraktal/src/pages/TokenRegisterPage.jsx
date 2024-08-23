import React, { useState, useRef } from 'react';
import { Navbar } from "../components/Navbar";
import Waves from "../components/Waves";
import { FirstForm } from "../components/TokenForm";
import Background from '../img/wave.svg';
import '../css/pages/TokenRegisterPage.css';
import '../css/login.css';

export const TokenRegisterPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [abbreviation, setAbbreviation] = useState('');
    const fileInputRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        loadImage(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        loadImage(file);
    };
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 2)); // Incrementa el paso, pero no más de 2
    };

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0)); // Decrementa el paso, pero no menos de 0
    };
    const loadImage = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImageSrc(e.target.result);
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecciona una imagen válida.');
        }
    };

    const handleChange = (event) => {
        setAbbreviation(event.target.value.toUpperCase());
    };

    const handleKeyPress = (event) => {
        const charCode = event.keyCode || event.which;
        const char = String.fromCharCode(charCode);

        if (!/^[a-zA-Z]$/.test(char)) {
            event.preventDefault();
        }
    };

    return (
        <>
            <Navbar />
            <div className="token-reg">
                <div className="tokContainer">                    
                <div className="titu-tok">Registra tu token</div>
                    {step === 0 ? ( 
                        <input placeholder="Nombre del Token" className="input2" type="text" />   
                    ):step === 1 ? (
                        <input placeholder={`Descripción de la empresa`} className="input3" type="text" />   
                    ):(<div></div>)}
                    {step === 0 ? ( 
                        <input 
                        placeholder="Abreviación (3 letras)" 
                        className="input2" 
                        type="text" 
                        maxLength="3" 
                        value={abbreviation} 
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        />                    
                    ):(<div></div>)}
                    {step === 0 ? ( 
                    <div className="caja-tok">
                        <div className="caja-tok2">
                            <div className="sub-titu-tok">Logo del token</div>
                            <div 
                                className="circ" 
                                onDrop={handleDrop} 
                                onDragOver={handleDragOver} 
                                onClick={handleClick}
                            >
                                {imageSrc ? (
                                    <img src={imageSrc} alt="Token Logo" style={{                 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover' 
                                }} />
                                ) : (
                                    "Inserte aquí"
                                )}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange} 
                                accept="image/*"
                            />
                        </div>
                    </div>
                    ):step === 1 ?(
                        <input placeholder="Beneficio para inversores" className="input3" type="text" />   
                    ):
                    (<div></div>)}
                    
                    <div className="caja-buts">
                        <button className="but-volver" onClick={handleBack}>Volver</button>
                        {step === 2 ? (
                            <button className="but-sig2">Enviar</button>
                        ) : (
                            <button className="but-sig" onClick={handleNext}>Siguiente</button>
                        )}
                    </div>
                    <div className="caj-prox">
                        <div className={step === 0 ? 'p2' : 'p1'}></div>
                        <div className={step === 1 ? 'p2' : 'p1'}></div>
                        <div className={step === 2 ? 'p2' : 'p1'}></div>
                    </div>
                </div>
                <Waves />
            </div>
        </>
    );
};

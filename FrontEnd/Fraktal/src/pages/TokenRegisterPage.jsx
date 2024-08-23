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
                    <input placeholder="Nombre del Token" className="input2" type="text" />
                    <input 
                        placeholder="Abreviación (3 letras)" 
                        className="input2" 
                        type="text" 
                        maxLength="3" 
                        value={abbreviation} 
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
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
                    <div className="caja-buts">
                        <button className="but-volver">Volver</button>
                        <button className="but-sig">Siguiente</button>
                    </div>
                </div>
                <Waves />
            </div>
        </>
    );
};

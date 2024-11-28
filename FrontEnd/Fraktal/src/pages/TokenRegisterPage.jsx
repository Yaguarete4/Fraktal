import React, { useState, useRef } from 'react';
import { Navbar } from "../components/Navbar";
import Waves from "../components/Waves";
import Background from '../img/wave.svg';
import '../css/pages/TokenRegisterPage.css';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { connectToWallet } from '../components/BuyFunctions';

export const TokenRegisterPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [abbreviation, setAbbreviation] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [investorBenefits, setInvestorBenefits] = useState('');
    const [pricePerToken, setPricePerToken] = useState('');
    const [tokenQuantity, setTokenQuantity] = useState('');
    const [members, setMembers] = useState(['']);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false); // Estado para el loader
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

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
        setFile(file);
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

    const handleAbbreviationChange = (event) => {
        setAbbreviation(event.target.value.toUpperCase());
    };

    const handleTokenNameChange = (event) => {
        setTokenName(event.target.value);
    };

    const handleCompanyDescriptionChange = (event) => {
        setCompanyDescription(event.target.value);
    };

    const handleInvestorBenefitsChange = (event) => {
        setInvestorBenefits(event.target.value);
    };

    const handlePricePerTokenChange = (event) => {
        setPricePerToken(event.target.value);
    };

    const handleTokenQuantityChange = (event) => {
        setTokenQuantity(event.target.value);
    };

    const handleMemberChange = (index, event) => {
        const newMembers = [...members];
        newMembers[index] = event.target.value;
        setMembers(newMembers);
    };

    const handleAddMember = () => {
        if (members.length < 4) {
            setMembers([...members, '']);
        }
    };

    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 2)); // Incrementa el paso, pero no más de 2
    };

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0)); // Decrementa el paso, pero no menos de 0
    };

    const handleSubmit = async () => {
        setLoading(true); // Mostrar el loader
        const formData = new FormData();
        const fixMembers = () => {
            let m = '';
            for (const i in members) {
                if (i == 0) m = members[i];
                else m = m.concat('/', members[i]);
            }
            return m;
        };

        const [publicKey] = await connectToWallet()

        const data = {
            name: tokenName,
            acronym: abbreviation,
            description: companyDescription,
            members: fixMembers(),
            sector: "Tecnologico",
            imageURL: file,
            tokenBenefits: investorBenefits,
            tokenImageURL: "",
            publicKey: publicKey,
            tokenAmount: tokenQuantity,
            price: pricePerToken
        };

        for (const name in data) {
            formData.append(name, data[name]);
        }

        try {
            const response = await fetch('https://fraktalapi.vercel.app/company/add', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.log(await response.text());
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/market');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="token-reg">
                {loading ? (
                    <div className="loader">
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div>
                    </div>
                ) : (
                    <div className="tokContainer">
                        <div className="titu-tok">Registra tu token</div>
                        {step === 0 ? (
                            <>
                                <input
                                    placeholder="Nombre del Token"
                                    className="input2"
                                    type="text"
                                    value={tokenName}
                                    onChange={handleTokenNameChange}
                                />
                                <input
                                    placeholder="Abreviación (3 letras)"
                                    className="input2"
                                    type="text"
                                    maxLength="3"
                                    value={abbreviation}
                                    onChange={handleAbbreviationChange}
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
                            </>
                        ) : step === 1 ? (
                            <>
                                <textarea
                                    placeholder="Descripción de la empresa"
                                    className="input3"
                                    type="text"
                                    value={companyDescription}
                                    onChange={handleCompanyDescriptionChange}
                                />
                                <textarea
                                    placeholder="Beneficio para inversores"
                                    className="input3"
                                    rows="4"
                                    value={investorBenefits}
                                    onChange={handleInvestorBenefitsChange}
                                />
                            </>
                        ) : step === 2 ? (
                            <>
                                <div className='sub-miembros'>Miembros de la empresa</div>
                                {members.map((member, index) => (
                                    <input
                                        key={index}
                                        placeholder="Ej: Marcelo Pérez"
                                        className="input2"
                                        type="text"
                                        value={member}
                                        onChange={(e) => handleMemberChange(index, e)}
                                    />
                                ))}
                                {members.length < 4 && (
                                    <button className='but-mas' onClick={handleAddMember}>+</button>
                                )}
                                <div className="caja-tokk">
                                    <input
                                        className='input4'
                                        placeholder='Precio por Token (USD)'
                                        value={pricePerToken}
                                        onChange={handlePricePerTokenChange}
                                    />
                                    <input
                                        className='input4'
                                        placeholder='Cantidad de tokens a generar'
                                        value={tokenQuantity}
                                        onChange={handleTokenQuantityChange}
                                    />
                                </div>
                            </>
                        ) : (<div></div>)}

                        <div className="caja-buts">
                            <button className="but-volver" onClick={handleBack}>Volver</button>
                            {step === 2 ? (
                                <button className="but-sig2" onClick={handleSubmit}>Enviar</button>
                            ) : (
                                <button className="but-sig" onClick={handleNext}>Siguiente</button>
                            )}
                        </div>
                        <div className="caj-prox">
                            <div className={step === 0 ? 'prox-act' : 'prox'}></div>
                            <div className={step === 1 ? 'prox-act' : 'prox'}></div>
                            <div className={step === 2 ? 'prox-act' : 'prox'}></div>
                        </div>
                    </div>
                )}
            </div> 
            <Waves />
        </>
    );
};

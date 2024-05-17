
import React, { useEffect } from 'react';
import '../css/cel.css';
import prueba from './Inversor.png';

export const Cel = () => {
    useEffect(() => {
        const boxes = document.querySelectorAll(".box,.box1");

        const checkBoxes = () => {
            const triggerBottom = (window.innerHeight / 5) * 4;
            boxes.forEach((box) => {
                const boxTop = box.getBoundingClientRect().top;
                if (boxTop < triggerBottom) box.classList.add("show");
                else box.classList.remove("show");
            });
        };
    
        window.addEventListener("scroll", checkBoxes);
        checkBoxes();
    }, []);

    return (
        <body>
            <img src={prueba} alt="Logo" className="box1" />
            <div className="box">
            </div> 
            <div className="box">
            </div> 
            <div className="box">
            </div> 
            <div className="box">
            </div> 
            <div className="box">
            </div> 
            <div className="box">
            </div> 
            <div className="box">
            </div> 
            <div className="box">
            </div>
        </body>
    );
}

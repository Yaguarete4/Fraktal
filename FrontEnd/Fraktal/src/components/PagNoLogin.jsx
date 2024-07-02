
import React, { useEffect } from 'react';
import '../css/noLogin.css';

export const NoLogin = () => {
    useEffect(() => {
        const boxes = document.querySelectorAll(".box");

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
        <>
        </>
        // <body>
        //     <div className="box"/> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div> 
        //     <div className="box">
        //     </div>
        // </body>
        
    );
}

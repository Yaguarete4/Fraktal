import React, { useEffect } from 'react';
import '../css/TokenCell.css';
import '../css/token.css';

export const TokenCell = (props) => {
    useEffect(() => {
        const tokens = document.querySelectorAll(".token-cell");

        const checkTokens = () => {
            const triggerBottom = (window.innerHeight / 5) * 4;
            tokens.forEach((token) => {
                const tokenTop = token.getBoundingClientRect().top;
                if (tokenTop < triggerBottom) token.classList.add("show");
                else token.classList.remove("show");
            });
        };
    
        window.addEventListener("scroll", checkTokens);
        checkTokens();
    }, []);

    return (
        <div className="token-cell">
            <img src={props.img} alt="Token image"/>
            <div>
                <h1>{props.name}</h1>
                <p>{props.children}</p>
            </div>
        </div>
    );
}

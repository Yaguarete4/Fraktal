import React, { useState } from 'react';
import '../css/style1.css';
import { Navbar } from './Navbar';
export const PaginaPrincipal = () => {

    return (
        <>
        <Navbar/>
            <div className="conte">
                <div className="titulo">Invertir&nbsp;</div>
                <div className="animated-text"><span></span></div>
            </div>
            <div className="wrapper">
                <div className="itemLeft item1"></div>
                <div className="itemLeft item2"></div>
                <div className="itemLeft item3"></div>
                <div className="itemLeft item4"></div>
                <div className="itemLeft item5"></div>
                <div className="itemLeft item6"></div>
                <div className="itemLeft item7"></div>
                <div className="itemLeft item8"></div>
            </div>
        </>
    );
};

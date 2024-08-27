import React, { useState, useRef } from 'react'; // Elimina la importación redundante de useState
import '../css/spline.css';

export const Spline = () => {
    return (
        <>
        <div className="spline-container">
        <spline-viewer url="https://prod.spline.design/fUO9ajNruiF4go7G/scene.splinecode"></spline-viewer>
        </div>
        </>
    );
};


import React, { useState } from "react";
import '../css/cel.css'; 
import flech from '../img/chevron.svg';


export const Cel = () => {
  return (
    <div className="dropdowns">
      <div className="dropdown">
        <button className="button-class">
          Tokens
          <img src={flech} className="img-class" alt="chevron" />
        </button>
        <div className="dropdown-menu">
          <div className="celup">Market</div>
          <div className="celup">Wallet</div>
        </div>
      </div>
      <div className="dropdown">
        <button className="button-class">
          User
          <img src={flech} className="img-class" alt="chevron" />
        </button>
        <div className="dropdown-menu">
          <div className="celup">Login</div>
          <div className="celup">Signup</div>
        </div>
        <div className="dropdown">
        <button className="button-class">
          Global
        </button>
      </div>
      </div>
    </div>
  );
};

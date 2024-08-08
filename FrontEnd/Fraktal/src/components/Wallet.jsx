
import '../css/wallet.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import React, { useState } from 'react'; 


export const Wallet = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);

    const handleMenuToggle = () => {
      setIsCelVisible(!isCelVisible);
    }
    return (
        <>
          <Navbar onMenuToggle={handleMenuToggle} />
        {isCelVisible && (
                <div className="modal2">
                    <Cel className="cel-center" />
                </div>
            )}
          <div className="caja-portafolio">
            <div className="titu-portafolio">Portafolio</div>
            <div className="plata">$ 1.683,36</div>
            <div className="profit">7,34% (+$43,22)</div>
          </div>
        </>
    );
}


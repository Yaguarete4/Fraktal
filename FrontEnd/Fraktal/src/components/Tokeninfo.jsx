import '../css/tokeninfo.css'; 
import a1 from '../img/bitcoin.png';
import React, { useState, useEffect } from 'react'; // Elimina la importación redundante de useState
import { useParams } from 'react-router-dom';
import { Cel } from './Cel';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom'

export const Tokeninfo = () => {
  const [isCelVisible, setIsCelVisible] = useState(false);
  const { tokenId } = useParams();
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fraktalapi.vercel.app/company/get/${tokenId}`, {
          method: 'GET'
        })

        if(!response.ok) { 
          console.log(await response.text())
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setInfo(data);
      } catch (err) {
        console.error('Error:', err);
      }
    }

    fetchData()
  }, [])

  const handleMenuToggle = () => {
    setIsCelVisible(!isCelVisible);
  };
    
  const splitMembers = (str) => {
    return str.replace(/\//g, ', ')
  }

  if(!info) return <div>Loading...</div>

  return (
    <>
        <Navbar onMenuToggle={handleMenuToggle} />
        {isCelVisible && (
            <div className="modal2">
                <Cel className="cel-center" />
            </div>
        )}          

        <div className="caja-g">
            <div className="caja-nombre">
                <img className="logo-token" src={info.tokenData.image}></img>
                <div className="titu-token">{info.tokenData.name}</div>
                <Link to="/compra" state={{data: info}} className="info-comprar">Comprar</Link>
            </div>
            <div className="caja-ben">
              <div className="titu-ben">Beneficios</div>
              <div className="cont-ben">{info.tokenData.description}</div>
            </div>
            <div className="caja-inf">
              <div className="titu-ben">Informacion sobre el proyecto</div>
              <div className="cont-ben">{info.companyData.description}</div>
            </div>
            <div className="caja-inf">
              <div className="titu-ben">Miembros</div>
              <div className="cont-ben">{splitMembers(info.companyData.members)}</div>
            </div>
        </div>
    </>
  );
};

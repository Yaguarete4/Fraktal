import React, { useState, useEffect } from 'react'; 
import '../css/wallet.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import { connectToWallet } from './BuyFunctions';
import a2 from '../img/l3.svg';
import a1 from '../img/l1.svg';
import a3 from '../img/l2.svg';
import a5 from '../img/usd.png';
import { ErrorWindow } from './ErrorWindow';

export const Wallet = () => {
    const [isCelVisible, setIsCelVisible] = useState(false);
    const [tokenData, setTokenData] = useState();
    const [publicKey, setPublicKey] = useState();
    const [data, setData] = useState({
      owned: '',
      txs: ''
    });
    const [error, setError] = useState({
        message: "",
        isOn: false
    });

    const handleSetError = () => {
      setError(prev => ({...prev, isOn: false}));
    }

    const handleMenuToggle = () => {
      setIsCelVisible(!isCelVisible);
    }

    useEffect(() => {
      const getPublicKey = async () => {
        try {
          const key = await connectToWallet();
          if (!key) {
            setError({ message: "Necesitas una billetera virtual", isOn: true });
            return;
          }
          setPublicKey(key);
        } catch (err) {
          setError({ message: "Error al conectar la billetera", isOn: true });
          console.error(err);
        }
      };
    
      getPublicKey();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://fraktalapi.vercel.app/company/all`, {
          method: 'GET'
        });
  
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
        const result = await response.json();
        setTokenData(result);
      }
  
      if(!tokenData) fetchData()
    }, [tokenData])

    useEffect(() => {
      const fetchOwned = async () => {
        if(!publicKey) return;

        try {
          const response = await fetch(`https://fraktalapi.vercel.app/company/owned/${publicKey}`, {
            method: 'GET'
          });
    
          if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
          const ownedData = await response.json();
          setData(prev => ({...prev, owned: ownedData}))
  
        } catch (error) {
          console.error("Error: ", error);
        }
      }

      const fetchTransaction = async () => {
        if(!publicKey) return;

        try {
          const response = await fetch(`https://fraktalapi.vercel.app/company/transactions/${publicKey}`, {
            method: 'GET'
          });
    
          if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
          const txData = await response.text();
          setData(prev => ({...prev, txs: txData}))
  
        } catch (error) {
          console.error("Error: ", error);
        }
      }

      fetchTransaction();
      fetchOwned();
    }, [publicKey])

    return (
        <>
          <Navbar onMenuToggle={handleMenuToggle} />
          {isCelVisible && (
              <div className="modal2">
                  <Cel className="cel-center" />
              </div>
          )}
          
          {error.isOn && <ErrorWindow handleError={handleSetError}>{error.message}</ErrorWindow>}

          <div className="caja-portafolio">

            <div className="caj-port">
              <div className="caj-port2">
                <div className="titu-portafolio">Portafolio</div>
                <div className="plata">$ 1.683,36</div>
                <div className="profit">
                  7,34% (+$43,22)
                </div>  
              </div>

              <div className="caja-but">
                <div className="but-portafolio">Ingresar</div>
                <div className="but-portafolio2">Retirar</div>
              </div>   
            </div>

            <div className="caj-fle">

              <div className="caja-reparticion">
                {(data.owned && tokenData) && <PercentageBox owned={data.owned} data={tokenData}/>}
              </div>
              <div className="caja-act">
                <div className="act-pad">
                  <div className="rendimiento-titu">Ultimas Transacciones</div>
                  <div className="fecha">( 18 / 03 / 2024 )</div>       
                  <div className="infoo">
                    <img src={a1} className="info-img"></img>  
                    <div className="caja-info">
                      <div className="compra">Compra</div>
                      <div className="qcompra">ADO</div>
                    </div>
                    <div className="info-porc1">-330 USD</div>
                  </div>     
                  <div className="fecha">( 11 / 03 / 2024 )</div>       
                  <div className="infoo">
                    <img src={a1} className="info-img"></img>  
                    <div className="caja-info">
                      <div className="compra">Venta</div>
                      <div className="qcompra">ADO</div>
                    </div>
                    <div className="info-porc">+110 USD</div>
                  </div>  
                  <div className="infoo">
                    <img src={a2} className="info-img"></img>  
                    <div className="caja-info">
                      <div className="compra">Venta</div>
                      <div className="qcompra">SEC</div>
                    </div>
                    <div className="info-porc">+200 USD</div>
                  </div>         
                  <div className="fecha">( 10 / 03 / 2024 )</div>       
                  <div className="infoo">
                    <img src={a1} className="info-img"></img>  
                    <div className="caja-info">
                      <div className="compra">Compra</div>
                      <div className="qcompra">ADO</div>
                    </div>
                    <div className="info-porc1">-100 USD</div>
                  </div>     
                  <div className="infoo">
                    <img src={a2} className="info-img"></img>  
                    <div className="caja-info">
                      <div className="compra">Compra</div>
                      <div className="qcompra">SEC</div>
                    </div>
                    <div className="info-porc1">-100 USD</div>
                  </div>    
                </div>
              </div>
            </div>  
          </div>
        </>
    );
};


// Percentage box

const PercentageBox = ({ owned, data }) => {
  const getRandomColor = () => {
    return (
      `#${Math.floor(
        Math.random()*(256*256*256)
      ).toString(16)}`
    )
  }

  const getAcronym = (id) => {
    return data.find(x => x.tokenData.id == id).tokenData.acronym;
  }

  const getImage = (id) => {
    return data.find(x => x.tokenData.id == id).tokenData.image;
  }

  const getPercentage = (id) => {
    let totalTokensPrice = 0;
    let tokensPercentage = []

    owned.map((value, _) => {
      const price = data.find(x => x.tokenData.id == value.id).tokenData.price;
      totalTokensPrice += price * value.amount;
    })

    if(id){
      const tokenPrice = data.find(x => x.tokenData.id == id).tokenData.price;
      const tokenAmount = owned.find(x => x.id == id).amount;
      const price = tokenPrice * tokenAmount

      return price * 100 / totalTokensPrice;
    }

    owned.map((value, _) => {
      const price = data.find(x => x.tokenData.id == value.id).tokenData.price * value.amount;
      tokensPercentage.push({
        id: value.id,
        percentage: price * 100 / totalTokensPrice
      })
    })

    return tokensPercentage
  }

  const itemInfo = owned.map(item => ({
    id: item.id,
    color: getRandomColor()
  }));

  const gradientStops = itemInfo.reduce((acc, curr, index) => {
    const start = acc.end;
    const end = start + getPercentage(curr.id);
    acc.stops.push(`${curr.color} ${start}% ${end}%`);
    acc.end = end;
    return acc;
  }, { stops: [], end: 0 }).stops.join(', ');

  const Item = ({acronym, color, src, percentage}) => {
    return (
      <div className="sector">
        <div className="c1" style={{"backgroundColor": color}}></div>
        <div className="t1">{acronym}</div>
        <img className="t-img" src={src}></img>
        <div className="porc">{percentage}%</div>
      </div>
    );
  }

  return (
    <>
      {data && 
        <>
          <div className="dona-container">
            <div className="dona" style={{"background": `conic-gradient(${gradientStops})` }}></div>
            <div className="dona-text">$ 1.683,36</div>
          </div>
          <div className="caja-porcentaje">
            <div className="cuadra">
              {itemInfo.map((value, _) => <Item key={value.id} color={value.color} acronym={getAcronym(value.id)} src={getImage(value.id)} percentage={getPercentage(value.id)}/>)}
            </div>
          </div>
        </>
      }
    </>
  );
}
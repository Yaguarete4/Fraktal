import React, { useState, useEffect } from 'react'; 
import '../css/wallet.css';
import { Navbar } from './Navbar';
import { Cel } from './Cel';
import { connectToWallet } from './BuyFunctions';
import plusIcon from '../img/plusIcon.svg';
import uploadIcon from '../img/uploadIcon.svg';
import { ErrorWindow } from './ErrorWindow';
import { Link } from 'react-router-dom';

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
  
          let txData = await response.text();
          txData = JSON.parse(txData);
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

          {(data.owned && tokenData) && 
            <div className="caja-portafolio">

              <div className="caj-port">
                <div className="caj-port2">
                  <div className="titu-portafolio">Portafolio</div>
                  <div className="plata">$ {getTokensTotalPrice(data.owned, tokenData)}</div> 
                </div>

                <div className="caja-but">
                  <Link to="/market" className="but-portafolio buy-button">
                    Comprar
                    <img src={plusIcon} alt="+.svg" />
                  </Link>

                  <Link to="/token-register" className="but-portafolio">
                    Publicar
                    <img src={uploadIcon} alt="upload.svg" />
                  </Link>
                </div>   
              </div>

              <div className="caj-fle">

                <div className="caja-reparticion">
                  <PercentageBox owned={data.owned} data={tokenData}/>
                </div>
              </div> 

              {data.txs && 
                <div className="caja-act">
                  <div className="act-pad">
                    <div className="rendimiento-titu">Ultimas Transacciones</div>
                    <TransactionBox txs={data.txs} publicKey={publicKey} tokenData={tokenData} />
                  </div>
                </div>
              }

            </div>
          }
        </> 
    );
};

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
    let totalTokensPrice = getTokensTotalPrice(owned, data);
    let tokensPercentage = []

    if(id){
      const tokenPrice = data.find(x => x.tokenData.id == id).tokenData.price;
      const tokenAmount = owned.find(x => x.id == id).amount;
      const price = tokenPrice * tokenAmount

      return (price * 100 / totalTokensPrice).toFixed(2);
    }

    owned.map((value, _) => {
      const price = data.find(x => x.tokenData.id == value.id).tokenData.price * value.amount;
      tokensPercentage.push({
        id: value.id,
        percentage: (price * 100 / totalTokensPrice).toFixed(2)
      })
    })

    return tokensPercentage
  }

  const itemInfo = owned.map(item => ({
    id: item.id,
    color: getRandomColor()
  }));

  const gradientStops = itemInfo.reduce((acc, curr, index) => {
    const start = parseFloat(acc.end);
    const end = start + parseFloat(getPercentage(curr.id));
    acc.stops.push(`${curr.color} ${start}% ${end}%`);
    acc.end = end;
    return acc;
  }, { stops: [], end: 0 }).stops.join(', ');

  const Item = ({acronym, color, src, percentage}) => {
    return (
      <div className="sector">
        <div>
          <div className="c1" style={{"backgroundColor": color}}></div>
          <div className="t1">{acronym}</div>
          <img className="t-img" src={src}></img>
        </div>
        
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
            <div className="dona-text">{`$ ${getTokensTotalPrice(owned, data)}`}</div>
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

const TransactionItem = ({ tx, publicKey, tokenData }) => {
  const typeOfTransaction = () => {
    if(tx[0] == publicKey) return 'Compra'
    else return 'Venta'
  }

  return (
    <div className="infoo">
      <img src={tokenData.image} className="info-img"></img>  
      <div className="caja-info">
        <div className="compra">{typeOfTransaction()}</div>
        <div className="qcompra">{tokenData.acronym}</div>
      </div>
      <div className="info-porc1" style={{"color": typeOfTransaction() == 'Compra' ? "#DB3805" : "#05DB74"}}>
        {tokenData.price} USD
      </div>
    </div> 
  );
}

const TransactionBox = ({ txs, publicKey, tokenData }) => {
  return (
    <div className="act-pad">
      {txs.map((value, index) => {
        const tData = tokenData.find(token => token.tokenData.id == value[2]).tokenData;
        return <TransactionItem key={index} tx={value} publicKey={publicKey} tokenData={tData} />
      })}
    </div>
  );
}

const getTokensTotalPrice = (ownedTokens, data) => {
  // ownedTokens = [              data = [{
  //   {                            tokenData: {...},
  //     id: 1,                     companyData: {...}
  //     amount: 10               }]
  //   },
  //   {
  //     id: 2,
  //     amount: 40
  //   }
  // ]

  let totalTokensPrice = 0

  ownedTokens.map((value, _) => {
    const price = data.find(x => x.tokenData.id == value.id).tokenData.price;
    totalTokensPrice += price * value.amount;
  })

  return totalTokensPrice;
}
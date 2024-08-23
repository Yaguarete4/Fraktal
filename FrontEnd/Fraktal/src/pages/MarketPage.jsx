import {TokenCell} from  '../components/TokenCell'
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Cel } from '../components/Cel';
import bitcoin from '../img/bitcoin.png';
import '../css/pages/MarketPage.css'

export const MarketPage = () => {
    const [tags, setTags] = useState([]);
    const [isCelVisible, setIsCelVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fraktalapi.vercel.app/company/all', {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setTags([
                    {
                        tagName: "Todo",
                        companies: data
                    }
                ]);
            } catch (err) {
                console.error('Error:', err);
            }
        }

        fetchData();
    }, []);

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

            <input className="barra-busqueda" placeholder="Buscar" />
            <div className='market'>
                {tags.map((value, index) => {
                    return <TagsDivision key={index} tag={value} />
                })}
            </div>
        </>
    )
}

//Tag makes reference to de object that has the tagName and companies
const TagsDivision = (props) => {
    const tag = props.tag;
    return (
        <div className="market__tags">
            <h1>{`${tag.tagName}`}</h1>
            <div>
                {tag.companies.map((value, index) => {
                    return <TokenCell key={index} img={value.tokenImageURL} name={value.name}>{value.description}</TokenCell>
                })}
            </div>
        </div>
    )
}

const databaseExample = {
    tags: [
        {
            tagName: "Lo mas buscado",
            companies: [
                {
                    name: "Bitcoin",
                    description: "Compañía dedicada a la manufactura de productos de limpieza",
                    tokenImageURL: bitcoin
                },
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImageURL: bitcoin
                },
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImageURL: bitcoin
                },
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImageURL: bitcoin
                },
                {
                    name: "Fraktal",
                    description: "Compania...",
                    tokenImageURL: bitcoin
                }
            ]
        },
        {
            tagName: "Recomendado",
            companies: [
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImageURL: "./"
                }
            ]
        },
        {
            tagName: "Nuevos Lanzamientos",
            companies: [
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImageURL: "./"
                }
            ]
        }
    ]
}

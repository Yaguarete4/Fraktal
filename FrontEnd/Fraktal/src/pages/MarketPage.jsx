import {TokenCell} from  '../components/TokenCell'
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Cel } from '../components/Cel';
import bitcoin from '../img/bitcoin.png';
import '../css/pages/MarketPage.css'

export const MarketPage = () => {
    const tags = databaseExample.tags;
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
                    return <TokenCell key={index} img={value.tokenImg} name={value.name}>{value.description}</TokenCell>
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
                    tokenImg: bitcoin
                },
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImg: bitcoin
                },
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImg: bitcoin
                },
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImg: bitcoin
                },
                {
                    name: "Fraktal",
                    description: "Compania...",
                    tokenImg: bitcoin
                }
            ]
        },
        {
            tagName: "Recomendado",
            companies: [
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImg: "./"
                }
            ]
        },
        {
            tagName: "Nuevos Lanzamientos",
            companies: [
                {
                    name: "bitcoin",
                    description: "Compania...",
                    tokenImg: "./"
                }
            ]
        }
    ]
}

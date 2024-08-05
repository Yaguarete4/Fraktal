import {TokenCell} from  '../components/TokenCell'
import bitcoin from '../img/bitcoin.png';
import '../css/pages/GlobalPage.css'

export const GlobalPage = () => {
    const tags = databaseExample.tags;

    return (
        <div className='global'>
            {tags.map((value) => {
                return <TagsDivision tag={value} />
            })}
        </div>
    )
}

//Tag makes reference to de object that has the tagName and companies
const TagsDivision = (props) => {
    const tag = props.tag;
    return (
        <div className="global__tags">
            <h1>{`${tag.tagName}`}</h1>
            <div>
                {tag.companies.map((value) => {
                    return <TokenCell img={value.tokenImg} name={value.name}>{value.description}</TokenCell>
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
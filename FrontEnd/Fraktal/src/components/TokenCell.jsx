import '../css/TokenCell.css'

export const TokenCell = (props) => {
    return (
        <div className="token-cell">
            <img src={props.img} alt="Token image"/>
            <div>
                <h1>{props.name}</h1>
                <p>{props.children}</p>
            </div>
        </div>
    )
}
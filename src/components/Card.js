function Card(props) {


    return (
        <div className={'card'}>
            <div className={'card__img'}>
                <img src={props.url} alt="123"/>
            </div>
        </div>
    )
}

export default Card;
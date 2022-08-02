export default function User(props) {

    return (
        <div className={'user'}>
            <div className={'user__logo'}>
                {
                    props.userLogo === '' ?
                        <img src={'https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_960_720.png'} alt={props.userName}/>
                        : <img src={props.userLogo} alt={props.userName}/>
                }
            </div>
            <div className={'user__name'}>
                <span>{props.userName}</span>
            </div>
        </div>
    )
}
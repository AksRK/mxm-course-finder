export default function Tags(props) {

    return (
        <ul className={'tags-list'}>
            {
                props.tags.map(el => {
                    return <li className={'tags-list__item'} key={props.tags.indexOf(el)}>{el}</li>
                })
            }
        </ul>
    )
}
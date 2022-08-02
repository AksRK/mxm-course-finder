import {useEffect, useState} from "react";
import Card from "./Card";
import useInput from '../hooks/useInput'
import useDebounce from '../hooks/useDebounce'
import '../App.scss';
import { Link } from 'react-router-dom'
import Input from "./UI/Input";

function List() {

    const [photos, setPhotos] = useState([])
    const [totalPhotos, setTotalPhotos] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [liveSearch, setLiveSearch] = useState('')
    const finder = useInput(liveSearch);
    const debouncedCallback = useDebounce(findPhoto, 800)

    function fetchPhotos (find, page = 1){
        fetch(`https://pixabay.com/api/?key=28898754-6a2ba34f993f6840d3afc753c&min_width=2560&min_height=1440&q=${find}&page=${page}`)
            .then(response => response.json())
            .then(result => {
                if (photos.length === 0) {
                    setPhotos(result.hits)
                    setTotalPhotos(result.total)
                }else {
                    setPhotos([...photos, ...result.hits])
                }
            })

    }

    useEffect(() => {
        fetchPhotos('Горы', 1)
    }, [])

    function findPhoto() {
        fetchPhotos(finder.value, activePage)
    }
    function nextPage() {
        setTotalPhotos(totalPhotos - 20)
        setActivePage(activePage + 1)
        fetchPhotos(liveSearch, activePage + 1)
    }

    const onChange = event => {
        if (event.target.value.length <= 1) {
            setPhotos([])
            setActivePage(1)
        }

        finder.value = event.target.value
        debouncedCallback(event.target.value)
        setLiveSearch(finder.value)
    }

    return (
        <div className={'container'}>
            <header>
                <div className={'header'}>
                    <div className={'header__item'}>
                        <h1 className={'header__logo'}>
                            FInder
                        </h1>
                    </div>
                    <div className={'header__item header__item--big'}>
                        <Input className={'input input--big-search'} type={"text"}  placeholder={'Что ищем?'} onChange={onChange}/>
                    </div>
                    <div className={'header__item'}>

                    </div>
                </div>
            </header>

            <div className={'content'}>
                <div className={'cards-list'} >
                    {
                        photos?.map(photo => {
                            return (
                                <Link key={photos.indexOf(photo)} to={`/img/${photo.id}`}>
                                    <Card
                                        url={photo.largeImageURL}
                                    />
                                </Link>)
                        })
                    }
                </div>
                {
                    totalPhotos >= 21 ? <button className={'button'} onClick={nextPage}>Загрузить еще</button> : <h1 className={'not-photos'}>Больше нет..</h1>
                }
            </div>

            <footer className={'footer'}>
                <div className={'footer__item'}>
                    <span>Приложение поиска картинок, при поддержке <a href={"https://pixabay.com"} target={"_blank"} rel={"nofollow noopener noreferrer"}>pixabay.com</a></span>
                </div>

            </footer>
        </div>
    )
}

export default List;

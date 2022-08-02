import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import User from '../components/UI/User'
import Tags from "../components/UI/Tags";

function ImgIdPage() {
    const {imgId} = useParams()
    const [img, setImg] = useState({})

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=28898754-6a2ba34f993f6840d3afc753c&id=${imgId}`)
            .then((response) => response.json())
            .then((result) => setImg(...result.hits))
    },[])

    return (
        <div className={'container'}>
            <div className={'img-page-body'}>
                { img && (
                    <>
                        <div className={'img-page-body__source'}>
                            <img src={img.largeImageURL} alt="123"/>
                        </div>

                        <div className={'img-page-body__info'}>
                            <div className={'img-page-body__primary-info'}>
                                <User userLogo={img.userImageURL} userName={img.user}/>
                                {
                                    img.tags && (
                                        <Tags tags={img.tags.split(', ')}></Tags>
                                    )
                                }
                            </div>

                            <div className={'img-page-body__secondary-info'}>
                                <span>Размер {img.imageWidth} x {img.imageHeight}</span>
                                <a href={img.largeImageURL}><button className={'button'}>Скачать</button></a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ImgIdPage;
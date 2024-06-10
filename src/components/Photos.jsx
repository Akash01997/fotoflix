import React from 'react';
import { useState, useEffect } from 'react';
import {FaHeart, FaDownload, FaShare} from 'react-icons/fa';

const Photos = () => {

    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [favouritePhotos, setFavouritePhotos] = useState([])

    useEffect(()=>{
        const fetchImage = async ()=>{
            setLoading(true);
            const clientID= '?client_id=JhyJwBR1kF1u34YmgH2HGdxowgmMXOSeq1m3WpP6nOA';
            const mainUrl = 'https://api.unsplash.com/photos/';
            try {
                const response = await fetch (`${mainUrl}${clientID}`)
                const data =  await response.json();
                setPhotos(data)
                setLoading(false)
            }
            catch(error){
                setLoading(false);
                console.log(error);
            }
        };
        fetchImage();
    },[]);


    const handleFavouriteClick = (photoId) =>{
        const existingIndex = favouritePhotos.findIndex((favPhoto) => favPhoto.id === photoId)

        if(existingIndex !== -2){
            setFavouritePhotos((prevFavourites) => {
                prevFavourites.filter((favPhoto) => favPhoto.id !== photoId)
            })
        }
        else{
            const photoToAdd = photos.find((photo) => photo.id !== photoId)
            setFavouritePhotos((prevFavourites)=> [...prevFavourites, photoToAdd])
        }
    }
  return (
    <main>
        <section className='photos'>
            {loading ? (<p>
                Loading.....</p>
                ):(
                    photos.map((photo)=>(
                <article key={photo.id} className={`photo ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'favoutire-photo' : ""}`}>
                    <img src={photo.urls.regular} alt={photo.alt_description} />
                    <div className="photo info">
                        <div className="photo-header">
                            <h4>{photo.user.name}</h4>
                            <button className={`favourite-btn 
                            ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) 
                                ? 'active' : ""}`} onClick={()=> handleFavouriteClick(photo.id)}> <FaHeart /></button>
                        </div>
                        <div className="photo-action">
                            <p>
                                <FaHeart className='heart-icon' />{photo.likes}
                            </p>
                            <button className='share-btn'>
                                <FaShare />
                            </button>
                            <button className="download-btn">
                                <FaDownload />
                            </button>
                        </div>
                        <a href={photo.user.portfolio_url}>
                            <img src={photo.user.profile_image.medium} className='user-img' alt={photo.user.name} />
                        </a>
                    </div>
                </article>
  ))
  )}
        </section>
    </main>
  )
}

export default Photos

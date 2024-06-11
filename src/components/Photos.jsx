import React, { useState, useEffect } from 'react';
import { FaHeart, FaShare, FaDownload } from 'react-icons/fa';

const Photos = ({
  id,
  urls: { regular, full },
  alt_description,
  likes,
  user: { name, portfolio_url, profile_image: { medium } },
  onFavoriteClick,
  isFavorite,
}) => {
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(isFavorite);

  useEffect(() => {
    console.log("Photo component props:", {
      id,
      regular,
      full,
      alt_description,
      likes,
      name,
      portfolio_url,
      medium,
      isFavorite
    });
  }, [id, regular, full, alt_description, likes, name, portfolio_url, medium, isFavorite]);

  const handleFavoriteClick = () => {
    setIsPhotoFavorite(!isPhotoFavorite);
    onFavoriteClick({
      id,
      urls: { regular, full },
      alt_description,
      likes,
      user: { name, portfolio_url, profile_image: { medium } },
    });
  };

  const handleShare = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this awesome photo: ${regular}`
    )}`;
    window.open(shareUrl, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = full;
    link.download = `photo_${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div className="photo-header">
          <h4>{name}</h4>
          <button className={`favorite-btn ${isPhotoFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
            <span role="img" aria-label="Favorite">
              {isPhotoFavorite ? '❤️' : '♡'}
            </span>
          </button>
        </div>
        <div className="photo-actions">
          <p>
            <FaHeart className="heart-icon" /> {likes}
          </p>
          <button className="share-btn" onClick={handleShare}>
            <FaShare className="share-icon" />
          </button>
          <button className="download-btn" onClick={handleDownload}>
            <FaDownload className="download-icon" />
          </button>
        </div>
        <a href={portfolio_url}>
          <img src={medium} className="user-img" alt={name} />
        </a>
      </div>
    </article>
  );
};

export default Photos;

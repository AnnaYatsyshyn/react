import React from 'react';

function ThumbnailLink({ thumbnailUrl, largeUrl, onThumbnailClick }) {
    const handleThumbnailClick = () => {
        if (onThumbnailClick) {
            onThumbnailClick(largeUrl);
        }
    };

    return (
        <a href="#" onClick={handleThumbnailClick}>
            <img src={thumbnailUrl} alt="Thumbnail" />
        </a>
    );
}

export default ThumbnailLink;

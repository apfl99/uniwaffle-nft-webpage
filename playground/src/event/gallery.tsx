import React from 'react';

const Gallery: React.FC = () => {
    return (
        <div id="gallery-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/06c5272d63e1c913080f940f028dd5331ca9fe258f5174f36ebcbf628f9d61e5?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
          id="gallery-image"
          alt="Gallery primary showcase image" 
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d4cfc3031da48447276f9bb44f9a9f13bf1ac7d6dc7427dba3fad0f288ff59c?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
          id="gallery-image-secondary"
          alt="Gallery secondary showcase image"
        />
      </div>
    );
};

export default Gallery;
import React from 'react';
import './DiscoverSongs.css';

export default function Discover() {
  const videoURLs = [
    'https://youtu.be/SOfswOXtsaA?si=mDsovTa72HOI5VGn',
    'https://youtu.be/KlDdEVKEC4s?si=QfBTLn6e_s4uJR0E',
    'https://youtu.be/wp6oQlb--Ks?si=y8kfMdv8lSUXAbLU',
    // ... add more video URLs
  ];

  const videoIDs = videoURLs.map(url => 
    url.split('/').pop().split('?')[0]
  );

  return (
    <div className="discover-container">
      <div className="discover-grid">
        {videoIDs.map((id) => (
          <div key={id} className="video-wrapper">
            <iframe
              className="video-iframe"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../auth/Auth'
import './DiscoverSongs.css';

// Initialize Supabase client
const supabase = createClient('https://wdnuvorjubabcofbygev.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbnV2b3JqdWJhYmNvZmJ5Z2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODc2MDAsImV4cCI6MjAxNTc2MzYwMH0.16lHDcYbaiQZOdO7E4BYZx2R3MjJ5acqD094Wt6S5mI');


export default function Discover() {
  const { user } = useAuth()
  const [videoURLs, setVideoURLs] = useState([]);

  useEffect(() => {
    // Function to fetch video URLs from Supabase
    const fetchVideoURLs = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('video_url');
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        const urls = data.map((song) => song.video_url);
        setVideoURLs(urls);
      }
    };
    fetchVideoURLs();
  }, []);

  // Proecessing short vs standard URL links
  const videoIDs = videoURLs.map(url => {
    // Check if URL is a short YouTube URL
    if (url.includes('youtu.be')) {
      return url.split('/').pop().split('?')[0];
    }
    // Otherwise, assume it's a standard YouTube URL and extract the 'v' parameter
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  });

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
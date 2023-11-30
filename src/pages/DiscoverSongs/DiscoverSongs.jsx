import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../auth/Auth'
import './DiscoverSongs.css';

// Initialize Supabase client
const supabase = createClient('https://wdnuvorjubabcofbygev.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbnV2b3JqdWJhYmNvZmJ5Z2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODc2MDAsImV4cCI6MjAxNTc2MzYwMH0.16lHDcYbaiQZOdO7E4BYZx2R3MjJ5acqD094Wt6S5mI');

<<<<<<< HEAD
export default function Discover() {
  const { user } = useAuth();
  const [allSongs, setAllSongs] = useState([]); 
  const [currentSongs, setCurrentSongs] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 9; 
  const [randomizedSongs, setRandomizedSongs] = useState([]);
  const [showGenrePopup, setShowGenrePopup] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreFilteredSongs, setGenreFilteredSongs] = useState([]);
  const [displayedGenreSongs, setDisplayedGenreSongs] = useState([]);
  const [mode, setMode] = useState('default');
  

  // Use effect for fetching songs
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('video_url, genre')
        .order('id', { ascending: true });
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        // Filter out duplicates based on video_url
        const uniqueSongs = Array.from(new Set(data.map(song => song.video_url)))
          .map(video_url => {
            return data.find(song => song.video_url === video_url);
          });
        setAllSongs(uniqueSongs);
      }
    };
    fetchSongs();
  }, []);


  // Use effect for fetching genres
  useEffect(() => {
    async function fetchGenres() {
      const { data, error } = await supabase
        .from('songs')
        .select('genre');
      if (error) {
        console.error('Error fetching genres:', error);
      } else {
        const genreSet = new Set(data.map(item => item.genre));
        setGenres([...genreSet]);
      }
    }
    fetchGenres();
  }, []);


  // Randomize songs logic
  const randomizeSongs = () => {
    const shuffledSongs = [...allSongs].sort(() => 0.5 - Math.random());
    setRandomizedSongs(shuffledSongs);
    setCurrentSongs(shuffledSongs.slice(0, songsPerPage));
    setCurrentPage(1);
    setMode('random');
  };


  // Displaying songs
  useEffect(() => {
    if (mode === 'random') {
      // Displaying randomized songs
      const newSongs = randomizedSongs.slice((currentPage - 1) * songsPerPage, currentPage * songsPerPage);
      setCurrentSongs(newSongs);
    } else if (mode === 'genre') {
      // Displaying genre-specific songs
      const newSongs = genreFilteredSongs.slice((currentPage - 1) * songsPerPage, currentPage * songsPerPage);
      setCurrentSongs(newSongs);
    } else {
      // Default behavior: displaying all songs
      setCurrentSongs(allSongs.slice((currentPage - 1) * songsPerPage, currentPage * songsPerPage));
    }
  }, [currentPage, allSongs, randomizedSongs, genreFilteredSongs, mode]);


  // Genre songs logic
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    setShowGenrePopup(false); 
  
    if (genre) {
      fetchGenreSongs(genre); // Pass the selected genre directly to the function
    }
  };
  

  // Get genre songs
  const fetchGenreSongs = async (genre) => {
    const { data, error } = await supabase
      .from('songs')
      .select('video_url, genre')
      .eq('genre', genre);
    if (error) {
      console.error('Error fetching songs by genre:', error);
    } else {
      setGenreFilteredSongs(data);
      setDisplayedGenreSongs(data.slice(0, songsPerPage));
      setCurrentSongs(data.slice(0, songsPerPage));
      setCurrentPage(1);
      setMode('genre');
    }
  };


  // Back and Next buttons
  const goToNextPage = () => {
    setCurrentPage((prev) => {
      let nextPageIndex = prev * songsPerPage;
      let hasNextPage = false;
  
      if (mode === 'random') {
        // Use randomizedSongs for pagination in random mode
        hasNextPage = nextPageIndex < randomizedSongs.length;
        if (hasNextPage) {
          const newSongs = randomizedSongs.slice(nextPageIndex, nextPageIndex + songsPerPage);
          setCurrentSongs(newSongs);
        }
      } else if (mode === 'genre') {
        // Genre mode logic
        hasNextPage = nextPageIndex < genreFilteredSongs.length;
        if (hasNextPage) {
          const newSongs = genreFilteredSongs.slice(nextPageIndex, nextPageIndex + songsPerPage);
          setCurrentSongs(newSongs);
        }
      } else {
        // Default mode logic
        hasNextPage = nextPageIndex < allSongs.length;
        if (hasNextPage) {
          const newSongs = allSongs.slice(nextPageIndex, nextPageIndex + songsPerPage);
          setCurrentSongs(newSongs);
        }
      }
  
      return hasNextPage ? prev + 1 : prev;
    });
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => {
      if (prev > 1) {
        let prevPageIndex = (prev - 2) * songsPerPage;
        let newSongs;
  
        if (mode === 'random') {
          // Use randomizedSongs for pagination in random mode
          newSongs = randomizedSongs.slice(prevPageIndex, prevPageIndex + songsPerPage);
        } else if (mode === 'genre') {
          // Genre mode logic
          newSongs = genreFilteredSongs.slice(prevPageIndex, prevPageIndex + songsPerPage);
        } else {
          // Default mode logic
          newSongs = allSongs.slice(prevPageIndex, prevPageIndex + songsPerPage);
        }
        setCurrentSongs(newSongs);
        return prev - 1;
      } else {
        return prev; // Stay on the first page if already there
      }
    });
  };


  // HTML return
  return (
    <div className="discover-container">
      <div className="page-number-label">
        Page Number: {currentPage}
      </div>
      <div className="genre-mode-label">
        Genre Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)} {/* Capitalize the first letter */}
      </div>
      <button className="reset-button" onClick={() => {
        setShowGenrePopup(false); 
        setMode('default'); 
        setCurrentPage(1); 
      }}>
        Reset
      </button>
      <div className="discover-grid">
        {currentSongs.map((song) => {
          const url = song.video_url;
          const id = url.includes('youtu.be')
            ? url.split('/').pop().split('?')[0]
            : new URLSearchParams(new URL(url).search).get('v');
          return (
            <div key={id} className="video-container">
              <div className="video-wrapper">
                <iframe
                  className="video-iframe"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-genre">{song.genre}</div>
            </div>
          );
        })}
      </div>
      <div className="controls-container">
        <button className="randomize-button" onClick={randomizeSongs}>
          Randomize
        </button>
        <div className="pagination">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Back
          </button>
          <button onClick={goToNextPage} disabled={(currentPage * songsPerPage) >= allSongs.length}>
            Next
          </button>
        </div>
        {showGenrePopup && (
          <div className="genre-popup">
            <select onChange={handleGenreChange} value={selectedGenre}>
              <option value="">Select a genre</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        )}
        <button className="genre-button" onClick={() => setShowGenrePopup(true)}>
          Genre
        </button>
=======

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
>>>>>>> d22b85091668b19f80abdc5fde68008f6825cb50
      </div>
    </div>
  );
}
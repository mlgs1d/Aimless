import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../auth/Auth'
import './ReportSongs.css';

// Initialize Supabase client
const supabase = createClient('https://wdnuvorjubabcofbygev.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbnV2b3JqdWJhYmNvZmJ5Z2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODc2MDAsImV4cCI6MjAxNTc2MzYwMH0.16lHDcYbaiQZOdO7E4BYZx2R3MjJ5acqD094Wt6S5mI');


export default function ReportSongs() {
  const { user } = useAuth()
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');


  // Fetch unique genres
  useEffect(() => {
  async function fetchGenres() {
    const { data, error } = await supabase
      .from('songs')
      .select('genre'); // Fetch all genres
    console.log(data); // Check the fetched data
    console.error(error); // Check if there are any errors
    if (error) {
      console.error('Error fetching genres:', error);
    } else {
      // Assuming the data is an array of objects with a 'genre' property
      const genreSet = new Set(data.map(item => item.genre)); // Create a set of unique genres
      setGenres([...genreSet]); // Convert the Set to an array and update state
      console.log([...genreSet]); // Check the array of unique genres
    }
  }
    fetchGenres();
  }, []);


  // Fetch songs for selected genre
  useEffect(() => {
    async function fetchSongs() {
      const { data, error } = await supabase
        .from('songs')
        .select('song_name')
        .eq('genre', selectedGenre);
      if (error) {
        console.error('Error fetching songs: ', error);
      } else {
        setSongs(data);
      }
    }
    if (selectedGenre) {
      fetchSongs();
    }
  }, [selectedGenre]);


  // Handler for when a genre is selected
  const handleGenreChange = (event) => {
    const newGenre = event.target.value;
    setSelectedGenre(newGenre);
    if (newGenre === '') {
      setSelectedSong('');
    }
  };


  // Fetch the video_url for the given genre and song_name
  const fetchVideoUrl = async (genre, songName) => {
    const { data, error } = await supabase
      .from('songs')
      .select('video_url')
      .eq('genre', genre)
      .eq('song_name', songName)
      .single(); 
    if (error) {
      throw error;
    }
    return data.video_url; 
  };


  // Submitting reports
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const videoUrl = await fetchVideoUrl(selectedGenre, selectedSong);
      const reportReason = reason === 'other' ? customReason : reason;
      const { data, error } = await supabase
        .from('reports')
        .insert([
          {
            reason: reportReason,
            genre: selectedGenre,
            song_name: selectedSong,
            video_url: videoUrl, // Include the video URL
            user_id: user.id
          },
        ]);
      if (error) {
        console.error('Error submitting report: ', error);
      } else {
        console.log('Report submitted successfully', data);
        // Reset fields after submission
        setReason('');
        setCustomReason('');
        setSelectedGenre('');
        setSelectedSong('');
      }
    } catch (error) {
      console.error('Failed to fetch video URL or submit report:', error);
    }
  };



  return (
    <div className="report-songs-container">
      <h1 className="report-songs-title">Report Songs here:</h1>
      <form onSubmit={handleSubmit} className="report-songs-form">
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (e.target.value !== 'other') {
                setCustomReason(''); // Clear custom reason if 'other' is not selected
              }
            }}
            required
          >
            <option value="">Select a reason</option>
            <option value="Incorrect Genre Tag">Incorrect Genre Tag</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
            <option value="Duplicate Entry">Duplicate Entry</option>
            <option value="Spam or Irrelevant Content">Spam or Irrelevant Content</option>
            <option value="Broken Link">Broken Link</option>
            <option value="other">Other</option>
          </select>
          {reason === 'other' && (
            <input
              type="text"
              id="customReason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Please specify your reason"
              required={reason === 'other'}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            required
          >
            <option value="">Select a genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="songName">Song Name:</label>
          <select
            id="songName"
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
            required
            disabled={!selectedGenre} // Disable if no genre is selected
          >
            <option value="">Select a song</option>
            {songs.map((song, index) => (
              <option key={index} value={song.song_name}>{song.song_name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
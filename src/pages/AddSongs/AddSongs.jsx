<<<<<<< HEAD
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../auth/Auth'
import './AddSongs.css';

// Initialize Supabase client
const supabase = createClient('https://wdnuvorjubabcofbygev.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbnV2b3JqdWJhYmNvZmJ5Z2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODc2MDAsImV4cCI6MjAxNTc2MzYwMH0.16lHDcYbaiQZOdO7E4BYZx2R3MjJ5acqD094Wt6S5mI');

export default function AddSongs() {
  const { user } = useAuth()
  const [genre, setGenre] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [songName, setSongName] = useState('');

  // Submitting songs
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('songs')
      .insert([
        { 
          genre: genre, 
          song_name: songName,
          video_url: videoUrl, 
          user_id: user.id},
      ]);
    if (error) {
      console.log('Error submitting form: ', error);
    } else {
      console.log('Form submitted successfully', data);
      // Reset fields after submission
      setGenre('');
      setSongName('');
      setVideoUrl('');
    }
  };

  return (
    <div className="add-songs-container">
      <h1 className="add-songs-title">Add Songs here:</h1>
      <form onSubmit={handleSubmit} className="add-songs-form">
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="songName">Song Name:</label> 
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
=======
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../auth/Auth'
import './AddSongs.css';

// Initialize Supabase client
const supabase = createClient('https://wdnuvorjubabcofbygev.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbnV2b3JqdWJhYmNvZmJ5Z2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxODc2MDAsImV4cCI6MjAxNTc2MzYwMH0.16lHDcYbaiQZOdO7E4BYZx2R3MjJ5acqD094Wt6S5mI');

export default function AddSongs() {
  const { user } = useAuth()
  const [genre, setGenre] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [songName, setSongName] = useState('');

  // Submitting songs
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('songs')
      .insert([
        { 
          genre: genre, 
          song_name: songName,
          video_url: videoUrl, 
          user_id: user.id},
      ]);
    if (error) {
      console.log('Error submitting form: ', error);
    } else {
      console.log('Form submitted successfully', data);
      // Reset fields after submission
      setGenre('');
      setSongName('');
      setVideoUrl('');
    }
  };

  return (
    <div className="add-songs-container">
      <h1 className="add-songs-title">Add Songs here:</h1>
      <form onSubmit={handleSubmit} className="add-songs-form">
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="songName">Song Name:</label> 
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
>>>>>>> d22b85091668b19f80abdc5fde68008f6825cb50
}
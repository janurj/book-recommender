// src/components/Preferences.js
import React, { useState } from 'react';

function Preferences({ genres, onUpdate }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedGenres); // Pass the selected genres back to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Select Your Preferred Genres</h3>
      {genres.map((genre) => (
        <div key={genre}>
          <label>
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        </div>
      ))}
      <button type="submit">Update Preferences</button>
    </form>
  );
}

export default Preferences;

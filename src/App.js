import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const App = () => {
  const API_URL = "http://www.omdbapi.com/?apikey="+process.API_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const movie1 = {
    "imdbID" : "1212" , 
    "Poster" : "122324" ,
    "Title" : "SpiderMan"
  }
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('Spider');
  }, []);

  return (
    <div className='app'>
      <h1>Movie Finder</h1>
      <div className="search">
        <input
          placeholder='Search For Movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='Search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className='container'>
            <MovieCard movie={movie1} />
          </div>
        )
      }
    </div>
  );
};

export default App;

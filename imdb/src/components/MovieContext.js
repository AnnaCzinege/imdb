import React, { useState, useEffect, useCallback, createContext } from 'react';
import Axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = props => {
  const [movies, setMovies] = useState([]);

  const [movieId, setMovieId] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieOverview, setMovieOverview] = useState('');
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieLanguages, setMovieLanguages] = useState([]);
  const [movieReleaseDate, setMovieReleaseDate] = useState('');
  const [movieRuntime, setMovieRuntime] = useState(0);
  const [movieVoteAverage, setMovieVoteAverage] = useState(0);
  const [movieVoteCount, setMovieVoteCount] = useState(0);
  const [moviePoster, setMoviePoster] = useState('');

  const fetchMovies = url => {
    Axios.get(url).then(resp => setMovies(resp.data.results));
  };

  const fetchMovieDetails = useCallback(url => {
    Axios.get(url).then(resp => {
      setMovieId(resp.data.id);
      setMovieTitle(resp.data.title);
      setMovieOverview(resp.data.overview);
      setMovieGenres(resp.data.genres);
      setMovieLanguages(resp.data.spoken_languages);
      setMovieReleaseDate(resp.data.release_date);
      setMovieRuntime(`${resp.data.runtime} min`);
      setMovieVoteAverage(resp.data.vote_average);
      setMovieVoteCount(resp.data.vote_count);
      setMoviePoster(resp.data.poster_path);
    });
  }, []);

  useEffect(() => {
    fetchMovies(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=bb29364ab81ef62380611d162d85ecdb&language=en-US&page=1'
    );
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        movieId,
        movieTitle,
        movieOverview,
        movieGenres,
        movieLanguages,
        movieReleaseDate,
        movieRuntime,
        movieVoteAverage,
        movieVoteCount,
        moviePoster,
        fetchMovieDetails
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

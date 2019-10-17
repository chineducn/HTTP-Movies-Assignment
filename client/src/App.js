import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';

const App = () => {

  const moviesApi = "http://localhost:5000/api/movies"  
  
  const initialForm = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: '',
  }

  const [savedList, setSavedList] = useState([]);
  const [moviesState, setMovies] = useState([]);
  const [formState, setForm] = useState(initialForm);

  const getMovies = () => {
    axios
      .get(moviesApi)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  };

  const updateMovie = formValues => {
    const updatedMovie = {
      id: formValues.id,
      title: formValues.title,
      director: formValues.director,
      metascore: formValues.metascore,
      stars: formValues.stars.split(','),
    };
    axios
      .put(`${moviesApi}/${formValues.id}`, updatedMovie)
      .then(response => {
        setForm(initialForm);
        getMovies();
        if (formState.id === initialForm.id) {
          return <Redirect to='/' />;
        }         
      })
      .catch(error => {
        debugger
      });
        
  }
  
  const updateDetails = movie => {
    setForm(
      {
        id: movie.id,
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: movie.stars.toString(),
      }
    )
  };

  

  useEffect(() => {
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {
        return <MovieList movies={moviesState}/>
      }} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie
            {...props}
            addToSavedList={addToSavedList}
            updateDetails={updateDetails}
          />;
        }}
      />            
      <Route
        path="/update/:id"
        render={props => {
          return <MovieForm
            initialForm={formState}
            updateMovie={updateMovie}
          />;
        }}
      />
    </>
  );
};

export default App;

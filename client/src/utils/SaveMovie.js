import React, { useState, useEffect } from 'react';
import {searchMovies} from "./movieRequests";
import {saveMovieIds, SavedMovieIds} from './localStorage';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_MOVIE} from './mutations';
import Auth from './auth';

const SaveMovie = () => {
    const [savedMovieIds, setSavedMovieIds] = useState(SavedMovieIds());

    const [saveMovie] = useMutation(SAVE_MOVIE);


    useEffect(() => {
        return () => saveMovieIds(savedMovieIds);
    });

    const handleSaveMovie = async (movieId) => {
        const movieToSave = searchMovies.find((movie) => movie.movieId === movieId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
         const {data} = await saveMovie({
            variables: {movieData: {...movieToSave}},
        });
        console.log(savedMovieIds);
        setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
        } catch (err) {
        console.error(err);
        }
    };   
};

export default SaveMovie;
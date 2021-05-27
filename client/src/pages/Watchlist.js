import React from 'react';
import { Jumbotron, Container, CardColumns } from 'react-bootstrap';
import {useQuery} from '@apollo/react-hooks';
import last from "lodash-es/last";

import {QUERY_ME} from '../utils/queries';
import { MovieCards } from "../components/MovieCards";

const Watchlist = () => {
    const { loading, data, refetch } = useQuery(QUERY_ME);

    const userData = data?.me || {};

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const mappedMovies = userData?.savedMovies?.map(movie => ({
        id: movie.movieId,
        title: movie.title,
        poster_path: '/' + last(movie.image.split('/'))
    }))

    return (
        <>
        <Jumbotron fluid className='text-light bg-dark'>
            <Container>
                <h1>Viewing {userData.username}'s saved movies</h1>
            </Container>
        </Jumbotron>
        <Container>
            <h2>
                {userData.savedMovies?.length ?
                `Viewing ${userData.savedMovies.length} saved
                ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:` 
                : 'You have no saved movies!'}
            </h2>
            <CardColumns>
                <MovieCards movies={mappedMovies} savedMovies={userData?.savedMovies} refetch={refetch}></MovieCards>
            </CardColumns>
            
        </Container>
       </> 
    );
};

export default Watchlist;    
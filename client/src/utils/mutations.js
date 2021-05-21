import gql from 'graphql-tag';

export const SAVE_MOVIE = gql`
mutation saveMovie($movieData: MovieInput!) {
    saveMovie(movieData: $movieData) {
        _id
        username
        email
        savedMovies {
            movieId
            title
            image
        }
    }
}`;

export const REMOVE_MOVIE = gql`
mutation removeMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
        _id
        username
        email
        savedMovies {
            movieId
            title
            image
        }
    }
}`;    
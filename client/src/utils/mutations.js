import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}`;

export const ADD_USER = gql`
mutation ADD_USER($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
<<<<<<< HEAD
        token
=======
        token 
>>>>>>> fd2074cab5ed35f0f74eb74b32dc42eb7278138d
        user {
            _id
            username
        }
    }
}`;

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
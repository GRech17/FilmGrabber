const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        savedMovies: [Movie]
    }

    type Movie {
        _id: ID
        title: String
        image: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        movies: (title: String): [Movie]

    }
    type Mutation {
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
}`

module.exports = typeDefs;

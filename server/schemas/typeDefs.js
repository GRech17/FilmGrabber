const {gql} = require('apollo-server-express');

const typeDefs = gql`

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
}
type User {
    _id: ID!
    username: String!
    email: String
    movieCount: Int
    savedMovies: [Movie]
}
type Movie {
    movieId: ID!
    overview: String
    image: String
    title: String!
}
input MovieInput {
    movieId: String
    image: String
    title: String!
}
type Query {
    me: User
    users: [User]
    user(username: String!): User
    
}
type Auth {
    signToken: ID
    user: User
}`;


module.exports = typeDefs;

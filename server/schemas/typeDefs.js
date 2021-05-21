const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
}
<<<<<<< HEAD
=======

>>>>>>> origin
type User {
    _id: ID!
    username: String!
    email: String
    movieCount: Int
<<<<<<< HEAD
    savedMovie: [Movie]
}
type Movie {
    movieId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }
input MovieInput {
    authors: [String]
    description: String!
    moiveId: String!
    image: String
    link: String
    title: String!
}
type Query {
    me: User
}
type Auth {
    token: ID!
    user: User
  
}`
=======
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
    token: ID!
    user: User
}`;

>>>>>>> origin

module.exports = typeDefs;
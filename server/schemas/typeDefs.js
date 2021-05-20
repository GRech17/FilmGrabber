const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Mutation {
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
}`

module.exports = typeDefs;

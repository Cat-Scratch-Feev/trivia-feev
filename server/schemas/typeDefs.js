const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    score: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateScore(score: Int!): User
    editUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;

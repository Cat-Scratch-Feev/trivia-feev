import { gql } from "@apollo/client";

// Get all users
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      password
      score
    }
  }
`;

// Get a single user by id
export const QUERY_USER_BY_ID = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      password
      score
    }
  }
`;

// Get a single user by username
export const QUERY_ONE_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      score
    }
  }
`;

// Get a score by user id
export const QUERY_SCORE_BY_ID = gql`
  query user($id: ID!) {
    user(_id: $id) {
      score
    }
  }
`;

// Get a score by username
export const QUERY_SCORE = gql`
  query user($username: String!) {
    user(username: $username) {
      score
    }
  }
`;

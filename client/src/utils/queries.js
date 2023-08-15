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

// Get logged in user
export const QUERY_ME = gql`
  query me {
    me {
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

// Get all scores
export const QUERY_SCORES = gql`
  query users {
    users {
      username
      score
    }
  }
`;

// Get a score by user id
export const QUERY_SCORE_BY_ID = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      score
    }
  }
`;

// Get a score by username
export const QUERY_ONE_SCORE = gql`
  query user($username: String!) {
    user(username: $username) {
      username
      score
    }
  }
`;

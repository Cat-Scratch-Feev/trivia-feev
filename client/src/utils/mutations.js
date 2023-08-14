import { gql } from "@apollo/client";

// Add user mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Update user mutation
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

// Update score mutation
export const UPDATE_SCORE_MUTATION = gql`
  mutation UpdateScore($userId: ID!, $score: Int!, $quizScore: Int!) {
    updateScore(userId: $userId, score: $score, quizScore: $quizScore) {
      _id
      username
      email
      score
    }
  }
`;

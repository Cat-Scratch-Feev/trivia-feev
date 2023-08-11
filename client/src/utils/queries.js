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

// Get a single user by username

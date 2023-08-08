const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get a list of users
    users: async () => {
      return await User.find();
    },
    // Get a single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  }, 
  Mutation: {
    // Add a user
    addUser: async (parent, { username, email, password }) => {
      // Create a user
      const user = await User.create({ username, email, password });
      // Create a token
      const token = signToken(user);
      // Return token and user
      return { token, user };
    },
    // Login a user
    login: async (parent, { email, password }) => {
      // Look up by email
      const user = await User.findOne({ email });
      // If no user found
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // Check if password is correct
      const correctPw = await user.isCorrectPassword(password);
      // If the password is wrong
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // Create a new token
      const token = signToken(user);
      // Return token and user
      return { token, user };
    },
    // TODO: Add score
  },
};

module.exports = resolvers;
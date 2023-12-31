const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { bcrypt } = require("bcrypt");

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

    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
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
      const user = await User.findOne({ email });
      // If no user found
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      // Check if password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Create a new token
      const token = signToken(user);
      return { token, user };
    },

    // Update Score
    updateScore: async (parent, { score }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $inc: { score: score } },
            { new: true }
          );

          return updatedUser;
        } catch (err) {
          throw new ApolloError("Couldn't update score", "SCORE_UPDATE_ERROR");
        }
      } else {
        throw new AuthenticationError("Authentication required.");
      }
    },

    updateUser: async (parent, { email, username }, context) => {
      if (context.user) {
        try {
          // Create object with updated fields
          const updatedFields = {};

          // Check which fields are being updated and add to object
          if (email) {
            updatedFields.email = email;
          }
          if (username) {
            updatedFields.username = username;
          }

          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: updatedFields },
            { new: true }
          );

          return updatedUser;
        } catch (err) {
          throw new ApolloError("Couldn't update user", "USER_UPDATE_ERROR");
        }
      } else {
        throw new AuthenticationError("Authentication required.");
      }
    },
  },
};

module.exports = resolvers;

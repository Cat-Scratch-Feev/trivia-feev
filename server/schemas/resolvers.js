const { AuthenticationError } = require("apollo-server-express");
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
    updateScore: async (parent, { username, quizScore }, context) => {
      if (context.user) {
        try {
          if (context.user.username !== username) {
            throw new AuthenticationError(
              "You are not authorized to update this score."
            );
          }

          const user = await User.findOneAndUpdate(
            { username: username },
            { $inc: { score: quizScore } },
            { new: true }
          );

          return user;
        } catch (err) {
          throw new ApolloError("Couldn't update score", "SCORE_UPDATE_ERROR");
        }
      } else {
        throw new AuthenticationError("Authentication required.");
      }
    },

    updateUser: async (parent, { username, email, password }, context) => {
      if (context.user) {
        if (context.user._id.toString() !== username()) {
          throw new AuthenticationError(
            "You are not authorized to update this user."
          );
        }
        // Create object with updated fields
        const updatedFields = {};

        // Check which fields are being updated and add to object
        if (username) {
          updatedFields.username = username;
        }
        if (email) {
          updatedFields.email = email;
        }
        if (password) {
          updatedFields.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: updatedFields },
          { new: true }
        );

        return updatedUser;
      } else {
        throw new AuthenticationError("Authentication required.");
      }
    },
  },
};

module.exports = resolvers;

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
    // Get a single user by _id
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
    updateScore: async (parent, { userId, score, quizScore }) => {
      if (userId) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: userId },
            // This should increment by the score passed in
            { $inc: { score: quizScore } },
            { new: true }
          );
          return user;
        } catch (err) {
          throw new AuthenticationError("Couldn't update score");
        }
      } else {
        throw new AuthenticationError("Authentication required.");
      }
    },

    // Update username, email, and password
    updateUser: async (parent, { username, email, password }, context) => {
      if (context.user) {
        // Create an object with the fields to update
        const updatedFields = {};

        // If any of the following fields exist, add them to the updatedFields object
        if (username) {
          updatedFields.username = username;
        }
        if (email) {
          updatedFields.email = email;
        }
        if (password) {
          updatedFields.password = await bcrypt.hash(password, 10);
        }

        // Update user
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: updatedFields },
          { new: true }
        );
      } else {
        throw new AuthenticationError("Authentication required.");
      }
    },
  },
};

module.exports = resolvers;

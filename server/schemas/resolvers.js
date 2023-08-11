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
        throw new AuthenticationError("No user found with this email address");
      }

      // Check if password is correct
      const correctPw = await user.isCorrectPassword(password);
      // If the password is wrong
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Create a new token
      const token = signToken(user);
      // Return token and user
      return { token, user };
    },
    // TODO: Update Score

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

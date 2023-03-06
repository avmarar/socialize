import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import {
  validateLoginInput,
  validateRegisterInput,
} from "../../utils/validators.js";
import { SECRET_KEY } from "../../../config/config.js";
import User from "../../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      //Validate login data
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new GraphQLError(" Login Data Validation Error", {
          extensions: {
            code: "BAD_USER_INPUT",
            exception: { errors },
          },
        });
      }

      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError("User not found!", {
          extensions: {
            code: "BAD_USER_INPUT",
            exception: { errors: { username: "Invalid username" } },
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new GraphQLError("Invalid Credentials!", {
          extensions: {
            code: "BAD_USER_INPUT",
            exception: { errors: { password: "Incorrect password" } },
          },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) => {
      //Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new GraphQLError("Validation Error", {
          extensions: {
            code: "BAD_USER_INPUT",
            exception: { errors },
          },
        });
      }
      //Make sure user does not exist
      const user = await User.findOne({ username });
      if (user) {
        throw new GraphQLError("Username already exist!", {
          extensions: {
            code: "BAD_USER_INPUT",
            exception: {
              errors: {
                username: "Username already exist",
              },
            },
          },
        });
      }
      //TODO Hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

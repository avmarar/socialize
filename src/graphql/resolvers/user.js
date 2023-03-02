import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import { validateRegisterInput } from "../../utils/validators.js";
import { SECRET_KEY } from "../../../config/config.js";
import User from "../../models/User.js";

export default {
  Mutation: {
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

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

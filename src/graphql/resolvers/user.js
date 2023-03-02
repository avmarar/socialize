import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      //Make sure user does not exist
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

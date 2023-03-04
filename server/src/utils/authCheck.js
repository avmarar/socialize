import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../config/config.js";

const authCheck = ({ token }) => {
  const authHeader = token;

  if (authHeader) {
    //Bearer....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new GraphQLError("Invalid/Expired token", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
    } else {
      throw new Error("Authentication token must be a 'Bearer [token]'");
    }
  } else {
    throw new Error("Authorization header must be provided");
  }
};

export { authCheck };

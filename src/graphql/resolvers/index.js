import postResolvers from "./posts.js";
import userResolvers from "./user.js";

export default {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};

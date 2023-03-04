import postResolvers from "./posts.js";
import userResolvers from "./user.js";
import commentResolvers from "./comments.js";

export default {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};

import { GraphQLError } from "graphql";

import Post from "../../models/Post.js";
import { authCheck } from "../../utils/authCheck.js";

export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("No post found with this Id");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = authCheck(context);

      const newPost = new Post({
        body,
        username: user.username,
        user: user.id,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = authCheck(context);

      try {
        const post = await Post.findById(postId);
        if (post && user.username === post.username) {
          await post.delete();
          return "Post deleted successfully!!";
        } else {
          throw new GraphQLError("Action not allowed!!", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

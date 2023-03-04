import Post from "../../models/Post.js";
import { authCheck } from "../../utils/authCheck.js";

export default {
  Mutation: {
    createComment: async (_, { body, postId }, context) => {
      const { username } = authCheck(context);
      if (body.trim() === "") {
        throw new Error("Comment body must not be empty");
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new Error("Post not found");
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = authCheck(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new Error("Action not allowed!!");
        }
      } else {
        throw new Error("Post not found!!");
      }
    },
  },
};

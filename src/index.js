import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import Post from "./models/Post.js";
import { MONGODB_CONNECTION_STRING } from "../config/config.js";

const typeDefs = `#graphql
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODB_CONNECTION_STRING).then(async () => {
  console.log("****Connected to MongoDB****");
  const { url } = await startStandaloneServer(server);
  console.log(`****Server ready at: ${url}****`);
});

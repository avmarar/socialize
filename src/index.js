import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import { MONGODB_CONNECTION_STRING } from "../config/config.js";

const typeDefs = `#graphql
  type Query {
    sayHi: String
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!",
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

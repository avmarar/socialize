import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import { MONGODB_CONNECTION_STRING } from "../config/config.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODB_CONNECTION_STRING).then(async () => {
  console.log("****Connected to MongoDB****");
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
  });
  console.log(`****Server ready at: ${url}****`);
});

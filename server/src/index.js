import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import { MONGODB_CONNECTION_STRING } from "../config/config.js";

const PORT = process.env.port || 4000;

const app = express();

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the Apollo server
const server = new ApolloServer({
  schema,
});

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(async () => {
    console.log("****Connected to MongoDB****");
    await server.start();

    app.use(
      "/graphql",
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          token: req.headers.authorization,
        }),
      })
    );
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}/graphql`
      );
      console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql `
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

import cors from "cors";
import http from "http";
import path from "path";
import url from "url";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";
import "./src/utils/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedTypeDefs = await loadFiles(`${__dirname}/**/*.graphql`, {
  ignoreIndex: true,
  requireMethod: async (path) => {
    return await import(url.pathToFileURL(path));
  },
});

const loadedResolvers = await loadFiles(`${__dirname}/**/*.resolvers.js`, {
  ignoreIndex: true,
  requireMethod: async (path) => {
    return await import(url.pathToFileURL(path));
  },
});
const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = mergeResolvers(loadedResolvers);

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  const server = new ApolloServer({
    schema,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use("/", cors(), express.json(), expressMiddleware(server));

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/`);
}
startApolloServer();

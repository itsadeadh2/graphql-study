const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const Dataloader = require('dataloader');
const { verifyUser } = require('../helper/context');
const loaders = require('../loaders');


exports.getApolloInstance = async (typeDefs, resolvers, app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    // context runs on each request
    context: async ({ req }) => {
      const userMetadata = await verifyUser(req);
      return {
        ...userMetadata,
        loaders: {
          user: new Dataloader(keys => loaders.user.batchUsers(keys))
        }
      }
    },
    formatError: (error) => {
      return { message: error.message };
    }
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' })
  return server;
}

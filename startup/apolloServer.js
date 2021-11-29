const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
exports.getApolloInstance = async (typeDefs, resolvers, app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' })
  return server;
}
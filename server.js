const { getApolloInstance } = require('./startup/apolloServer');
const { getAppInstance } = require('./startup/app');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { connection } = require('./database/util');
const dotEnv = require('dotenv');
/*
  TODO: I Still dont feel like I fully understand resolvers, I should read more about it in the docs
  if i'm not able to figure them out by the end of the course
*/
async function start() {

  dotEnv.config();
  await connection();
  const app = getAppInstance();
  const apollo = await getApolloInstance(typeDefs, resolvers, app);
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Graphql Endpoint: ${apollo.graphqlPath}`)
  })
}

start();

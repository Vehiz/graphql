import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/def-services.mjs";
import chokidar from 'chokidar'


const port = 4001
const server = new ApolloServer({ typeDefs, resolvers });

const watcher = chokidar.watch('./schema', {
  ignored: ['.git', '.svn', 'node_modules'], // Ignore specific directory/file names
  persistent: true,
});

watcher.on('change', () => {
  const updatedSchema = gql(fs.readFileSync('graphql-auth-service/graphql/schema.mjs', 'utf8'));
  server.updateSchema(updatedSchema);
});

server.listen(port).then(({ url }) => {
  console.log(`Schema and Type Definitions Service running at ${url}`);
});

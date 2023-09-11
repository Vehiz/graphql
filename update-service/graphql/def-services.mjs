import {ApolloServer, gql} from 'apollo-server';
import chokidar from 'chokidar';
import writeFileSync from 'fs';


export const typeDefs = gql`
  type Query {
    hello: String
  }
`;



 export const resolvers = {
  Query: {
    hello: () => 'welcome to type definitions and updates.',
  },
};


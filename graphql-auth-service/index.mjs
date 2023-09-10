import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema.mjs";
import { resolvers } from "./resolvers/resolvers.mjs";
import { context } from "./middleware/context.mjs";
import mongoose from "mongoose";
import { MONGO_URI } from "./config/config.mjs";
// import dotenv from "dotenv";
// dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context,
 });


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("🚀 Connected to MongoDB");
})
.catch((error) => {
  console.log(error);
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
.catch((error) => {
  console.log(error);
});

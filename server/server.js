const { ApolloServer } = require("apollo-server");
const resolvers = require("./schema/resolvers");

const typeDefs = require("./schema/typeDefs");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mogoose connect!!!");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is ${url}`);
});

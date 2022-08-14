var express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const schema = require("./schema/schema");
const color = require("colors");
const connectDb = require("./config/db");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schem,a using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

var app = express();
connectDb();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, () =>
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
);

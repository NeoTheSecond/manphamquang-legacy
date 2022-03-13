import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: process.env.DATABASE_URL,
  uri: "http://localhost:3001/api/graphql",
  cache: new InMemoryCache(),
});

export default client;

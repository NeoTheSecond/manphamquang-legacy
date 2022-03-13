import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useEffect } from "react";

const client = new ApolloClient({
  // uri: process.env.DATABASE_URL,
  uri: "http://localhost:3001/api/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;

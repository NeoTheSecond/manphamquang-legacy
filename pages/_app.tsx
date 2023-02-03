import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../apollo-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages/_app.js
import {
  Inter,
  Roboto_Mono,
  Chivo_Mono,
  Azeret_Mono,
  Archivo,
} from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto_Mono({ subsets: ["latin"] });

const chivo = Chivo_Mono({ subsets: ["latin"] });

const azeret = Azeret_Mono({ subsets: ["latin"] });

const archivo = Archivo({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (typeof window !== "undefined") {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${archivo.style.fontFamily};
        }
      `}</style>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer autoClose={1300} hideProgressBar />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;

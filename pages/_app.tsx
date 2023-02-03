import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../apollo-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

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

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-slate-400 text-gray-900",
  dark: "border border-yellow-300 bg-slate-900 text-yellow-300",
};

function MyApp({ Component, pageProps }: AppProps) {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  type ToastTheme = "light" | "dark";
  let toastTheme: ToastTheme = "light";
  if (typeof window !== "undefined") {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      toastTheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      toastTheme = "light";
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
          <ToastContainer
            toastClassName={(data) => {
              if (data) {
                console.log(data.type);

                return (
                  contextClass[
                    toastTheme === "dark" ? "dark" : data.type || "default"
                  ] +
                  " relative flex p-1 min-h-10 shadow-xl mb-2 rounded justify-between overflow-hidden cursor-pointer"
                );
              } else {
                return "relative flex p-1 min-h-10 shadow-xl rounded justify-between overflow-hidden cursor-pointer";
              }
            }}
            bodyClassName={() => "text-md block p-3"}
            autoClose={false}
            hideProgressBar
            theme={toastTheme}
            draggable
          />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;

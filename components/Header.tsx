import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdDarkMode } from "react-icons/md";
import Router from "next/router";

export default function Header() {
  useEffect(() => {
    if (!localStorage.theme) {
      localStorage.theme = "light";
    }
  }, []);
  const changeMode = () => {
    switch (localStorage.theme) {
      case "light":
        localStorage.theme = "dark";
        break;
      case "dark":
        localStorage.theme = "light";
        break;
      // default:
      //   break;
    }
    Router.reload();

    // // Whenever the user explicitly chooses dark mode
    // localStorage.theme = "dark";

    // // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  };
  return (
    <>
      <Head>
        <title>Man Pham Quang</title>
        <meta
          name="description"
          content="My name is Mẫn, a Fullstack Web Developer with over 5 years of experience. I am also an undergraduate enrolled in Bachelor of Information Technology at RMIT University in Vietnam.
"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <nav className="flex items-center justify-between p-2 m-auto mb-2 text-gray-700 border-2 dark:border-cyan-300 dark:shadow-md dark:shadow-cyan-500/50">
        <div>
          <Link
            href="/"
            className="p-2 text-xl rounded hover:bg-slate-100 dark:hover:text-cyan-200 dark:hover:bg-transparent dark:text-cyan-300"
          >
            Home
          </Link>
        </div>
        <div>
          {/* <Link href="/" className="p-2 rounded hover:bg-slate-100">
            
          </Link> */}
          <button
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={changeMode}
          >
            <MdDarkMode className="dark:text-white" />
          </button>
        </div>
      </nav>
    </>
  );
}

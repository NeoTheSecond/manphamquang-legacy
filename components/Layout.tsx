import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-cyan-50 min-w-fit">
      {/* <main className="h-full p-8 m-auto md:p-0 md:pt-8 md:max-w-screen-md">
        <Header />
        <div className="min-h-[calc(100vh-(2rem+52px+8px+48px))] px-5 py-2 border-2 shadow-lg dark:border-cyan-300 dark:shadow-cyan-500/50 "> */}
      <main className="p-0 m-auto md:p-8 md:pt-8 md:max-w-screen-md">
        <Header />
        <div className="min-h-[calc(100vh-(2rem+52px+8px+48px))] px-5 py-2 border-0 shadow-lg md:border-2 dark:border-cyan-300 dark:shadow-cyan-500/50 ">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

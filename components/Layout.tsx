import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-cyan-50 min-w-fit">
      <main className="p-8 m-auto  md:p-0 md:pt-8 md:max-w-screen-md">
        <Header />
        <div className="px-5 py-2 border-2 shadow-lg dark:border-cyan-300 dark:shadow-cyan-500/50 ">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

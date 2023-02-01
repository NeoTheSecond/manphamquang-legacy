import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-slate-900 dark:text-cyan-50 min-h-screen">
      <main className="pt-8">
        <Header />
        <div className="py-2 px-5 max-w-screen-md m-auto border-2 dark:border-cyan-300 shadow-lg dark:shadow-cyan-500/50 ">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

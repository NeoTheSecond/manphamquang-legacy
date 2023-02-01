import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-slate-900 dark:text-cyan-50 min-h-screen min-w-fit">
      <main className="p-8 md:p-0 md:pt-8 md:max-w-screen-md m-auto">
        <Header />
        <div className="py-2 px-5 border-2 dark:border-cyan-300 shadow-lg dark:shadow-cyan-500/50 ">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

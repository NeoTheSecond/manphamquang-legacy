import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">
      <main className="pt-8">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}

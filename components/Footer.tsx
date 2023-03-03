import Link from "next/link";
import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export default function Footer() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("quangman1404@gmail.com");
    toast("Coppied email to clipboard.");
  };
  return (
    <footer className="flex items-center justify-between max-w-screen-md py-2 m-auto">
      <span>© 2021 Man Pham</span>
      <span>Created with Next.js and Tailwind CSS</span>
      {/* <span>© 2021 Man Pham</span> */}
      <div className="flex">
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/m%E1%BA%ABn-ph%E1%BA%A1m-834428b5"
        >
          <AiOutlineLinkedin className="w-8 h-8 cursor-pointer hover:text-slate-600 dark:hover:text-cyan-300" />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.facebook.com/man.phamquang.71"
        >
          <AiOutlineFacebook className="w-8 h-8 cursor-pointer hover:text-slate-600 dark:hover:text-blue-300" />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.instagram.com/manphamquang"
        >
          <AiOutlineInstagram className="w-8 h-8 cursor-pointer hover:text-slate-600 dark:hover:text-rose-300" />
        </Link>
        <AiOutlineMail
          className="w-8 h-8 cursor-pointer hover:text-slate-600 dark:hover:text-yellow-300"
          onClick={handleCopyEmail}
        />
      </div>
    </footer>
  );
}

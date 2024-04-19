import React from "react";

export default function Badge({
  style = "default",
  text,
}: {
  style: string;
  text: string;
}) {
  switch (style) {
    case "red":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 dark:hover:text-red-200">
          {text}
        </span>
      );
    case "gray":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
          {text}
        </span>
      );
    case "stone":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-stone-100 text-stone-800 hover:bg-stone-200 hover:text-stone-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200">
          {text}
        </span>
      );
    case "orange":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800 dark:hover:text-orange-200">
          {text}
        </span>
      );
    case "yellow":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 dark:hover:text-yellow-200">
          {text}
        </span>
      );
    case "green":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] w-full bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 dark:hover:text-green-200">
          {text}
        </span>
      );
    case "teal":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-teal-100 text-teal-800 hover:bg-teal-200 hover:text-teal-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-teal-900 dark:text-teal-300 dark:hover:bg-teal-800 dark:hover:text-teal-200">
          {text}
        </span>
      );
    case "sky":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-sky-100 text-sky-800 hover:bg-sky-200 hover:text-sky-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-sky-900 dark:text-sky-300 dark:hover:bg-sky-800 dark:hover:text-sky-200">
          {text}
        </span>
      );
    case "blue":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 dark:hover:text-blue-200">
          {text}
        </span>
      );
    case "purple":
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800 dark:hover:text-purple-200">
          {text}
        </span>
      );
    default:
      return (
        <span className="transition-colors delay-25 duration-50 max-w-fit inline-block m-[1px] bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 dark:hover:text-blue-200">
          {text}
        </span>
      );
  }
}

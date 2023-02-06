import React, { useState } from "react";
import { ExperienceType } from "../types";
import Section from "./Section";
import Image from "next/image";
import { RxCaretDown } from "react-icons/rx";
import classNames from "classnames";

const ExperienceCard = ({ data }: { data: ExperienceType }) => {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    setIsShow(!isShow);
  };
  return (
    <div
      className={classNames(
        "flex p-2 mb-2 bg-slate-200 overflow-hidden h-full dark:bg-transparent border-slate-300 dark:border-cyan-900 dark:bg-slate-900 border dark:shadow rounded cursor-pointer transition-[max-height] ease-in-out",
        isShow ? "max-h-[500px]" : "max-h-[87px]"
      )}
      onClick={handleClick}
    >
      <Image
        src={data.cover_image.publicUrl}
        alt={data.title}
        width={69}
        height={69}
        className="flex-initial h-[69px]"
      />
      <div className="flex-auto ml-2 select-text text-zinc-800 dark:text-cyan-50">
        <div className="flex items-center justify-between font-bold">
          {data.title}
          <RxCaretDown
            className={classNames("mr-1 transition-transform", {
              "rotate-180": isShow,
            })}
          />
        </div>
        <div className="font-light">
          {data.location} - {data.duration}
        </div>
        <div className={classNames("opacity-75  font-light select-none")}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default function Experience({ data }: { data: Array<ExperienceType> }) {
  return (
    <Section className="dark:text-white">
      <h4 className="mb-2 text-4xl text-zinc-700 dark:text-cyan-200">
        Experience
      </h4>
      <div>
        {data.map((experience: ExperienceType) => (
          <ExperienceCard data={experience} key={experience.id} />
        ))}
      </div>
    </Section>
  );
}

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
        "flex p-2 mb-2 bg-slate-200 dark:bg-transparent h-[100%] border-slate-300 dark:border-cyan-900 border dark:shadow rounded cursor-pointer transition ease-in-out delay-150"
      )}
      onClick={handleClick}
    >
      <Image
        src={data.cover_image.publicUrl}
        alt={data.title}
        width={70}
        height={70}
        className="flex-initial h-[70px]"
      />
      <div className="ml-2 text-zinc-800 dark:text-cyan-50 flex-auto select-text">
        <div className="font-bold flex justify-between items-center">
          {data.title}
          <RxCaretDown className="mr-1" />
        </div>
        <div className="font-light">
          {data.location} - {data.duration}
        </div>
        <div
          className={classNames("opacity-75 font-light", {
            "line-clamp-1": !isShow,
          })}
        >
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default function Experience({ data }: { data: Array<ExperienceType> }) {
  return (
    <Section className="dark:text-white">
      <h4 className="text-4xl text-zinc-700 mb-2 dark:text-cyan-200">
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

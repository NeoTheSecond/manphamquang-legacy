import React, { useState } from "react";
import { ExperienceType } from "../types";
import Section from "./Section";
import Image from "next/image";
import { RxCaretDown } from "react-icons/rx";
import classNames from "classnames";
import moment from "moment";

const ExperienceCard = ({ data }: { data: ExperienceType }) => {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    setIsShow(!isShow);
  };
  return (
    <div
      className={classNames(
        "flex p-2 mb-2 bg-slate-200 overflow-hidden h-full dark:bg-transparent border-slate-300 dark:border-cyan-900 dark:bg-slate-900 border dark:shadow rounded cursor-pointer"
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
          {/* {data.location} - {data.duration} */}
          {moment(data.startDate, "YYYY-MM-DD").format("MM/YYYY")} -{" "}
          {moment(data.endDate, "YYYY-MM-DD").format("MM/YYYY")} | {data.type}
        </div>
        <div
          className={classNames(
            "opacity-75  font-light select-none overflow-hidden transition-[max-height] ease-in-out",
            isShow ? "max-h-[500px]" : "max-h-[29px]"
          )}
        >
          {data.description}
        </div>
        <div className="space-x-1 space-y-1">
          {data.technologies.map((el) => {
            return (
              <span
                key={el.id}
                className={classNames(
                  " border rounded border-slate-600 opacity-75 text-sm p-[2px] inline-block text-nowrap max-w-fit"
                )}
              >
                {el.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Experience({ data }: { data: Array<ExperienceType> }) {
  const sorted = [...data].sort((a, b) => {
    const endDateA = moment(a.endDate, "YYYY-MM-DD");
    const endDateB = moment(b.endDate, "YYYY-MM-DD");
    return endDateB.diff(endDateA);
  });

  return (
    <Section className="dark:text-white">
      <h4 className="mb-2 text-4xl text-zinc-700 dark:text-cyan-200">
        Experience
      </h4>
      <div>
        {sorted.map((experience: ExperienceType) => (
          <ExperienceCard data={experience} key={experience.id} />
        ))}
      </div>
    </Section>
  );
}

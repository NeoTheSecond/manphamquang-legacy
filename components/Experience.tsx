import React from "react";
import { ExperienceType } from "../types";
import Section from "./Section";
import Image from "next/image";

const ExperienceCard = ({ data }: { data: ExperienceType }) => {
  return (
    <div className="flex mb-2">
      <Image
        src={data.cover_image.publicUrl}
        alt={data.title}
        width={70}
        height={70}
      />
      <div className="ml-2 text-zinc-800">
        <div className="font-medium">{data.title}</div>
        <div className="font-light">{data.duration}</div>
        <div className="font-light">{data.location}</div>
      </div>
    </div>
  );
};

export default function Experience({ data }: { data: Array<ExperienceType> }) {
  return (
    <Section className="dark:text-white">
      <h2>Experience</h2>
      <div>
        {data.map((experience: ExperienceType) => (
          <ExperienceCard data={experience} key={experience.id} />
        ))}
      </div>
    </Section>
  );
}

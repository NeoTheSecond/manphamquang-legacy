import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import Image from "next/image";
import { EducationType } from "../types";

const EducationCard = ({ data }: { data: EducationType }) => (
  <div className="flex mb-2">
    <Image
      src={data.cover_image.publicUrl}
      alt={data.title}
      width={70}
      height={70}
    />
    <div className="ml-2 text-base text-zinc-800 dark:text-cyan-50">
      <div className="font-bold">{data.title}</div>
      <div className="font-light">{data.duration}</div>
      <div className="font-light">{data.location}</div>
    </div>
  </div>
);

interface Props {
  data: Array<EducationType>;
}

export default function Education({ data }: Props) {
  return (
    <Section breaker={false}>
      <h4 className="mb-2 text-4xl text-zinc-700 dark:text-cyan-200">
        Education
      </h4>

      {data &&
        data.map((entry: EducationType) => (
          <EducationCard data={entry} key={entry.id} />
        ))}
    </Section>
  );
}

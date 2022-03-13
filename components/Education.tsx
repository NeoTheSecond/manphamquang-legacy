import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Image from "next/image";

const EDUCATIONS = gql`
  query {
    educations {
      id
      title
      duration
      location
      cover_image {
        publicUrl
      }
    }
  }
`;

interface Education {
  id: string;
  title: string;
  duration: string;
  location: string;
  cover_image: {
    publicUrl: string;
  };
}

const EducationCard = ({ data }: { data: Education }) => (
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

export default function Education() {
  const { loading, error, data } = useQuery(EDUCATIONS);

  return (
    <Section>
      <h4 className="text-4xl text-zinc-700 mb-2">Education</h4>
      {loading &&
        Array.from({ length: 2 }).map((e, i) => (
          <div key={i} className="flex mb-2 animate-pulse">
            <div className="w-[70px] h-[70px] bg-slate-200 rounded-md"></div>
            <div className="ml-2 grid grid-rows-3 gap-1">
              <div className="w-[280px] bg-slate-200 rounded"></div>
              <div className="w-[120px] bg-slate-200 rounded"></div>
              <div className="w-[160px] bg-slate-200 rounded"></div>
            </div>
          </div>
        ))}
      {data &&
        data.educations.map((entry: Education) => (
          <EducationCard data={entry} key={entry.id} />
        ))}
    </Section>
  );
}

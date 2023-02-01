import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Section from "../components/Section";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Education from "../components/Education";
import { EducationType, ExperienceType } from "../types";
import { InferGetStaticPropsType } from "next";
import { GetStaticProps } from "next";
import Experience from "../components/Experience";
import {
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

interface Props {
  educations: Array<EducationType>;
  experiences: Array<ExperienceType>;
}

const Info = ({ icon, text }: { icon: React.ReactElement; text: string }) => (
  <div className="flex space-x-2 items-center">
    {icon} <p>{text}</p>
  </div>
);

const Home: NextPage<Props> = ({ educations, experiences }) => {
  return (
    <>
      <Section className="flex">
        <div className="text-center">
          <Image
            src="/portrait.jpg"
            width={220}
            height={220}
            alt="Portrait of me"
            quality={100}
            placeholder="blur"
            blurDataURL="/portrait.jpg"
            className="rounded-full"
          />
          <div className="text-2xl font-bold">Mẫn Phạm</div>
          <div className="font-light">Web Developer</div>
        </div>
        <div className="ml-4 space-y-3">
          <Info
            icon={<AiOutlineHome className="h-6 w-6" />}
            text="Based in Vietnam"
          />
          <Info
            icon={<AiOutlineMail className="h-6 w-6" />}
            text="quangman1404@gmail.com"
          />
          <Info
            icon={<AiOutlineFacebook className="h-6 w-6" />}
            text="Facebook"
          />
          <Info
            icon={<AiOutlineInstagram className="h-6 w-6" />}
            text="Instagram"
          />
          <Info
            icon={<AiOutlineLinkedin className="h-6 w-6" />}
            text="Linkedin"
          />
        </div>
      </Section>
      <Section className="text-xl">
        <h4>
          <span className="text-3xl">👋🏻</span> Hello!
        </h4>
        <p className="font-light">
          My name is Mẫn, a Fullstack Web Developer with over 5 years of
          experience. I am also an undergraduate enrolled in Bachelor of
          Information Technology at RMIT University in Vietnam. <br />
          <br />
          Aside from the web, I have dabbled in many other tech fields like
          Machine Learning, Penetration Testing, Video Games, etc. The more
          about my work can be found in experience.
        </p>
      </Section>
      <Education data={educations} />
      <Experience data={experiences} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
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
        experiences {
          id
          title
          location
          type
          duration
          description
          technologies {
            id
            name
          }
          cover_image {
            publicUrl
          }
        }
      }
    `,
  });

  return {
    props: {
      educations: data.educations,
      experiences: data.experiences,
    },
  };
};

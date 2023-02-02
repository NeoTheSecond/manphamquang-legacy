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
  AiOutlineLink,
} from "react-icons/ai";
import { RiFolderUserLine } from "react-icons/ri";
import Link from "next/link";
import { toast } from "react-toastify";

interface Props {
  educations: Array<EducationType>;
  experiences: Array<ExperienceType>;
}

const Info = ({
  icon,
  text,
  type,
}: {
  icon: React.ReactElement;
  text: string | React.ReactElement;
  type: string;
}) => (
  <div className="flex space-x-2 items-center">
    <p className="flex space-x-2 items-center text-xl text-slate-800 dark:text-cyan-100">
      {icon}
      {`${type}: `}
    </p>
    <div className="font-semibold text-2xl">{text}</div>
  </div>
);

const Home: NextPage<Props> = ({ educations, experiences }) => {
  return (
    <>
      <Section className="flex flex-col md:flex-row">
        <div className="text-center">
          <Image
            src="/portrait.jpg"
            width={220}
            height={220}
            alt="Portrait of me"
            quality={100}
            placeholder="blur"
            blurDataURL="/portrait.jpg"
            className="rounded-full m-auto"
          />
          <div className="text-4xl mt-2 font-bold dark:text-white">
            Mẫn Phạm
          </div>
          <div className="font-light text-xl">Web Developer</div>
        </div>
        <div className="md:ml-6 mt-2 space-y-3">
          <Info
            icon={<AiOutlineHome className="h-6 w-6" />}
            text="Based in Vietnam"
            type="Location"
          />
          <Info
            icon={<AiOutlineMail className="h-6 w-6" />}
            text="quangman1404@gmail.com"
            type="Email"
          />
          <Info
            icon={<RiFolderUserLine className="h-6 w-6" />}
            text={
              <div className="flex">
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/m%E1%BA%ABn-ph%E1%BA%A1m-834428b5"
                >
                  <AiOutlineLinkedin className="h-8 w-8 hover:text-slate-600 dark:hover:text-cyan-300 cursor-pointer" />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/man.phamquang.71"
                >
                  <AiOutlineFacebook className="h-8 w-8 hover:text-slate-600 dark:hover:text-blue-300 cursor-pointer" />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/manphamquang"
                >
                  <AiOutlineInstagram className="h-8 w-8 hover:text-slate-600 dark:hover:text-rose-300 cursor-pointer" />
                </Link>
                <AiOutlineMail
                  className="h-8 w-8 hover:text-slate-600 dark:hover:text-yellow-300 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText("quangman1404@gmail.com");
                    toast("Coppied email to clipboard.");
                  }}
                />
              </div>
            }
            type="Social"
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

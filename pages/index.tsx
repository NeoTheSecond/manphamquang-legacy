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
import SpotifyPlaying from "../components/SpotifyPlaying";

interface Props {
  educations: Array<EducationType>;
  experiences: Array<ExperienceType>;
  spotify: {
    token: string;
  };
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
  <div className="flex items-center space-x-2">
    <p className="flex items-center space-x-2 text-xl text-slate-800 dark:text-cyan-100">
      {icon}
      {`${type}: `}
    </p>
    <div className="text-2xl font-semibold">{text}</div>
  </div>
);

const Home: NextPage<Props> = ({ educations, experiences, spotify }) => {
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
            className="m-auto rounded-full"
          />
          <div className="mt-2 text-4xl font-bold dark:text-white">
            Mẫn Phạm
          </div>
          <div className="text-xl font-light">Web Developer</div>
        </div>
        <div className="mt-2 space-y-3 md:ml-6">
          <Info
            icon={<AiOutlineHome className="w-6 h-6" />}
            text="Based in Vietnam"
            type="Location"
          />
          <Info
            icon={<AiOutlineMail className="w-6 h-6" />}
            text="quangman1404@gmail.com"
            type="Email"
          />
          <Info
            icon={<RiFolderUserLine className="w-6 h-6" />}
            text={
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
                  onClick={() => {
                    navigator.clipboard.writeText("quangman1404@gmail.com");
                    toast("Coppied email to clipboard.");
                  }}
                />
              </div>
            }
            type="Social"
          />
          <SpotifyPlaying spotify={spotify} />
        </div>
      </Section>
      <Section className="text-xl">
        <h4 className="text-3xl">Hello! 👋🏻</h4>
        <p className="font-light">
          My name is <b className="dark:text-cyan-100">Mẫn</b>, a Fullstack Web
          Developer with over 5 years of experience. I am also an undergraduate
          enrolled in Bachelor of Information Technology at RMIT University in
          Vietnam. <br />
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
        spotify {
          token
        }
      }
    `,
  });

  return {
    props: {
      educations: data.educations,
      experiences: data.experiences,
      spotify: data.spotify,
    },
  };
};

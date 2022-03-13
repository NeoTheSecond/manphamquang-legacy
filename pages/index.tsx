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

interface Props {
  educations: Array<EducationType>;
  experiences: Array<ExperienceType>;
}

const Home: NextPage<Props> = ({ educations, experiences }) => {
  return (
    <>
      <Section className="flex">
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
        <div className="ml-4">
          <div>Based in Vietnam</div>
          <div>quangman1404@gmail.com</div>
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Linkedin</div>
        </div>
      </Section>
      <Section>
        <h4>👋🏻 Hello!</h4>
        <p>
          My name is Mẫn, a Fullstack Web Developer with over 5 years of
          experience. I am also an undergraduate enrolled in Bachelor of
          Information Technology at RMIT University in Vietnam. <br />
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

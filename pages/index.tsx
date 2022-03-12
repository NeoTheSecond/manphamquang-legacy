import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Section from "../components/Section";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="p-2 max-w-screen-md m-auto border-2 dark:border-violet-800">
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
      <Section breaker={false}>
        <h4>Education</h4>
      </Section>
    </div>
  );
};

export default Home;

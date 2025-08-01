import React from "react";
import "./About.css";
import authorImage from "/assets/authorImg.svg";

export default function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I’m Dwayne Persaud, a passionate full-stack web developer with a
          focus on creating clean, responsive, and user-centered applications. I
          specialize in JavaScript, React, Node.js, Express, and MongoDB—and I'm
          always eager to learn and adopt new technologies that enhance my
          workflow and the user experience.
        </p>
        <p className="about__text">
          I completed my training at TripleTen, where I built multiple
          real-world projects using agile methodology, RESTful APIs, React
          Router, authentication/authorization systems, and scalable backend
          services. My experience at TripleTen helped sharpen my development
          skills and taught me how to deliver production-ready solutions.
        </p>
        <p className="about__text">
          I'm excited to bring impactful ideas to life through code—and I look
          forward to contributing to meaningful projects that solve real
          problems and elevate user interaction.
        </p>
      </div>
    </section>
  );
}

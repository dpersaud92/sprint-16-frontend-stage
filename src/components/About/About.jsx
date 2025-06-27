import React from "react";
import "./About.css";
import authorImage from "/assets/authorImg.svg";

export default function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author" className="about__image" />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Forged in late-night code sprints and fueled by ambition, this project
          marks the final chapter of my journey through the TripleTen Software
          Engineering Bootcamp — where I turned bugs into breakthroughs and
          ideas into interfaces.
        </p>
        <p className="about__description">
          TripleTen pushed me beyond the tutorials and into real-world
          problem-solving. I built this project from the ground up — learning
          how to design, code, and ship. Now, I'm ready to bring that same
          mindset to any product or team.
        </p>
      </div>
    </section>
  );
}

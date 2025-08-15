const AboutPage = () => {
  return (
    <>
      <h1 className="h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-title.png"
          alt="rick and morty"
        />
      </h1>
      <div className="flex flex-col items-center justify-center bg-[var(--bg-color)]/90 shadow-[0_0_10px_8px_var(--bg-color)] rounded">
        <p>Hi there, Earthling (or whatever dimension you&apos;re from)!</p>
        <p>
          My name is Anna, a Rick-femail from a dimension where I temporarily
          put down my portal gun and picked up React.
        </p>
        <p>
          I built this SPA with React, caffeine, occasional existential crises,
          and ADHD.
        </p>
        <p>
          Multiverse can wait. Right now I&apos;m navigating routes, not
          realities.
        </p>
        <p>If you&apos;re from a dimension where helping each other is cool:</p>
        <div>
          Check out my
          <a
            href="https://www.linkedin.com/in/anna-vasilevich-frontend/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            LinkedIn
          </a>
          (no clones, please)
        </div>
        <div>
          I&apos;m currently in the middle of the
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            RS School React Course.
          </a>
          It&apos;s like space bootcamp but for frontend devs
        </div>
      </div>
    </>
  );
};

export default AboutPage;

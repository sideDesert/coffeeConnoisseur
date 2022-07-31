import React, { useEffect } from "react";
import styles from "./Landing.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { useState } from "react";

function Landing(props) {
  const headingref = useRef();
  const headingref2 = useRef();
  const buttonref = useRef();
  const imageref = useRef();

  const [scroll, setScroll] = useState(0);
  const updateScroll = () => {
    const position = window.scrollY;
    setScroll(position);
    return position;
  };

  const onClickHandler = () => {
    props.onClickHandler();
  };

  //for parallax scrolling
  useEffect(() => {
    window.addEventListener("scroll", () => {
      updateScroll();
    });
    headingref.current.style.opacity = 1 - scroll / 460;
    headingref.current.style.position = "relative";
    headingref.current.style.top = -0.8 * Math.pow(scroll, 0.8) + "px";

    headingref2.current.style.opacity = 1 - scroll / 460;
    headingref2.current.style.position = "relative";
    headingref2.current.style.top = -0.8 * Math.pow(scroll, 0.8) + "px";

    buttonref.current.style.opacity = 1 - scroll / 460;
    buttonref.current.style.position = "relative";
    buttonref.current.style.top = -0.8 * Math.pow(scroll, 0.8) + "px";

    // imageref.current.style.transform = `scale(${1 + scroll / 460})`;
  }, [scroll]);

  return (
    <section className={styles.section}>
      <div>
        <h1 ref={headingref}>Coffee Connoisseur</h1>
        <h2 ref={headingref2}>Discover your local coffee shops!</h2>

        <button ref={buttonref} onClick={onClickHandler}>
          {props.text}
        </button>
      </div>
      <div className={styles.heroImg} ref={imageref}>
        <Image alt="hero image" src="/hero.png" width={400} height={700} />
      </div>
    </section>
  );
}

export default Landing;

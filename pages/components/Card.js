import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";

function Cards(props) {
  return (
    <div className={styles.parentContainer}>
      <Link href={props.href}>
        <a>
          <div className={styles.container}>
            <h2>{props.title}</h2>
            <div className={styles.imageContainer}>
              <Image
                alt={`Coffee Store image ${props.title}`}
                src={props.src}
                layout="fill"
                className={styles.image}
              ></Image>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Cards;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import getStores from "../../lib/getStores";
import { CoffeeStoreContext } from "../../store/Context";
import useSWR from "swr";

import styles from "./coffee-store.module.scss";

import BackIcon from "../../public/icons/back.svg";
import LocationIcon from "../../public/icons/location.svg";

export async function getStaticProps(serverProps) {
  const res = await getStores();
  let filteredData = res.find((el) => el.id === serverProps.params.id);

  return {
    props: {
      data: filteredData
        ? filteredData
        : {
            name: null,
            imgUrl: null,
            address: null,
            neighborhood: [],
          },
    },
  };
}

export async function getStaticPaths() {
  const data = await getStores();
  const paths = data.map((el) => {
    return {
      params: {
        id: el.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
const fetcher = (url) => fetch(url).then((r) => r.json());
const nullCoffeeStore = {
  name: null,
  address: null,
  neighborhood: [],
  imgUrl: null,
  likes: 0,
  id: null,
};

function Store(initialProps) {
  const router = useRouter();
  const id = router.query.id;
  const { state } = useContext(CoffeeStoreContext);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.data || nullCoffeeStore
  );
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setLikes(data[0].likes);
    }
  }, [data]);

  const handleCreateCoffeeStore = async (data) => {
    const { id, name, neighborhood, address, imgUrl } = data;
    try {
      const res = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          neighborhood: neighborhood ? neighborhood : "",
          address,
          imgUrl,
          likes: 0,
        }),
      });
      const dbCoffeeStoree = res.json();
      console.log(dbCoffeeStoree);
    } catch (err) {
      console.error("Error", err);
    }
  };

  useEffect(() => {
    if (coffeeStore.name === null) {
      if (state.stores.length !== 0) {
        let filteredData = state.stores.find((el) => el.id === id);
        if (state.stores.length > 0) {
          setCoffeeStore(filteredData);
          handleCreateCoffeeStore(filteredData);
        } else {
          console.log("Fail");
          throw new Error("No elements in context");
        }
      }
    } else {
      handleCreateCoffeeStore(coffeeStore);
    }
  }, [id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const likeHandler = () => {
    if (liked) {
      fetch("/api/favouriteCoffeeStore?id=" + coffeeStore.id + `&like=false`, {
        method: "PUT",
      });
      setLiked(false);
      setLikes((state) => state - 1);
    } else {
      fetch("/api/favouriteCoffeeStore?id=" + coffeeStore.id + `&like=true`, {
        method: "PUT",
      });
      setLiked(true);
      setLikes((state) => state + 1);
    }
  };

  return (
    <div>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div className={styles.parentContainer}>
        <Link href="/">
          <a>
            <div className={styles.back}>
              <span className={styles.icon}>
                <Image src={BackIcon} width={25} height={25} />
              </span>
              <span className={styles.text}>Go Back Home</span>
              <br />
            </div>
          </a>
        </Link>
        <div className={styles.container}>
          <h2>{coffeeStore.name}</h2>

          <div className={styles.imgContainer}>
            <Image
              layout="fill"
              src={
                coffeeStore.imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
            />
            <div className={styles.like} onClick={likeHandler}>
              <div className={`${styles.visitSite} ${liked && styles.liked}`}>
                {likes} Likes
              </div>
            </div>
          </div>
          <div className={styles.address}>
            <span className={styles.locationIcon}>
              <Image src={LocationIcon} layout="fill" />
            </span>
            <p>{coffeeStore.address || "test"}</p>
            <p>{coffeeStore.neighborhood ? coffeeStore.neighborhood : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;

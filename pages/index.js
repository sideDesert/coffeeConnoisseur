import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Landing from "../components/Landing";
import Card from "../components/Card";
import getStores from "../lib/getStores";
import useGeoLocation from "../hooks/useGeoLocation";
import { useEffect, useState, useContext } from "react";
import { CoffeeStoreContext } from "../store/Context";

export async function getStaticProps() {
  let data = await getStores();
  console.log(data);
  return {
    props: {
      data,
    },
  };
}

function StoreCardsSection({ data, location, lat = null, long = null }) {
  return (
    <section className={styles.cfsection}>
      <h1 className={styles.location}>{location} Coffee Stores</h1>
      <div className={styles["card-section"]}>
        {data.map((el, index) => (
          <div className="card-wrapper" key={el.id}>
            <Card
              title={el.name}
              src={
                data[index].imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              href={`/coffee-store/${el.id}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home(props) {
  const [showErr, setShowErr] = useState(false);
  const { crds, err, handleTrackLocation, loading } = useGeoLocation();
  const [showNearby, setShowNearby] = useState(false);
  const { state, dispatch } = useContext(CoffeeStoreContext);

  function getStoresNearby() {
    handleTrackLocation();
  }

  useEffect(() => {
    const test = async () => {
      if (crds) {
        try {
          const { latitude, longitude } = crds;
          const res = await fetch(
            `/api/getCoffeeStores?lat=${latitude}&long=${longitude}&limit=20`
          );
          const newStores = await res.json();
          dispatch({
            type: "UPDATE",
            payload: {
              stores: newStores,
              lat: latitude,
              long: longitude,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    test();
  }, [crds, dispatch]);

  useEffect(() => {
    if (err) {
      setShowErr(true);
    }
    setTimeout(() => {
      setShowErr(false);
    }, 4000);
    return clearTimeout();
  }, [err]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing
        onClickHandler={getStoresNearby}
        text={loading ? "Loading..." : "View Stores Nearby"}
      />

      {showErr && <p className="error">Something went wrong!: {err}</p>}
      <div className={styles.show}></div>
      {state.crds.lat && (
        <StoreCardsSection data={state.stores} location={"Nearby"} />
      )}

      <StoreCardsSection data={props.data} location="Toronto" />
    </div>
  );
}

import React from "react";
import "../styles/globals.css";
import Context from "../store/Context";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Context>
        <Component {...pageProps} />
        <footer style={{ background: "white", textAlign: "center" }}>
          <p>2022 Siddarth</p>
        </footer>
      </Context>
    </React.Fragment>
  );
}

export default MyApp;

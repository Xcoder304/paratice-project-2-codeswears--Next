import { useState, useEffect } from "react";
import { store } from "../Redux/app/store";
import { Provider } from "react-redux";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import Subapp from "./subapp";

import "../style/global.css";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(32);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });

  return (
    <>
      <Provider store={store}>
        <Subapp />
        <LoadingBar
          color="#FF0000"
          height={3}
          progress={progress}
          shadow={true}
          waitingTime={300}
          onLoaderFinished={() => setProgress(0)}
        />
        <Header />
        <Head>
          <title>CodesWears</title>
        </Head>
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;

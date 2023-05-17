import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/future/image";
import logo from "../public/logo.svg";
import styles from "../styles/Home.module.css";
import Todo from "../components/Todo";
import Weather from "../components/Weather";
import News from "../components/News";
import { firestore } from "../firebase";

export default function Home() {
  useEffect(() => {
    window.addEventListener("online", () => {
      window.location.reload();
    });
    // document.getElementById("gsc-i-id1").placeholder = "Search";
    return () =>
      window.removeEventListener("online", () => {
        window.location.reload();
      });
  }, []);

  useEffect(() => {
    // Initialize Firebase with your project's configuration

    const storeData = async () => {
      const currentDate = new Date(); // Get the current date and time
      const year = currentDate.getFullYear(); // Get the current year
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Get the current month (adding 1 since months are zero-based) and pad with leading zero if necessary
      const day = String(currentDate.getDate()).padStart(2, "0"); // Get the current day and pad with leading zero if necessary
      const hour = String(currentDate.getHours()).padStart(2, "0"); // Get the current hour and pad with leading zero if necessary
      const minute = String(currentDate.getMinutes()).padStart(2, "0"); // Get the current minute and pad with leading zero if necessary
      const second = String(currentDate.getSeconds()).padStart(2, "0"); // Get the current second and pad with leading zero if necessary

      const formattedDate = `${year}.${month}.${day} ${hour}:${minute}:${second}`; // Format the date string
      try {
        const data = {
          timestamp: formattedDate,
        };

        await firestore.collection("desi-search").add(data);

        console.log("Data stored successfully!");
      } catch (error) {
        console.error("Error storing data:", error);
      }
    };

    storeData();
  }, []);

  return (
    <>
      <Head>
        <title>Desi Search</title>
        <meta
          name="description"
          content="Desi Search - Your go-to search engine"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Desi Search" />
        <meta
          property="og:description"
          content="Desi Search - Your go-to search engine"
        />
        <meta property="og:image" content="/logo.jpg" />
      </Head>

      <Script
        id="search-engine"
        src="https://cse.google.com/cse.js?cx=f01b910a83b574d5c"
      ></Script>

      <Todo />
      <Weather />
      <Image src={logo} alt="Desi Search Logo" className={styles.logo} />
      <div className={styles.gcse}>
        {/* Structured data for the search box */}
        <div className="gcse-searchbox"></div>
        <div className="gcse-searchresults"></div>
      </div>
      <News />
      <button
        type="button"
        className="scroll-top"
        onClick={() => window.scrollTo(0, 0)}
      >
        Top
      </button>
    </>
  );
}

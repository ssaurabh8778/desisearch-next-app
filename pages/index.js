import Head from "next/head";
import Script from "next/script";
import Image from "next/future/image";
import logo from "../public/logo.svg";
import styles from "../styles/Home.module.css";
import Todo from "../components/Todo";
import Weather from "../components/Weather";
import News from "../components/News";
import { useEffect } from "react";

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
    return (
        <>
            <Head>
                <title>Desi Search</title>
                <meta name="description" content="Desi Search" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script
                id="search-engine"
                src="https://cse.google.com/cse.js?cx=f01b910a83b574d5c"
            ></Script>

            <Todo />
            <Weather />
            <Image src={logo} alt="logo" className={styles.logo} />
            <div className={styles.gcse}>
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

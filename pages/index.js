import Head from "next/head";
import Script from "next/script";
import Image from "next/future/image";
import logo from "../public/logo.svg";
import styles from "../styles/Home.module.css";
import Weather from "../components/Weather";

export default function Home() {
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

            <Weather className="weather"></Weather>
            <Image src={logo} alt="logo" className={styles.logo} />
            <div className="gcse">
                <div className="gcse-searchbox"></div>
                <div className="gcse-searchresults"></div>
            </div>
        </>
    );
}

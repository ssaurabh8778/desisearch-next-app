import Head from "next/head";
import Script from "next/script";
// import styles from "../styles/Home.module.css";

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
                src="https://cse.google.com/cse.js?cx=a1f1ed19fbcdf4d30"
            ></Script>

            <div className="gcse-search"></div>
        </>
    );
}

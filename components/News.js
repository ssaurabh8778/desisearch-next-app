/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import defaultNewsBg from "../assets/default-news-bg.png";
import styles from "./News.module.css";

const getUniqueId = (n) => new ShortUniqueId({ length: n })();
const News = () => {
    const [news, setNews] = useState({});
    const getNews = () => {
        // console.log("fetching news");
        fetch(
            `https://newsapi.org/v2/top-headlines?country=in&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_TOKEN}`
        )
            .then((res) => res.json())
            .then((res) => {
                setNews(res);
                // console.log(res);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.newsGrid}>
                {news?.articles?.map(
                    ({ title, description, url, urlToImage: imageUrl }) => {
                        return (
                            <a
                                href={url}
                                className={styles.news}
                                // style={{ backgroundImage: `url(${imageUrl})` }}
                                key={getUniqueId(6)}
                            >
                                <span className={styles.newsTitle}>
                                    {title}
                                </span>

                                <img
                                    src={
                                        imageUrl ? imageUrl : defaultNewsBg.src
                                    }
                                    alt={description ? description : title}
                                    className={styles.newsImage}
                                />
                            </a>
                        );
                    }
                )}
            </div>
            <span className={styles.footerMsg}>
                {news?.articles && "That's all for today. See you tomorrow."}
            </span>
        </div>
    );
};

const MemoizedNews = React.memo(News);
export default MemoizedNews;

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import defaultNewsBg from "../assets/default-news-bg.png";
import styles from "./News.module.css";

const getUniqueId = (n) => new ShortUniqueId({ length: n })();
const News = () => {
    const [news, setNews] = useState([]);
    const getNews = () => {
        // https://newsapi.org/v2/top-headlines?country=in&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_TOKEN}
        // const apiUrl = `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_TOKEN}&country=in`;
        const apiUrl = `https://inshorts.deta.dev/news?category=national`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then((res) => {
                setNews(res.data);
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
                {news?.map(
                    ({
                        title,
                        author,
                        content: description,
                        url,
                        readMoreUrl,
                        imageUrl,
                    }) => {
                        return (
                            <a
                                href={readMoreUrl ? readMoreUrl : url}
                                className={styles.news}
                                key={getUniqueId(6)}
                            >
                                <span className={styles.newsTitle}>
                                    {title} {author ? `— ${author}` : ""}
                                </span>

                                <img
                                    src={imageUrl ? imageUrl : defaultNewsBg}
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

import React, { useEffect, useState } from "react";
import styles from "./Weather.module.css";
const Weather = ({ className, ...props }) => {
    const [weather, setWeather] = useState({});
    const getWeather = (lat, lon) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa486f1b70e748f065b1ce342ffd0ff7`
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setWeather(res);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            getWeather(pos.coords.latitude, pos.coords.longitude);
        });
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.temp}>
                {Math.round(weather.main?.temp - 273.15)}°
            </span>
            <span className={styles.city}>{weather.name} </span>
            <span className={styles.weather}>
                {weather?.weather && weather.weather[0]?.description}
            </span>
        </div>
    );
};

const MemoizedWeather = React.memo(Weather);
export default MemoizedWeather;

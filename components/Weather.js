import React, { useEffect, useState } from "react";
import styles from "/styles/Weather.module.css";
const Weather = () => {
    const [weather, setWeather] = useState({});
    const fetchWeather = (lat = 28.6139, lon = 77.209) => {
        // lat and lon defaults to new delhi
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_TOKEN}`
        )
            .then((res) => res.json())
            .then((res) => {
                setWeather(res);
            })
            .catch((err) => console.log(err));
    };
    const getWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchWeather(pos.coords.latitude, pos.coords.longitude);
                },
                () => fetchWeather()
            );
        }
    };
    useEffect(() => {
        getWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container} onClick={() => getWeather()}>
            <span className={styles.temp}>
                {weather?.main
                    ? Math.round(weather.main?.temp - 273.15) + "°"
                    : "<3"}
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

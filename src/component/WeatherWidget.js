import React, { useState, useEffect } from "react";
import WeatherBox from "./WeatherBox";
import WeatherButton from "./WeatherButton";
import { Carousel } from "react-bootstrap";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({});
  const cities = [
    "Seoul",
    "Gyeonggi-do",
    "Incheon",
    "Gangwon-do",
    "Chungcheongbuk-do",
    "Chungcheongnam-do",
    "Daejeon",
    "Jeollabuk-do",
    "Jeollanam-do",
    "Gwangju",
    "Gyeongsangbuk-do",
    "Daegu",
    "Gyeongsangnam-do",
    "Busan",
    "Ulsan",
  ];

  useEffect(() => {
    const fetchWeather = async (city) => {
      const apiKey = "e7f59aaca8543637eab9ad2b801f9249";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData((prevData) => ({ ...prevData, [city]: data }));
      } catch (error) {
        console.error("날씨 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    cities.forEach((city) => fetchWeather(city));
  }, []);

  return (
    <div className="weather-widget">
      <Carousel interval={2000}>
        {cities.map((city) => (
          <Carousel.Item key={city}>
            {weatherData[city] && <WeatherBox weather={weatherData[city]} />}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default WeatherWidget;

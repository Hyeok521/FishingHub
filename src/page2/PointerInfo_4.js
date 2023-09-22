import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PointerInfo_4 = () => {
  const mapRef = useRef(null);
  const infowindowsRef = useRef([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastStart, setForecastStart] = useState(0);
  const navigate = useNavigate();

  const slideForecast = (direction) => {
    if (direction === "left" && forecastStart > 0) {
      setForecastStart(forecastStart - 1);
    } else if (direction === "right" && forecastStart < 43) {
      setForecastStart(forecastStart + 1);
    }
  };

  const fetchWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const fetchHourlyWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const showInfoOnMarker = async (lat, lng, resultAddress, marker, map) => {
    const weatherInfo = await fetchWeatherInfo(lat, lng);
    const temperature = weatherInfo.main.temp;
    const description = weatherInfo.weather[0].description;
    const humidity = weatherInfo.main.humidity;
    const content = `<div style="white-space: nowrap;">포인트 이름: ${resultAddress}<br>현재 온도: ${temperature}°C<br>현재 날씨: ${description}<br>현재 습도: ${humidity}%</div>`;
    document.querySelector(".location-info h5").innerHTML = content;

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${resultAddress}</div>`,
    });
    infowindowsRef.current.push(infowindow);
    infowindow.open(map, marker);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=63114d1a191dab97391e7908148e4784&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(36, 128),
          level: 13,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const locations = [
          { name: "구산해수욕장", lat: 36.75271, lng: 129.468 },
          { name: "고래불해수욕장", lat: 36.60001, lng: 129.4117 },
          { name: "대진해수욕장", lat: 36.565, lng: 129.4269 },
          { name: "경정2리 차유 돔바위", lat: 36.41505, lng: 129.3657 },
          { name: "영덕 동명축양장", lat: 36.45543, lng: 129.4354 },
          { name: "영덕 노물", lat: 36.45182, lng: 129.4295 },
          { name: "영덕 강구 하저", lat: 36.40229, lng: 129.3985 },
        ];

        locations.forEach((location) => {
          const position = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
          );
          const marker = new window.kakao.maps.Marker({
            position,
            map: map,
          });

          window.kakao.maps.event.addListener(
            marker,
            "click",
            async function () {
              infowindowsRef.current.forEach((info) => info.close());

              showInfoOnMarker(
                position.getLat(),
                position.getLng(),
                location.name,
                marker,
                map
              );

              const hourlyWeatherInfo = await fetchHourlyWeatherInfo(
                position.getLat(),
                position.getLng()
              );
              setHourlyForecast(hourlyWeatherInfo.list.slice(0, 48));
            }
          );
        });
        // 지도 형식 변경 버튼을 추가합니다.
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        // 확대/축소 컨트롤을 추가합니다.
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };
  }, []);

  const goToPointerInformation = () => {
    navigate("/PointerInformation");
  };
  const goToPointerInfo1 = () => {
    navigate("/PointerInfo_1");
  };
  const goToPointerInfo2 = () => {
    navigate("/PointerInfo_2");
  };
  const goToPointerInfo3 = () => {
    navigate("/PointerInfo_3");
  };
  const goToPointerInfo5 = () => {
    navigate("/PointerInfo_5");
  };
  const goToPointerInfo6 = () => {
    navigate("/PointerInfo_6");
  };
  const goToPointerInfo7 = () => {
    navigate("/PointerInfo_7");
  };
  const goToPointerInfo8 = () => {
    navigate("/PointerInfo_8");
  };

  return (
    <div className="weatherinfo">
      <h4>포인트 정보(동해남부권)</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button onClick={goToPointerInformation}>전체</button>
            <button onClick={goToPointerInfo1}>서해중부권</button>
            <button onClick={goToPointerInfo2}>서해남부권</button>
            <button onClick={goToPointerInfo3}>동해중부권</button>
            <button>동해남부권</button>
            <button onClick={goToPointerInfo5}>남해서부권</button>
            <button onClick={goToPointerInfo6}>남해중부권</button>
            <button onClick={goToPointerInfo7}>남해동부권</button>
            <button onClick={goToPointerInfo8}>제주권</button>
          </div>
          <div className="map-container">
            <div className="map" id="kakao-map"></div>
          </div>
        </div>
        <div className="info-bottom">
          <div className="location-info">
            <h5></h5>
          </div>
          <div className="hourly-forecast-slider">
            <h5>일기 예보</h5>
            <div className="slider-container">
              <button
                className="forecast-button"
                onClick={() => slideForecast("left")}
              >
                &lt;
              </button>
              <div className="hourly-forecast">
                {hourlyForecast
                  .slice(forecastStart, forecastStart + 5)
                  .map((forecast, index) => (
                    <div key={index} className="forecast-item">
                      <div>
                        {`${
                          new Date(forecast.dt * 1000).getMonth() + 1
                        }월 ${new Date(
                          forecast.dt * 1000
                        ).getDate()}일 ${new Date(
                          forecast.dt * 1000
                        ).getHours()}시`}
                      </div>
                      <div>{forecast.main.temp}°C</div>
                      <div>{forecast.weather[0].description}</div>
                      <div>{forecast.main.humidity}%</div>
                    </div>
                  ))}
              </div>
              <button
                className="forecast-button"
                onClick={() => slideForecast("right")}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointerInfo_4;

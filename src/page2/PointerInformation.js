import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PointerInformation = () => {
  const mapRef = useRef(null);
  const infowindowsRef = useRef([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastStart, setForecastStart] = useState(0);
  const navigate = useNavigate();

  // 슬라이드 방향에 따라 예보 시작 지점을 조정합니다.
  const slideForecast = (direction) => {
    if (direction === "left" && forecastStart > 0) {
      setForecastStart(forecastStart - 1);
    } else if (direction === "right" && forecastStart < 43) {
      setForecastStart(forecastStart + 1);
    }
  };

  // 현재 날씨 정보를 가져오는 함수입니다.
  const fetchWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  // 시간별 날씨 정보를 가져오는 함수입니다.
  const fetchHourlyWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  // 마커 위에 정보를 표시하는 함수입니다.
  const showInfoOnMarker = async (lat, lng, resultAddress, marker, map) => {
    const weatherInfo = await fetchWeatherInfo(lat, lng);
    const temperature = weatherInfo.main.temp;
    const description = weatherInfo.weather[0].description;
    const humidity = weatherInfo.main.humidity;
    const content = `<div style="white-space: nowrap;">포인트 이름: ${resultAddress}<br>현재 온도: ${temperature}°C<br>현재 날씨: ${description}<br>현재 습도: ${humidity}%</div>`;

    // 지도 아래에 위치 정보 표시
    document.querySelector(".location-info h5").innerHTML = content;

    // 마커 위에 이름만 표시
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${resultAddress}</div>`,
    });
    infowindowsRef.current.push(infowindow);
    infowindow.open(map, marker);
  };

  useEffect(() => {
    // 카카오 맵 API 스크립트를 로드합니다.
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
          level: 12,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        // '시화방조제'의 위치에 마커를 추가
        const sihwaBreakwater = new window.kakao.maps.LatLng(37.3475, 126.5873);
        const markerForSihwa = new window.kakao.maps.Marker({
          position: sihwaBreakwater,
          map: map,
        });

        // '시화방조제' 마커 클릭 시 정보 표시 및 날씨 예보 표시
        window.kakao.maps.event.addListener(
          markerForSihwa,
          "click",
          async function () {
            // 이전 정보창들을 모두 닫습니다.
            infowindowsRef.current.forEach((info) => info.close());

            showInfoOnMarker(
              sihwaBreakwater.getLat(),
              sihwaBreakwater.getLng(),
              "시화방조제",
              markerForSihwa,
              map
            );

            const hourlyWeatherInfoForSihwa = await fetchHourlyWeatherInfo(
              sihwaBreakwater.getLat(),
              sihwaBreakwater.getLng()
            );
            setHourlyForecast(hourlyWeatherInfoForSihwa.list.slice(0, 48));
          }
        );

        // '정성바다낚시터'의 위치에 마커를 추가
        const jeongseongFishingSpot = new window.kakao.maps.LatLng(
          37.4922,
          126.5312
        );
        const markerForJeongseong = new window.kakao.maps.Marker({
          position: jeongseongFishingSpot,
          map: map,
        });

        // '정성바다낚시터' 마커 클릭 시 정보 표시 및 날씨 예보 표시
        window.kakao.maps.event.addListener(
          markerForJeongseong,
          "click",
          async function () {
            // 이전 정보창들을 모두 닫습니다.
            infowindowsRef.current.forEach((info) => info.close());

            showInfoOnMarker(
              jeongseongFishingSpot.getLat(),
              jeongseongFishingSpot.getLng(),
              "정성바다낚시터",
              markerForJeongseong,
              map
            );

            const hourlyWeatherInfoForJeongseong = await fetchHourlyWeatherInfo(
              jeongseongFishingSpot.getLat(),
              jeongseongFishingSpot.getLng()
            );
            setHourlyForecast(hourlyWeatherInfoForJeongseong.list.slice(0, 48));
          }
        );

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

  const goToPointerInfo1 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_1 페이지로 이동합니다.
  };
  const goToPointerInfo2 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_2 페이지로 이동합니다.
  };
  const goToPointerInfo3 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_3 페이지로 이동합니다.
  };
  const goToPointerInfo4 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_4 페이지로 이동합니다.
  };
  const goToPointerInfo5 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_5 페이지로 이동합니다.
  };
  const goToPointerInfo6 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_6 페이지로 이동합니다.
  };
  const goToPointerInfo7 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_7 페이지로 이동합니다.
  };
  const goToPointerInfo8 = () => {
    navigate("/PointerInfo_1"); // PointerInfo_8 페이지로 이동합니다.
  };
  return (
    <div className="weatherinfo">
      <h4>포인트 정보</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button>전체</button>
            <button onClick={goToPointerInfo1}>서해중부권</button>
            <button onClick={goToPointerInfo2}>서해남부권</button>
            <button onClick={goToPointerInfo3}>동해중부권</button>
            <button onClick={goToPointerInfo4}>동해남부권</button>
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

export default PointerInformation;

import React, { useEffect, useRef, useState } from "react";

const WeatherInformation = () => {
  const searchRef = useRef(null);
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowsRef = useRef([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastStart, setForecastStart] = useState(0);

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

  // 정보 창을 토글하는 함수입니다.
  const toggleInfoWindow = (map, marker, infowindow) => {
    if (infowindow.getMap()) {
      infowindow.close();
    } else {
      infowindow.open(map, marker);
    }
  };

  // 마커 위에 정보를 표시하는 함수입니다.
  const showInfoOnMarker = async (lat, lng, resultAddress, marker, map) => {
    const weatherInfo = await fetchWeatherInfo(lat, lng);
    const temperature = weatherInfo.main.temp;
    const description = weatherInfo.weather[0].description;
    const humidity = weatherInfo.main.humidity;
    const content = `<div style="white-space: nowrap;">지번 주소: ${resultAddress}<br>온도: ${temperature}°C<br>날씨: ${description}<br>습도: ${humidity}%</div>`;
    const infowindow = new window.kakao.maps.InfoWindow({
      content,
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
        placesRef.current = new window.kakao.maps.services.Places();

        // 지도를 클릭했을 때의 이벤트 핸들러입니다.
        window.kakao.maps.event.addListener(
          map,
          "click",
          async function (mouseEvent) {
            markersRef.current.forEach((marker) => marker.setMap(null));
            infowindowsRef.current.forEach((info) => info.close());
            markersRef.current = [];
            infowindowsRef.current = [];

            const latlng = mouseEvent.latLng;
            const marker = new window.kakao.maps.Marker({ position: latlng });
            marker.setMap(map);
            markersRef.current.push(marker);

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              latlng.getLng(),
              latlng.getLat(),
              async function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  showInfoOnMarker(
                    latlng.getLat(),
                    latlng.getLng(),
                    result[0].address.address_name,
                    marker,
                    map
                  );

                  // 시간별 날씨 정보를 가져옵니다.
                  const hourlyWeatherInfo = await fetchHourlyWeatherInfo(
                    latlng.getLat(),
                    latlng.getLng()
                  );
                  setHourlyForecast(hourlyWeatherInfo.list.slice(0, 48));
                }
              }
            );
          }
        );
      });
    };
  }, []);

  // 검색어를 입력하여 해당 지역의 날씨 정보를 가져옵니다.
  const searchPlaces = () => {
    const keyword = searchRef.current.value;

    placesRef.current.keywordSearch(keyword, async (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        infowindowsRef.current.forEach((info) => info.close());
        markersRef.current = [];
        infowindowsRef.current = [];

        const bounds = new window.kakao.maps.LatLngBounds();

        for (const result of results) {
          const coords = new window.kakao.maps.LatLng(result.y, result.x);
          bounds.extend(coords);

          const marker = new window.kakao.maps.Marker({
            position: coords,
          });
          marker.setMap(mapRef.current);
          markersRef.current.push(marker);

          // 마커를 클릭했을 때의 이벤트 핸들러입니다.
          window.kakao.maps.event.addListener(
            marker,
            "click",
            async function () {
              // 이전 정보창들을 모두 닫습니다.
              infowindowsRef.current.forEach((info) => info.close());
              showInfoOnMarker(
                result.y,
                result.x,
                result.address_name,
                marker,
                mapRef.current
              );

              const hourlyWeatherInfoForSearch = await fetchHourlyWeatherInfo(
                result.y,
                result.x
              );
              setHourlyForecast(hourlyWeatherInfoForSearch.list.slice(0, 48));
            }
          );

          mapRef.current.setBounds(bounds);
        }
      } else {
        alert("검색 결과가 존재하지 않습니다.");
      }
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      searchPlaces();
    }
  };

  return (
    <div className="weatherinfo">
      <h4>날씨 정보</h4>
      <div className="info-container">
        <div className="hourly-forecast-slider">
          <button onClick={() => slideForecast("left")}>&lt;</button>
          <div className="hourly-forecast">
            {hourlyForecast
              .slice(forecastStart, forecastStart + 5)
              .map((forecast, index) => (
                <div key={index} className="forecast-item">
                  <div>
                    {`${
                      new Date(forecast.dt * 1000).getMonth() + 1
                    }월 ${new Date(forecast.dt * 1000).getDate()}일 ${new Date(
                      forecast.dt * 1000
                    ).getHours()}시`}
                  </div>
                  <div>{forecast.main.temp}°C</div>
                  <div>{forecast.weather[0].description}</div>
                  <div>{forecast.main.humidity}%</div>
                </div>
              ))}
          </div>
          <button onClick={() => slideForecast("right")}>&gt;</button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="지역 검색..."
            ref={searchRef}
            onKeyUp={handleKeyUp}
          />
          <button onClick={searchPlaces}>검색</button>
        </div>
      </div>
      <div className="map" id="kakao-map"></div>
    </div>
  );
};

export default WeatherInformation;

import React, { useEffect, useRef, useState } from "react";

const WeatherInformation = () => {
  const searchRef = useRef(null);
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const markersRef = useRef([]);
  const [placeInfo, setPlaceInfo] = useState(null);

  // OpenWeatherMap API를 사용하여 날씨 정보를 가져오는 함수
  const fetchWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Kakao Map SDK 스크립트 로드
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

        // 지도 클릭 이벤트 리스너
        window.kakao.maps.event.addListener(
          map,
          "click",
          async function (mouseEvent) {
            // 기존 마커 제거
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];

            const latlng = mouseEvent.latLng;
            const marker = new window.kakao.maps.Marker({ position: latlng });
            marker.setMap(map);
            markersRef.current.push(marker);

            // 클릭한 위치의 주소 정보 및 날씨 정보 가져오기
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              latlng.getLng(),
              latlng.getLat(),
              async function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  const weatherInfo = await fetchWeatherInfo(
                    latlng.getLat(),
                    latlng.getLng()
                  );
                  const temperature = weatherInfo.main.temp;
                  const description = weatherInfo.weather[0].description;
                  const content = `<div>지번 주소: ${result[0].address.address_name}<br>온도: ${temperature}°C<br>날씨: ${description}</div>`;
                  setPlaceInfo(content);
                }
              }
            );
          }
        );
      });
    };
  }, []);

  // 검색 기능: 입력된 키워드로 위치를 검색하고 해당 위치에 마커를 표시하는 함수
  const searchPlaces = () => {
    const keyword = searchRef.current.value;

    placesRef.current.keywordSearch(keyword, async (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 기존 마커 제거
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        const bounds = new window.kakao.maps.LatLngBounds();

        for (const result of results) {
          const coords = new window.kakao.maps.LatLng(result.y, result.x);
          bounds.extend(coords);

          const marker = new window.kakao.maps.Marker({
            position: coords,
          });
          marker.setMap(mapRef.current);
          markersRef.current.push(marker);

          // 날씨 정보 가져오기
          const weatherInfo = await fetchWeatherInfo(result.y, result.x);
          const temperature = weatherInfo.main.temp;
          const description = weatherInfo.weather[0].description;
          const content = `<div>지번 주소: ${result.address_name}<br>온도: ${temperature}°C<br>날씨: ${description}</div>`;
          setPlaceInfo(content);
        }

        mapRef.current.setBounds(bounds);
      } else {
        alert("검색 결과가 존재하지 않습니다.");
      }
    });
  };

  return (
    <div className="weatherinfo">
      <h4>날씨 정보</h4>
      <input type="text" placeholder="지역 검색..." ref={searchRef} />
      <button onClick={searchPlaces}>검색</button>
      <div className="map" id="kakao-map"></div>
      {placeInfo && (
        <div
          className="place-info"
          dangerouslySetInnerHTML={{ __html: placeInfo }}
        />
      )}
    </div>
  );
};

export default WeatherInformation;

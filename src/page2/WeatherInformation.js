import React, { useEffect, useRef, useState } from "react";

const WeatherInformation = () => {
  const searchRef = useRef(null);
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const markersRef = useRef([]);
  const [placeInfo, setPlaceInfo] = useState(null);

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
          level: 12,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
        placesRef.current = new window.kakao.maps.services.Places();

        // 지도 클릭 이벤트
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            // 기존 마커들 제거
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];

            // 클릭한 위치에 마커 생성
            const latlng = mouseEvent.latLng;
            const marker = new window.kakao.maps.Marker({
              position: latlng,
            });
            marker.setMap(map);
            markersRef.current.push(marker);

            // 클릭한 위치의 정보 가져오기
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              latlng.getLng(),
              latlng.getLat(),
              function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  const detailAddr = !!result[0].road_address
                    ? `<br>도로명주소 : ${result[0].road_address.address_name}`
                    : "";
                  const content = `<div>지번 주소 : ${result[0].address.address_name}${detailAddr}</div>`;
                  setPlaceInfo(content);
                }
              }
            );
          }
        );

        const searchPlaces = () => {
          const keyword = searchRef.current.value;

          placesRef.current.keywordSearch(keyword, (results, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              // 기존 마커들 제거
              markersRef.current.forEach((marker) => marker.setMap(null));
              markersRef.current = [];

              const bounds = new window.kakao.maps.LatLngBounds();

              results.forEach((result) => {
                const coords = new window.kakao.maps.LatLng(result.y, result.x);
                bounds.extend(coords);

                // 마커 생성 및 지도에 표시
                const marker = new window.kakao.maps.Marker({
                  position: coords,
                });
                marker.setMap(map);
                markersRef.current.push(marker);
              });

              // 지도의 범위를 조정하여 모든 마커가 보이게 함
              map.setBounds(bounds);

              // 위치 정보 초기화
              setPlaceInfo(null);
            } else {
              alert("검색 결과가 존재하지 않습니다.");
            }
          });
        };

        searchRef.current.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            searchPlaces();
          }
        });
      });
    };
  }, []);

  return (
    <div className="weatherinfo">
      <h4>날씨 정보</h4>
      <input type="text" placeholder="지역 검색..." ref={searchRef} />
      <button
        onClick={() => {
          if (!placesRef.current) {
            alert(
              "검색 서비스가 초기화되지 않았습니다. 잠시 후 다시 시도해주세요."
            );
            return;
          }

          const keyword = searchRef.current.value;
          placesRef.current.keywordSearch(keyword, (results, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              // 기존 마커들 제거
              markersRef.current.forEach((marker) => marker.setMap(null));
              markersRef.current = [];

              const bounds = new window.kakao.maps.LatLngBounds();

              results.forEach((result) => {
                const coords = new window.kakao.maps.LatLng(result.y, result.x);
                bounds.extend(coords);

                // 마커 생성 및 지도에 표시
                const marker = new window.kakao.maps.Marker({
                  position: coords,
                });
                marker.setMap(mapRef.current);
                markersRef.current.push(marker);
              });

              // 지도의 범위를 조정하여 모든 마커가 보이게 함
              mapRef.current.setBounds(bounds);

              // 위치 정보 초기화
              setPlaceInfo(null);
            } else {
              alert("검색 결과가 존재하지 않습니다.");
            }
          });
        }}
      >
        검색
      </button>
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

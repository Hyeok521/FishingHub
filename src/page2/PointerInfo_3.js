import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PointerInfo_3 = () => {
  const mapRef = useRef(null);
  const infowindowsRef = useRef([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastStart, setForecastStart] = useState(0);
  const [markerInfos, setMarkerInfos] = useState([]);
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

  const showInfoOnMarker = async (
    lat,
    lng,
    resultAddress,
    marker,
    map,
    index
  ) => {
    const weatherInfo = await fetchWeatherInfo(lat, lng);
    const temperature = weatherInfo.main.temp;
    const description = weatherInfo.weather[0].description;
    const humidity = weatherInfo.main.humidity;
    const content = `<div style="white-space: nowrap;">포인트 이름: ${resultAddress}<br>현재 온도: ${temperature}°C<br>현재 날씨: ${description}<br>현재 습도: ${humidity}%</div>`;
    document.querySelector(".location-info h5").innerHTML = content;

    const markerData = locations[index];
    setMarkerInfos([{ images: markerData.image, texts: markerData.text }]);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${resultAddress}</div>`,
    });
    infowindowsRef.current.push(infowindow);
    infowindow.open(map, marker);
  };

  const locations = [
    {
      name: "속초 봉포방파제",
      lat: 38.25133,
      lng: 128.5695,
      image: [
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/xlg7rc.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/6LG5AA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/mWxsV2.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "먹이: 육식성(작은 갑각류)",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "황어",
            "먹이: 수서곤충, 작은 물고기, 부착 조류 등을 먹는다.",
            "크기: 최대 45cm",
            "서식지: 동해 전 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "속초 동명방파제",
      lat: 38.20923,
      lng: 128.6022,
      image: [
        {
          url: "https://ifh.cc/g/l2pp5q.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/xlg7rc.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "임연수어",
            "먹이: 어류, 새우류, 게류, 오징어류 등",
            "크기: 최대 50cm",
            "서식지: 수심 100~200m 사이의 바위나 자갈로 된 암초 지대",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "먹이: 육식성(작은 갑각류)",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "먹이: 작은 갑각류",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "주문진 방파제",
      lat: 37.89069,
      lng: 128.8326,
      image: [
        {
          url: "https://ifh.cc/g/l2pp5q.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/6LG5AA.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "임연수어",
            "먹이: 어류, 새우류, 게류, 오징어류 등",
            "크기: 최대 50cm",
            "서식지: 수심 100~200m 사이의 바위나 자갈로 된 암초 지대",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "먹이: 작은 갑각류",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "황어",
            "먹이: 수서곤충, 작은 물고기, 부착 조류 등을 먹는다.",
            "크기: 최대 45cm",
            "서식지: 동해 전 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "강릉 사천진해수욕장",
      lat: 37.8426,
      lng: 128.8746,
      image: [
        {
          url: "https://ifh.cc/g/f6gOgF.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/drtVqn.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/mWxsV2.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "망상어",
            "먹이: 갯지렁이류 등 펄바닥의 작은 동물",
            "크기: 최대 25cm",
            "서식지: 전 연안 수심 30m 정도의 얕은 바다",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "우럭",
            "먹이: 주로 작은 크기의 어류, 갑각류, 두족류 등을 섭식한다.",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "덕산항",
      lat: 37.37786,
      lng: 129.2549,
      image: [
        {
          url: "https://ifh.cc/g/f6gOgF.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/GJy563.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/2wkK79.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "망상어",
            "먹이: 갯지렁이류 등 펄바닥의 작은 동물",
            "크기: 최대 25cm",
            "서식지: 전 연안 수심 30m 정도의 얕은 바다",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "벵에돔",
            "먹이: 겨울에는 주로 해조류를 먹으며, 여름에는 작은 동물 등을 잡아먹는다.",
            "크기: 최대 60cm",
            "서식지: 동해와 남해, 제주도 연안 해역",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "고등어",
            "먹이: 부유성 갑각류, 오징어, 작은 어류 등을 주로 먹는다.",
            "크기: 최대 30cm",
            "금어기: 4~6월",
            "금지체장: 21cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "전갱이",
            "먹이: 잡식성",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m의 연안이나 외양",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "먹이: 작은 갑각류",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "장호항",
      lat: 37.28852,
      lng: 129.3175,
      image: [
        {
          url: "https://ifh.cc/g/l2pp5q.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/Xq37Sd.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "임연수어",
            "먹이: 어류, 새우류, 게류, 오징어류 등",
            "크기: 최대 50cm",
            "서식지: 수심 100~200m 사이의 바위나 자갈로 된 암초 지대",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "벵에돔",
            "먹이: 겨울에는 주로 해조류를 먹으며, 여름에는 작은 동물 등을 잡아먹는다.",
            "크기: 최대 60cm",
            "서식지: 동해와 남해, 제주도 연안 해역",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "대구",
            "먹이: 먹이는 어류가 주를 이루며, 두족류, 갑각류 등을 가리지 않고 섭이",
            "크기: 최대 119cm",
            "서식지: 연안 또는 대륙사면",
            "금어기: 1월16일~2월15일",
            "금지체장: 35cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "임원항",
      lat: 37.22949,
      lng: 129.3461,
      image: [
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/TylZN4.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/6LG5AA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/mWxsV2.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "벵에돔",
            "먹이: 겨울에는 주로 해조류를 먹으며, 여름에는 작은 동물 등을 잡아먹는다.",
            "크기: 최대 60cm",
            "서식지: 동해와 남해, 제주도 연안 해역",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "용치놀래기",
            "먹이: 잡식성으로 갯지렁이류, 조개류, 새우류 등 동물성 먹이 뿐만 아니라 알 등도 먹는다.",
            "크기: 최대 34cm",
            "서식지: 수심이 얕은 사질 및 암반 연안해역에 서식",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "황어",
            "먹이: 수서곤충, 작은 물고기, 부착 조류 등을 먹는다.",
            "크기: 최대 45cm",
            "서식지: 동해 전 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
  ];

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

        locations.forEach((location, index) => {
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
                map,
                index
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

  const goToPointerInfo1 = () => {
    navigate("/PointerInfo_1");
  };
  const goToPointerInfo2 = () => {
    navigate("/PointerInfo_2");
  };
  const goToPointerInfo4 = () => {
    navigate("/PointerInfo_4");
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
      <h4>포인트 정보(동해중부권)</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button onClick={goToPointerInfo1}>서해중부권</button>
            <button onClick={goToPointerInfo2}>서해남부권</button>
            <button>동해중부권</button>
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
        <h4 className="mainfish">주요 포획 어종</h4>
        <div className="fishinfo-1">
          {markerInfos.map((info, index) => (
            <div key={index}>
              {info.images.map((image, imageIndex) => (
                <Card
                  key={imageIndex}
                  style={{
                    backgroundColor: "lightblue",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "70px",
                    width: "1200px",
                    height: "300px",
                  }}
                >
                  <Card.Img
                    variant="right"
                    src={image.url}
                    style={{ width: "600px" }}
                  />
                  <Card.Body>
                    {info.texts &&
                      info.texts[imageIndex] &&
                      (Array.isArray(info.texts[imageIndex].content) ? (
                        info.texts[imageIndex].content.map(
                          (text, textIndex) => (
                            <Card.Text
                              key={textIndex}
                              style={info.texts[imageIndex].style[textIndex]}
                            >
                              {text}
                            </Card.Text>
                          )
                        )
                      ) : (
                        <Card.Text style={info.texts[imageIndex].style}>
                          {info.texts[imageIndex].content}
                        </Card.Text>
                      ))}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointerInfo_3;

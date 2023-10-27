import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PointerInfo_8 = () => {
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
    const API_KEY = process.env.REACT_APP_WeatherApi;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const fetchHourlyWeatherInfo = async (lat, lng) => {
    const API_KEY = process.env.REACT_APP_WeatherApi;
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
      name: "애월방파제",
      lat: 33.46875,
      lng: 126.3238,
      image: [
        {
          url: "https://ifh.cc/g/DDvn5g.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZVkFcV.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/yq3SSQ.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/adfgp1.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/4mxQ2D.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/sk5wxr.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/SgyQQP.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "돌돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이",
            "크기: 약 40cm",
            "서식지: 전 연안 암초지역",
            "금지체장: 24cm",
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
            "벵에돔",
            "미끼: 크릴",
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
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
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
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
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
            "자리돔",
            "미끼: 오징어, 한치",
            "크기: 최대 17cm",
            "서식지: 수심 2~15m의 산호초와 암초가 있는 연안이나 외해",
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
            "오징어",
            "미끼: 루어",
            "크기: 최대 15.2m",
            "서식지: 연안에서 심해",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "학꽁치",
            "미끼: 곤쟁이크릴",
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
            "부시리",
            "미끼: 전갱이",
            "크기: 최대 100cm 이상",
            "서식지: 연안의 수면 가까이",
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
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
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
            "독가시치",
            "미끼: 새우, 갯지렁이",
            "크기: 최대 40cm",
            "서식지: 연안의 얕은 암초 지역",
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
      name: "도두방파제",
      lat: 33.50874,
      lng: 126.4638,
      image: [
        {
          url: "https://ifh.cc/g/DDvn5g.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZVkFcV.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/adfgp1.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/SgyQQP.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZrZAGp.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/sk5wxr.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "돌돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이",
            "크기: 약 40cm",
            "서식지: 전 연안 암초지역",
            "금지체장: 24cm",
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
            "벵에돔",
            "미끼: 크릴",
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
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
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
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
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
            "오징어",
            "미끼: 루어",
            "크기: 최대 15.2m",
            "서식지: 연안에서 심해",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "학꽁치",
            "미끼: 곤쟁이크릴",
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
            "독가시치",
            "미끼: 새우, 갯지렁이",
            "크기: 최대 40cm",
            "서식지: 연안의 얕은 암초 지역",
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
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
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
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "서부두방파제",
      lat: 33.52282,
      lng: 126.5302,
      image: [
        {
          url: "https://ifh.cc/g/DDvn5g.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZVkFcV.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/yq3SSQ.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/adfgp1.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/sk5wxr.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/4mxQ2D.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "돌돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이",
            "크기: 약 40cm",
            "서식지: 전 연안 암초지역",
            "금지체장: 24cm",
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
            "벵에돔",
            "미끼: 크릴",
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
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
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
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
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
            "자리돔",
            "미끼: 오징어, 한치",
            "크기: 최대 17cm",
            "서식지: 수심 2~15m의 산호초와 암초가 있는 연안이나 외해",
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
            "오징어",
            "미끼: 루어",
            "크기: 최대 15.2m",
            "서식지: 연안에서 심해",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "학꽁치",
            "미끼: 곤쟁이크릴",
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
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
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
            "부시리",
            "미끼: 전갱이",
            "크기: 최대 100cm 이상",
            "서식지: 연안의 수면 가까이",
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
      name: "김녕방파제",
      lat: 33.56067,
      lng: 126.7389,
      image: [
        {
          url: "https://ifh.cc/g/DDvn5g.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZVkFcV.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/yq3SSQ.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/adfgp1.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/sk5wxr.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/SgyQQP.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "돌돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이",
            "크기: 약 40cm",
            "서식지: 전 연안 암초지역",
            "금지체장: 24cm",
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
            "벵에돔",
            "미끼: 크릴",
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
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
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
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
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
            "자리돔",
            "미끼: 오징어, 한치",
            "크기: 최대 17cm",
            "서식지: 수심 2~15m의 산호초와 암초가 있는 연안이나 외해",
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
            "오징어",
            "미끼: 루어",
            "크기: 최대 15.2m",
            "서식지: 연안에서 심해",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "학꽁치",
            "미끼: 곤쟁이크릴",
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
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
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
            "독가시치",
            "미끼: 새우, 갯지렁이",
            "크기: 최대 40cm",
            "서식지: 연안의 얕은 암초 지역",
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
      name: "위미방파제",
      lat: 33.26826,
      lng: 126.6633,
      image: [
        {
          url: "https://ifh.cc/g/DDvn5g.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZVkFcV.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/yq3SSQ.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/adfgp1.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/5T5sWA.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/4mxQ2D.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/SgyQQP.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "돌돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이",
            "크기: 약 40cm",
            "서식지: 전 연안 암초지역",
            "금지체장: 24cm",
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
            "벵에돔",
            "미끼: 크릴",
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
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
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
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
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
            "자리돔",
            "미끼: 오징어, 한치",
            "크기: 최대 17cm",
            "서식지: 수심 2~15m의 산호초와 암초가 있는 연안이나 외해",
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
            "오징어",
            "미끼: 오징어, 한치",
            "크기: 최대 15.2m",
            "서식지: 연안에서 심해",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "학꽁치",
            "미끼: 곤쟁이크릴",
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
            "부시리",
            "미끼: 전갱이",
            "크기: 최대 100cm 이상",
            "서식지: 연안의 수면 가까이",
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
            "독가시치",
            "미끼: 새우, 갯지렁이",
            "크기: 최대 40cm",
            "서식지: 연안의 얕은 암초 지역",
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
      name: "서귀포 범섬",
      lat: 33.21784,
      lng: 126.5168,
      image: [
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/DDvn5g.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZVkFcV.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/4kPXWY.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/drtVqn.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "벵에돔",
            "미끼: 크릴",
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
            "돌돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이",
            "크기: 약 40cm",
            "서식지: 전 연안 암초지역",
            "금지체장: 24cm",
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
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
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
            "쥐치",
            "미끼: 갯지렁이, 곤쟁이크릴",
            "크기: 최대 20cm",
            "서식지: 수심 100m의 암초지대",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
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
      ],
    },
    {
      name: "제주도 형제섬",
      lat: 33.20999,
      lng: 126.3143,
      image: [
        {
          url: "https://ifh.cc/g/fF9QVa.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/H8MdAw.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/4kPXWY.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/KKLSxz.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/drtVqn.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "벵에돔",
            "미끼: 크릴",
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
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
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
            "쥐치",
            "미끼: 갯지렁이, 곤쟁이크릴",
            "크기: 최대 20cm",
            "서식지: 수심 100m의 암초지대",
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
            "볼락",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 35cm",
            "서식지: 아열대 해역",
            "금지체장: 15cm",
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
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
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
      ],
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_Kakao_Map}&libraries=services&autoload=false`;
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
  const goToPointerInfo3 = () => {
    navigate("/PointerInfo_3");
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

  return (
    <div className="weatherinfo">
      <h4>포인트 정보(제주권)</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button onClick={goToPointerInfo1}>서해중부권</button>
            <button onClick={goToPointerInfo2}>서해남부권</button>
            <button onClick={goToPointerInfo3}>동해중부권</button>
            <button onClick={goToPointerInfo4}>동해남부권</button>
            <button onClick={goToPointerInfo5}>남해서부권</button>
            <button onClick={goToPointerInfo6}>남해중부권</button>
            <button onClick={goToPointerInfo7}>남해동부권</button>
            <button>제주권</button>
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

export default PointerInfo_8;

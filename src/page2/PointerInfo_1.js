import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PointerInfo_1 = () => {
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
      name: "정성바다낚시터",
      lat: 37.51516,
      lng: 126.5441,
      image: [
        {
          url: "https://i.namu.wiki/i/xi6-R5UE9X8JgE33VqYzZuSA8Aub88--jJ-2axTqMoxl7GY2ympq04w5gNBUk9Grc0uB4bQoKTKRs-0Ma-YqmToWZ2j7WvQBwX3IDTkKpfFdo5NHqGKd0n0g0uyoPN_Cgxe4Vty_7DzSX3oYUJNTbA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/78Hh0rw8DWD_SNeWQdIWOAjPbzbwZxdldpx5faT-SA8P7Nfn0gt3rOEgyrKYhBlqgJadlcXZqwDfiYBfoZNnCZkgFz0sl5bgL_QB42oMuziuqU5BIfYK0CC7xQfYk-nIaHMm6GUqYzJ6oQCLOSISJA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ie3jBXDHm6X6BYTUTTWmw0ntEBdn5gYxIPZsVQwe9yl5_aJWR7pdYkzz1V5jtUQHeMdhfy1Cx4AqCSdjQMbxzPsus60Obvg9HVkuNBU7Te857qaBeFAF2UMZpFx0jCMZlJGbqa9LTncvCz2Ekim0Tw.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/i3_iJbB0KlB2mhyT5TV0DgtjpT2Ar1RBqjRgsVpMeCwkxmgpbTCffHwU0zmbkYqT5xcEcD8Y0-sla2izQUuSvgub5uXuhNsq1sNBjF0a08KVOBEskDg2BSJrjrfK05H2oyXD_hJWeqH21OsPdFdj_g.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/YGUb-9DH-3ehev4MTqu_UfrEN6pmEKnc4vWR-Yd8uvhsNb9T_pEZ1hX6M9oE3qpKDZFKLeyAbwd_NJYe0cknCD96SvMyxV9cI0_yh9Vc2h_fHxHG1H1zUu_MUPGl9kb-2c71P9OCfs5TcAjxkf7uEQ.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "참돔",
            "먹이: 먹이로는 갑각류(요각류, 새우류, 단각류 등), 어류, 다모류 등을 섭이하는 잡식성의 어류이다.",
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
            "농어",
            "먹이: 먹이로는 주로 소형 어류, 새우류 등을 섭이한다.",
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
            "점성어",
            "먹이: 작은물고기, 연체류, 오징어를 주로 먹는다.",
            "크기: 최대 1m",
            "서식지: 연안의 산호초 일대 0~100m의 수심에 서식",
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
      name: "시화방조제",
      lat: 37.31141,
      lng: 126.6083,
      image: [
        {
          url: "https://i.namu.wiki/i/i3_iJbB0KlB2mhyT5TV0DgtjpT2Ar1RBqjRgsVpMeCwkxmgpbTCffHwU0zmbkYqT5xcEcD8Y0-sla2izQUuSvgub5uXuhNsq1sNBjF0a08KVOBEskDg2BSJrjrfK05H2oyXD_hJWeqH21OsPdFdj_g.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/6AejGjWXZEcz-r0OGYkCR1Ge1uTqrli9wKmlBB7B0LZ5YvJi_OycfsFKL6qsylGcQuHvSxAZ0aD2XaoW9t6kPVEQwIvnGhZCwOYLhAYLJG_En-GKtZLqj6xHP_dCrDKsI2zCYL9Cs3vdPJ6bS-hRKw.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/yOoqOJgR77-jPzoGM0lTlBpz7s5Aa1TiPvKastjdXGQJdwkOkGxsRuIqyVcqCrsjI4FtCGMYn1wyAlZMQwv6Re6F9uz5xIULEPiQzJf4qJIZ2l4a3BUnemmvacep5VwFlSa_GiiWAQ7PXQRX-0Yb-Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/TNUPPgpTR9pkaADQjeMGvWnyiSgTvob-e5grRNJdEYmHvsQlGcBcE4ElwtVNCtYP8Eu02iujDooYdjOPyF8QVyirB7MJpxccGAgkW5If-JUKIRoSU7Oh7WJocYIc7LaAYKOnmND7752FyrCynpY5mA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ie3jBXDHm6X6BYTUTTWmw0ntEBdn5gYxIPZsVQwe9yl5_aJWR7pdYkzz1V5jtUQHeMdhfy1Cx4AqCSdjQMbxzPsus60Obvg9HVkuNBU7Te857qaBeFAF2UMZpFx0jCMZlJGbqa9LTncvCz2Ekim0Tw.webp",
          style: {},
        },
      ],
      text: [
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
            "망둥이",
            "먹이: 게·갯지렁이·곤충 등을 잡아먹는다.",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
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
            "먹이: 성어의 경우 잡식성으로 작은 어류를 비롯한 저서생물, 단각류, 유기성 잔류물 등을 섭이한다.",
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
            "먹이: 먹이로는 주로 소형 어류, 새우류 등을 섭이한다.",
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
      name: "뱃말선착장",
      lat: 37.23635,
      lng: 126.538,
      image: [
        {
          url: "https://i.namu.wiki/i/i3_iJbB0KlB2mhyT5TV0DgtjpT2Ar1RBqjRgsVpMeCwkxmgpbTCffHwU0zmbkYqT5xcEcD8Y0-sla2izQUuSvgub5uXuhNsq1sNBjF0a08KVOBEskDg2BSJrjrfK05H2oyXD_hJWeqH21OsPdFdj_g.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/6AejGjWXZEcz-r0OGYkCR1Ge1uTqrli9wKmlBB7B0LZ5YvJi_OycfsFKL6qsylGcQuHvSxAZ0aD2XaoW9t6kPVEQwIvnGhZCwOYLhAYLJG_En-GKtZLqj6xHP_dCrDKsI2zCYL9Cs3vdPJ6bS-hRKw.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/wM_ity7-TgGPsIfG8cnSYKnYG4-UwCFD76tXO7xf8UVcZkybuK7epIbCHMhFc-8W3uRy4wecUPw7IFWwMViHhsm6wfFpwBd9qhrMLc7mZrHNjFMkelw9akGD2PTRTP6e7Bpcn7VEqjgtEqP5XbbhfQ.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/yOoqOJgR77-jPzoGM0lTlBpz7s5Aa1TiPvKastjdXGQJdwkOkGxsRuIqyVcqCrsjI4FtCGMYn1wyAlZMQwv6Re6F9uz5xIULEPiQzJf4qJIZ2l4a3BUnemmvacep5VwFlSa_GiiWAQ7PXQRX-0Yb-Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/TNUPPgpTR9pkaADQjeMGvWnyiSgTvob-e5grRNJdEYmHvsQlGcBcE4ElwtVNCtYP8Eu02iujDooYdjOPyF8QVyirB7MJpxccGAgkW5If-JUKIRoSU7Oh7WJocYIc7LaAYKOnmND7752FyrCynpY5mA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/Ws7ROJvP2UdJ4MDzqvzXzk0SZGvhK5ylHenO9U5yRYuwX3QYOiPgVkbJv2AwzWhBwCuMpikHlh4FwPhmVETJQTFI7XQv9zyHCjf9acwgEu3rpGrU3CAFp_tXY9uKjUkw0SuZ8yKZ607Mf9LM5WCH2Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ETTClryP3Vv4bVTdyGQOUcqw7N-U0tEbOKceyY73zIvJvcjMwgRJdBWop5PFn_fjZAiwiXn2Yj_ukZ9EhCB8Fk5FZmfvW4EKkvnm4GlzYCn--ETJH74YqcaH8Grq1HHIemZ6hemE7zskyTdUKSe-GQ.webp",
          style: {},
        },
      ],
      text: [
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
            "도다리",
            "먹이: 먹이는 갯지렁이류, 조개류, 새우류 등의 저서성 생물을 주로 섭이한다.",
            "크기: 최대 30cm",
            "서식지: 우리나라 전 연안",
            "금어기: 12월~2월",
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
            "망둥이",
            "먹이: 게·갯지렁이·곤충 등을 잡아먹는다.",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
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
            "먹이: 성어의 경우 잡식성으로 작은 어류를 비롯한 저서생물, 단각류, 유기성 잔류물 등을 섭이한다.",
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
            "붕장어",
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
      name: "궁평리선착장",
      lat: 37.11669,
      lng: 126.6767,
      image: [
        {
          url: "https://i.namu.wiki/i/i3_iJbB0KlB2mhyT5TV0DgtjpT2Ar1RBqjRgsVpMeCwkxmgpbTCffHwU0zmbkYqT5xcEcD8Y0-sla2izQUuSvgub5uXuhNsq1sNBjF0a08KVOBEskDg2BSJrjrfK05H2oyXD_hJWeqH21OsPdFdj_g.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/6AejGjWXZEcz-r0OGYkCR1Ge1uTqrli9wKmlBB7B0LZ5YvJi_OycfsFKL6qsylGcQuHvSxAZ0aD2XaoW9t6kPVEQwIvnGhZCwOYLhAYLJG_En-GKtZLqj6xHP_dCrDKsI2zCYL9Cs3vdPJ6bS-hRKw.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/yOoqOJgR77-jPzoGM0lTlBpz7s5Aa1TiPvKastjdXGQJdwkOkGxsRuIqyVcqCrsjI4FtCGMYn1wyAlZMQwv6Re6F9uz5xIULEPiQzJf4qJIZ2l4a3BUnemmvacep5VwFlSa_GiiWAQ7PXQRX-0Yb-Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/wM_ity7-TgGPsIfG8cnSYKnYG4-UwCFD76tXO7xf8UVcZkybuK7epIbCHMhFc-8W3uRy4wecUPw7IFWwMViHhsm6wfFpwBd9qhrMLc7mZrHNjFMkelw9akGD2PTRTP6e7Bpcn7VEqjgtEqP5XbbhfQ.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/TNUPPgpTR9pkaADQjeMGvWnyiSgTvob-e5grRNJdEYmHvsQlGcBcE4ElwtVNCtYP8Eu02iujDooYdjOPyF8QVyirB7MJpxccGAgkW5If-JUKIRoSU7Oh7WJocYIc7LaAYKOnmND7752FyrCynpY5mA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ie3jBXDHm6X6BYTUTTWmw0ntEBdn5gYxIPZsVQwe9yl5_aJWR7pdYkzz1V5jtUQHeMdhfy1Cx4AqCSdjQMbxzPsus60Obvg9HVkuNBU7Te857qaBeFAF2UMZpFx0jCMZlJGbqa9LTncvCz2Ekim0Tw.webp",
          style: {},
        },
      ],
      text: [
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
            "망둥이",
            "먹이: 게·갯지렁이·곤충 등을 잡아먹는다.",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
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
            "삼치",
            "먹이: 먹이는 주로 작은 어류를 먹는다.",
            "크기: 최대 100cm",
            "서식지: 연근해의 아표층",
            "금어기: 5월",
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
            "숭어",
            "먹이: 성어의 경우 잡식성으로 작은 어류를 비롯한 저서생물, 단각류, 유기성 잔류물 등을 섭이한다.",
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
            "먹이: 먹이로는 주로 소형 어류, 새우류 등을 섭이한다.",
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
      name: "매향리선착장",
      lat: 37.03816,
      lng: 126.7492,
      image: [
        {
          url: "https://i.namu.wiki/i/i3_iJbB0KlB2mhyT5TV0DgtjpT2Ar1RBqjRgsVpMeCwkxmgpbTCffHwU0zmbkYqT5xcEcD8Y0-sla2izQUuSvgub5uXuhNsq1sNBjF0a08KVOBEskDg2BSJrjrfK05H2oyXD_hJWeqH21OsPdFdj_g.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/yOoqOJgR77-jPzoGM0lTlBpz7s5Aa1TiPvKastjdXGQJdwkOkGxsRuIqyVcqCrsjI4FtCGMYn1wyAlZMQwv6Re6F9uz5xIULEPiQzJf4qJIZ2l4a3BUnemmvacep5VwFlSa_GiiWAQ7PXQRX-0Yb-Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/TNUPPgpTR9pkaADQjeMGvWnyiSgTvob-e5grRNJdEYmHvsQlGcBcE4ElwtVNCtYP8Eu02iujDooYdjOPyF8QVyirB7MJpxccGAgkW5If-JUKIRoSU7Oh7WJocYIc7LaAYKOnmND7752FyrCynpY5mA.webp",
          style: {},
        },
      ],
      text: [
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
            "망둥이",
            "먹이: 게·갯지렁이·곤충 등을 잡아먹는다.",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
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
            "먹이: 성어의 경우 잡식성으로 작은 어류를 비롯한 저서생물, 단각류, 유기성 잔류물 등을 섭이한다.",
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
      ],
    },
    {
      name: "천리포방파제",
      lat: 36.80398,
      lng: 126.1475,
      image: [
        {
          url: "https://i.namu.wiki/i/i3_iJbB0KlB2mhyT5TV0DgtjpT2Ar1RBqjRgsVpMeCwkxmgpbTCffHwU0zmbkYqT5xcEcD8Y0-sla2izQUuSvgub5uXuhNsq1sNBjF0a08KVOBEskDg2BSJrjrfK05H2oyXD_hJWeqH21OsPdFdj_g.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/6AejGjWXZEcz-r0OGYkCR1Ge1uTqrli9wKmlBB7B0LZ5YvJi_OycfsFKL6qsylGcQuHvSxAZ0aD2XaoW9t6kPVEQwIvnGhZCwOYLhAYLJG_En-GKtZLqj6xHP_dCrDKsI2zCYL9Cs3vdPJ6bS-hRKw.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/wM_ity7-TgGPsIfG8cnSYKnYG4-UwCFD76tXO7xf8UVcZkybuK7epIbCHMhFc-8W3uRy4wecUPw7IFWwMViHhsm6wfFpwBd9qhrMLc7mZrHNjFMkelw9akGD2PTRTP6e7Bpcn7VEqjgtEqP5XbbhfQ.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/yOoqOJgR77-jPzoGM0lTlBpz7s5Aa1TiPvKastjdXGQJdwkOkGxsRuIqyVcqCrsjI4FtCGMYn1wyAlZMQwv6Re6F9uz5xIULEPiQzJf4qJIZ2l4a3BUnemmvacep5VwFlSa_GiiWAQ7PXQRX-0Yb-Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/TNUPPgpTR9pkaADQjeMGvWnyiSgTvob-e5grRNJdEYmHvsQlGcBcE4ElwtVNCtYP8Eu02iujDooYdjOPyF8QVyirB7MJpxccGAgkW5If-JUKIRoSU7Oh7WJocYIc7LaAYKOnmND7752FyrCynpY5mA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/Ws7ROJvP2UdJ4MDzqvzXzk0SZGvhK5ylHenO9U5yRYuwX3QYOiPgVkbJv2AwzWhBwCuMpikHlh4FwPhmVETJQTFI7XQv9zyHCjf9acwgEu3rpGrU3CAFp_tXY9uKjUkw0SuZ8yKZ607Mf9LM5WCH2Q.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ETTClryP3Vv4bVTdyGQOUcqw7N-U0tEbOKceyY73zIvJvcjMwgRJdBWop5PFn_fjZAiwiXn2Yj_ukZ9EhCB8Fk5FZmfvW4EKkvnm4GlzYCn--ETJH74YqcaH8Grq1HHIemZ6hemE7zskyTdUKSe-GQ.webp",
          style: {},
        },
      ],
      text: [
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
            "도다리",
            "먹이: 먹이는 갯지렁이류, 조개류, 새우류 등의 저서성 생물을 주로 섭이한다.",
            "크기: 최대 30cm",
            "서식지: 우리나라 전 연안",
            "금어기: 12월~2월",
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
            "망둥이",
            "먹이: 게·갯지렁이·곤충 등을 잡아먹는다.",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
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
            "먹이: 성어의 경우 잡식성으로 작은 어류를 비롯한 저서생물, 단각류, 유기성 잔류물 등을 섭이한다.",
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
            "붕장어",
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
    { name: "마도방파제", lat: 36.67761, lng: 126.1262 },
    { name: "신진도 부억도", lat: 36.67181, lng: 126.132 },
    { name: "몽산포방파제", lat: 36.67187, lng: 126.2724 },
    { name: "방포방파제", lat: 36.50457, lng: 126.3347 },
    { name: "보령방조제", lat: 36.4463, lng: 126.5269 },
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
  const goToPointerInfo8 = () => {
    navigate("/PointerInfo_8");
  };

  return (
    <div className="weatherinfo">
      <h4>포인트 정보(서해중부권)</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button>서해중부권</button>
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

export default PointerInfo_1;

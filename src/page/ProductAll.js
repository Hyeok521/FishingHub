import React, { useEffect, useState } from "react";
import { Container, Carousel, Card, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useSearchParams();

  const imageUrls = [
    "https://lh3.googleusercontent.com/p/AF1QipNcO0HTZy14UCRUdmugbHbyuDbQnJlKfliy0UH2=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipP9ZBjNAkwsuQvrxb7NMAWzJrA7hJAzbMT__Rpc=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipMb5cZlRvf1ZwkMqgkOoY4_KFcwU_q2ec6cWuLF=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOX2BvGWmUiU0FHgQNU9shc67rgBcoi7MqTt2I8=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipND2Cd2wHAvi_USN7mBrwwo0PQS3YJIGS40gZhc=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipMSzGe2KzFUShZ86ZNzR5-fNtdYODFqKrlumfer=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOtHGPw-_1tCPxwPL6ZA62cfKYp6LqvAgbrGzyT=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipPXtrTop1rsP1W3KQeTHMLbMEV1iTTNiqeIuNFy=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipPDeX3vdZtdUBF3Fo9crTj4AufjsVzt-JaHcRhq=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOIrZSecpAodTVGkALZb-nGC0w7cDmR5Fubr455=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipMUzU9HQwFdxIBXi93ZqB51wJ4f_9JqRiZ0BDpc=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipPZD9n8zDU93MHlVd_1MjjHBU82JFCiSh41EspB=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOjTqjHgWUb9m4X_lOjl673vcpQwPjTe2hibLtM=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOJb2gSH-EVmso1Dpv8nR91RvYilaKILLrFwK5I=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOJ1iWBCxBt3XY3jQxvwUl-UQ1S4C_5Kb-HjylU=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipO69QZovvXXYba-EwVyqsgSE-r_oy08tIkcGU5T=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOVyaxWSoRHztNySxaEYgfN3gR6Q9dDhiZ3lTeB=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOEPiLmDPcwrHWgrdKvC9WmRZyB1crjP5Xo6PmJ=s1360-w1360-h1020",
  ];

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = [
    "Seoul",
    "Gyeonggi-do",
    "Gangwon-do",
    "Chungcheongbuk-do",
    "Chungcheongnam-do",
    "Jeollabuk-do",
    "Jeollanam-do",
    "Gyeongsangbuk-do",
    "Gyeongsangnam-do",
    "Jeju",
  ];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e7f59aaca8543637eab9ad2b801f9249`;
    let response = await fetch(url);
    let data = await response.json();
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7f59aaca8543637eab9ad2b801f9249&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <Carousel interval={3000} className="carousel">
        {imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img className="pointer" src={url} alt={`Image - ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <div>
        <ul className="product-add1">
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=28">
              <img src="https://sapa.co.kr/web/product/extra/big/20230224/585d140ee81a60cb4964fd56ed44175c.jpg" />
              <div>릴 →</div>
            </a>
          </li>
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=107">
              <img src="https://sapa.co.kr/web/product/extra/big/20230901/636e7a9b5c3dae5054fee181e387317f.jpg" />
              <div>낚싯줄 →</div>
            </a>
          </li>
          <li>
            <a href="https://www.wfish.co.kr/sp2/goods_data_list.htm?cate_code=009">
              <img src="https://sapa.co.kr/web/product/medium/202306/dc636f8b85b83077bd32e81a261f80d2.jpg" />
              <div>찌 →</div>
            </a>
          </li>
          <li>
            <a href="https://www.klfishing.com/shop_item_list.php?ac_id=8">
              <img src="https://sapa.co.kr/web/product/medium/202206/15cbe9ea7c81066739a70917e3ea88a9.jpg" />
              <div>낚시바늘 →</div>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="product-add2">
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=112">
              <img src="https://sapa.co.kr/web/product/extra/big/20230207/37f74a86184ec084cd81980c986c4a40.jpg" />
              <div>낚시가방 →</div>
            </a>
          </li>
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=204">
              <img src="https://sapa.co.kr/web/product/medium/202205/dd9cd4ae2a1683c64676754517265a81.jpg" />
              <div>낚시의자 및 테이블 →</div>
            </a>
          </li>
          <li>
            <a href="https://www.wfish.co.kr/sp2/goods_data_list.htm?cate_code=012">
              <img src="https://sapa.co.kr/web/product/medium/202306/d20bcf505cb2583e86a92eb6922e0bf2.jpg" />
              <div>의류 및 잡화 →</div>
            </a>
          </li>
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=261">
              <img src="https://sapa.co.kr/web/product/medium/202308/70c4de93dbc72ec255fdfb775e7674b4.jpg" />
              <div>낚싯대 및 낚시세트 →</div>
            </a>
          </li>
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "lightgray",
            width: "1350px",
            margin: "60px auto 0 auto",
            transform: "none",
          }}
        >
          <Row noGutters={true}>
            <Col xs={6} style={{ display: "flex", alignItems: "center" }}>
              <Card.Img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfFbzu_8IO3x7CB3q-He2q9ZeOQ7Y6sdXWsKZWWMUr9sLT66S68gX-zmVJNBCyHVvDouA&usqp=CAU"
                variant="left"
                style={{ width: "675px" }}
              />
            </Col>
            <Col xs={6} style={{ display: "flex" }}>
              <Card.Body
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Text style={{ fontSize: "20px", textAlign: "left" }}>
                  <div>
                    바다의 파도 속에서, 강의 흐름 속에서, 우리는 무엇을 찾고
                    있는가?
                  </div>
                  <div>아마도 잡히지 않는 꿈, 혹은</div>
                  <div>
                    놓치고 싶지 않은 순간의 아름다움을 찾고 있을 것이다.
                  </div>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "lightgray",
            width: "1350px",
            margin: "60px auto 0 auto",
            transform: "none",
          }}
        >
          <Row noGutters={true}>
            <Col xs={6} style={{ display: "flex" }}>
              <Card.Body
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center", // 추가: 내용을 중앙으로 정렬
                }}
              >
                <Card.Text style={{ fontSize: "20px", textAlign: "left" }}>
                  <div>낚시는 인생의 교훈을 주는 활동이다.</div>
                  <div>무한한 기다림과 인내, 그리고 예상치 못한 선물.</div>
                  <div>이 모든 것이 우리에게 인생이란 무엇인지,</div>
                  <div>그리고 진정한 행복이란 무엇인지를 알려준다.</div>
                </Card.Text>
              </Card.Body>
            </Col>
            <Col xs={6} style={{ display: "flex", alignItems: "center" }}>
              <Card.Img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9pq_LheRIf41LZyi-g36AIzWK59-dlil1Q&usqp=CAU"
                variant="left"
                style={{ width: "675px" }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ProductAll;

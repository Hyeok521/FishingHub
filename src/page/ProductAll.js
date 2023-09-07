import React, { useEffect, useState } from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState("수도권");

  const regionImages = {
    수도권: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipNcO0HTZy14UCRUdmugbHbyuDbQnJlKfliy0UH2=s1360-w1360-h1020",
        address: "경기도 안산시 단원구 대부북동 1870-12 (서울바다낚시터)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipP9ZBjNAkwsuQvrxb7NMAWzJrA7hJAzbMT__Rpc=s1360-w1360-h1020",
        address: "인천광역시 중구 중산동 백운로186번길 140-1 (정성바다낚시터)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMb5cZlRvf1ZwkMqgkOoY4_KFcwU_q2ec6cWuLF=s1360-w1360-h1020",
        address: "인천광역시 중구 항동7가 82-6 (연안부두 바다쉼터)",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    강원도: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOX2BvGWmUiU0FHgQNU9shc67rgBcoi7MqTt2I8=s1360-w1360-h1020",
        address: "강원도 속초시 동명동 1-143 (동명방파제)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipND2Cd2wHAvi_USN7mBrwwo0PQS3YJIGS40gZhc=s1360-w1360-h1020",
        address: "강원도 삼척시 근덕면 덕산리 (덕산포구낚시터)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMSzGe2KzFUShZ86ZNzR5-fNtdYODFqKrlumfer=s1360-w1360-h1020",
        address: "강원도 동해시 (속초신방파제)",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    충청도: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOtHGPw-_1tCPxwPL6ZA62cfKYp6LqvAgbrGzyT=s1360-w1360-h1020",
        address:
          "충청남도 당진시 시 신평면 샛터길 117 KR-121 (서해대교바다낚시터)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPXtrTop1rsP1W3KQeTHMLbMEV1iTTNiqeIuNFy=s1360-w1360-h1020",
        address: "충청남도 당진시 석문면 난지3길 9 KR (스카이바다좌대낚시터)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPDeX3vdZtdUBF3Fo9crTj4AufjsVzt-JaHcRhq=s1360-w1360-h1020",
        address: "495, 원북면 모항리 (태안 배낚시)",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    전라도: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOIrZSecpAodTVGkALZb-nGC0w7cDmR5Fubr455=s1360-w1360-h1020",
        address:
          "전라남도 해남군 송지면 송호리 1220-10 (땅끝바다낚시터&글램핑)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMUzU9HQwFdxIBXi93ZqB51wJ4f_9JqRiZ0BDpc=s1360-w1360-h1020",
        address: "전라남도 완도군 완도읍 죽청리 (포인트낚시)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPZD9n8zDU93MHlVd_1MjjHBU82JFCiSh41EspB=s1360-w1360-h1020",
        address: "전라남도 해남군 북평면 남창리 845-14",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    경상도: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOjTqjHgWUb9m4X_lOjl673vcpQwPjTe2hibLtM=s1360-w1360-h1020",
        address: "경상남도 통영시 산양읍 풍화리 산608 (해란유로낚시터)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOJb2gSH-EVmso1Dpv8nR91RvYilaKILLrFwK5I=s1360-w1360-h1020",
        address: "경상남도 통영시 산양읍 영운리 KR (통영등대낚시공원)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOJ1iWBCxBt3XY3jQxvwUl-UQ1S4C_5Kb-HjylU=s1360-w1360-h1020",
        address: "경상남도 거제시 일운면 지세포리 292 (상상낚시터)",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    제주도: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipO69QZovvXXYba-EwVyqsgSE-r_oy08tIkcGU5T=s1360-w1360-h1020",
        address:
          "제주특별자치도 제주시 조천읍 조함해안로 247-2 (신흥바다낚시공원)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOVyaxWSoRHztNySxaEYgfN3gR6Q9dDhiZ3lTeB=s1360-w1360-h1020",
        address: "제주특별자치도 제주시 추자면 신양리 산151 (수덕도)",
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOEPiLmDPcwrHWgrdKvC9WmRZyB1crjP5Xo6PmJ=s1360-w1360-h1020",
        address: "제주특별자치도 제주시 건입동 908-18 (제주 동 방파제)",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
  };

  const getProducts = async () => {
    // ... 기존의 getProducts 함수의 내용 ...
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <Container className="main-section">
      <h2>전국 주요 포인터</h2>
      <div className="region-buttons">
        {Object.keys(regionImages).map((region) => (
          <Button
            variant="white"
            className="region-button"
            key={region}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </Button>
        ))}
      </div>
      <Carousel className="carousel">
        {regionImages[selectedRegion].map((imageData, index) => (
          <Carousel.Item key={index}>
            <div>
              <img
                className="pointer"
                src={imageData.url}
                alt={`Image of ${selectedRegion} - ${index + 1}`}
              />
              <div className="carousel-text">
                <h3>
                  {selectedRegion} - {index + 1}
                </h3>
                <p>주소 : {imageData.address}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductAll;

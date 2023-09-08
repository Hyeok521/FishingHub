import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

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

  return (
    <div className="main-section">
      <Carousel className="carousel">
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
            <a href="https://sapa.co.kr/product/list.html?cate_no=112">
              <img src="https://sapa.co.kr/web/product/extra/big/20230207/37f74a86184ec084cd81980c986c4a40.jpg" />
              <div>낚시가방 →</div>
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
    </div>
  );
};

export default ProductAll;

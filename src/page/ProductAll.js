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
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjFfMTIx%2FMDAxNTYxMTAxNTEzMzE4.AIOvNH9nsDZaBz3eyPvF7qvnRrhqXd72etCH-DPyOyUg.kzkYCwN_R1pUYLDtSDwg2M2iDfbi6H-waM8Xb9lMDWkg.JPEG.ehdud0748%2Fwkdm44.jpg&type=sc960_832",
        address: "수도권 주소 1",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMjFfMTkx%2FMDAxNTIxNjQyNDQzMjYz.bxp6jIVkYgFnqvibg4LeKchpqVeaAM89Es8cqGuuu68g.4qpVfid-F_GA_AohTot1F_uFQSBJ0YIhGrBCyqKFmYcg.JPEG.patjjilove%2F20180321_155553.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MTlfMjA2%2FMDAxNTY2MTc2MDE3Njg4.EBJQeXuuom6_lae2lKvpJKq2NidHgktrQ4E3rRVvDCcg.6vwvr-2QpXs2B6xOyXMzWexFRe3SSN9UkLdx0Ww0dIEg.JPEG.brighton-kr%2FKakaoTalk_20190819_092325815_10.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    강원도: [
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjFfMTIx%2FMDAxNTYxMTAxNTEzMzE4.AIOvNH9nsDZaBz3eyPvF7qvnRrhqXd72etCH-DPyOyUg.kzkYCwN_R1pUYLDtSDwg2M2iDfbi6H-waM8Xb9lMDWkg.JPEG.ehdud0748%2Fwkdm44.jpg&type=sc960_832",
        address: "수도권 주소 1",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMjFfMTkx%2FMDAxNTIxNjQyNDQzMjYz.bxp6jIVkYgFnqvibg4LeKchpqVeaAM89Es8cqGuuu68g.4qpVfid-F_GA_AohTot1F_uFQSBJ0YIhGrBCyqKFmYcg.JPEG.patjjilove%2F20180321_155553.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MTlfMjA2%2FMDAxNTY2MTc2MDE3Njg4.EBJQeXuuom6_lae2lKvpJKq2NidHgktrQ4E3rRVvDCcg.6vwvr-2QpXs2B6xOyXMzWexFRe3SSN9UkLdx0Ww0dIEg.JPEG.brighton-kr%2FKakaoTalk_20190819_092325815_10.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    충청도: [
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjFfMTIx%2FMDAxNTYxMTAxNTEzMzE4.AIOvNH9nsDZaBz3eyPvF7qvnRrhqXd72etCH-DPyOyUg.kzkYCwN_R1pUYLDtSDwg2M2iDfbi6H-waM8Xb9lMDWkg.JPEG.ehdud0748%2Fwkdm44.jpg&type=sc960_832",
        address: "수도권 주소 1",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMjFfMTkx%2FMDAxNTIxNjQyNDQzMjYz.bxp6jIVkYgFnqvibg4LeKchpqVeaAM89Es8cqGuuu68g.4qpVfid-F_GA_AohTot1F_uFQSBJ0YIhGrBCyqKFmYcg.JPEG.patjjilove%2F20180321_155553.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MTlfMjA2%2FMDAxNTY2MTc2MDE3Njg4.EBJQeXuuom6_lae2lKvpJKq2NidHgktrQ4E3rRVvDCcg.6vwvr-2QpXs2B6xOyXMzWexFRe3SSN9UkLdx0Ww0dIEg.JPEG.brighton-kr%2FKakaoTalk_20190819_092325815_10.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    전라도: [
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjFfMTIx%2FMDAxNTYxMTAxNTEzMzE4.AIOvNH9nsDZaBz3eyPvF7qvnRrhqXd72etCH-DPyOyUg.kzkYCwN_R1pUYLDtSDwg2M2iDfbi6H-waM8Xb9lMDWkg.JPEG.ehdud0748%2Fwkdm44.jpg&type=sc960_832",
        address: "수도권 주소 1",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMjFfMTkx%2FMDAxNTIxNjQyNDQzMjYz.bxp6jIVkYgFnqvibg4LeKchpqVeaAM89Es8cqGuuu68g.4qpVfid-F_GA_AohTot1F_uFQSBJ0YIhGrBCyqKFmYcg.JPEG.patjjilove%2F20180321_155553.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MTlfMjA2%2FMDAxNTY2MTc2MDE3Njg4.EBJQeXuuom6_lae2lKvpJKq2NidHgktrQ4E3rRVvDCcg.6vwvr-2QpXs2B6xOyXMzWexFRe3SSN9UkLdx0Ww0dIEg.JPEG.brighton-kr%2FKakaoTalk_20190819_092325815_10.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    경상도: [
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjFfMTIx%2FMDAxNTYxMTAxNTEzMzE4.AIOvNH9nsDZaBz3eyPvF7qvnRrhqXd72etCH-DPyOyUg.kzkYCwN_R1pUYLDtSDwg2M2iDfbi6H-waM8Xb9lMDWkg.JPEG.ehdud0748%2Fwkdm44.jpg&type=sc960_832",
        address: "수도권 주소 1",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMjFfMTkx%2FMDAxNTIxNjQyNDQzMjYz.bxp6jIVkYgFnqvibg4LeKchpqVeaAM89Es8cqGuuu68g.4qpVfid-F_GA_AohTot1F_uFQSBJ0YIhGrBCyqKFmYcg.JPEG.patjjilove%2F20180321_155553.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MTlfMjA2%2FMDAxNTY2MTc2MDE3Njg4.EBJQeXuuom6_lae2lKvpJKq2NidHgktrQ4E3rRVvDCcg.6vwvr-2QpXs2B6xOyXMzWexFRe3SSN9UkLdx0Ww0dIEg.JPEG.brighton-kr%2FKakaoTalk_20190819_092325815_10.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      // ... 추가적인 이미지와 주소 정보 ...
    ],
    제주도: [
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjFfMTIx%2FMDAxNTYxMTAxNTEzMzE4.AIOvNH9nsDZaBz3eyPvF7qvnRrhqXd72etCH-DPyOyUg.kzkYCwN_R1pUYLDtSDwg2M2iDfbi6H-waM8Xb9lMDWkg.JPEG.ehdud0748%2Fwkdm44.jpg&type=sc960_832",
        address: "수도권 주소 1",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODAzMjFfMTkx%2FMDAxNTIxNjQyNDQzMjYz.bxp6jIVkYgFnqvibg4LeKchpqVeaAM89Es8cqGuuu68g.4qpVfid-F_GA_AohTot1F_uFQSBJ0YIhGrBCyqKFmYcg.JPEG.patjjilove%2F20180321_155553.jpg&type=sc960_832",
        address: "수도권 주소 2",
      },
      {
        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MTlfMjA2%2FMDAxNTY2MTc2MDE3Njg4.EBJQeXuuom6_lae2lKvpJKq2NidHgktrQ4E3rRVvDCcg.6vwvr-2QpXs2B6xOyXMzWexFRe3SSN9UkLdx0Ww0dIEg.JPEG.brighton-kr%2FKakaoTalk_20190819_092325815_10.jpg&type=sc960_832",
        address: "수도권 주소 2",
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

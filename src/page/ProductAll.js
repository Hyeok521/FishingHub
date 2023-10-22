import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { ROLE_ADMIN } from "../common/Constants";
import axios from "axios";
import { getAuthentication } from "../common/CookieUtil";
import { useNavigate } from "react-router-dom";

const ProductAll = () => {
  const auth = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [image, setImage] = useState(null);
  const [preImage, setPreImage] = useState(null);
  const [mainInfo, setMainInfo] = useState(null);
  const [mainCode, setMainCode] = useState("");
  const [mainInfos, setMainInfos] = useState();

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

  // 이미지 업로드
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setImage(image);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreImage(reader.result);
    };
  };

  const fetchMainInfo = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/main/info"
      );
      if (res && res.data) {
        setMainInfos(res.data);
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error fetching main info:", error);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchMainInfo();
  }, []);

  const handleUpdate = () => {
    if (!auth) {
      alert("로그인 후 이용해주세요");
      navigate("/login");
      return;
    }

    // 글 작성에 필요한 데이터 수집
    const formData = new FormData();
    formData.append("text", mainInfo.text);
    formData.append("infoType", mainCode);

    if (image) {
      formData.append("image", image);
    }

    // formData를 사용하여 데이터를 보냅니다.
    axios
      .put(process.env.REACT_APP_SERVER_URL + "/admin/main/info", formData, {
        headers: {
          Authorization: `Bearer ${getAuthentication()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("수정 성공");
          fetchMainInfo();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("수정 실패");
      })
      .finally(() => {
        setIsModal(false);
        setImage(null);
        setMainInfo(null);
      });
  };

  const openModal = (e, code) => {
    if (auth.userType === ROLE_ADMIN) {
      e.preventDefault();
      setIsModal(true);
      setMainCode(code);

      axios
        .get(process.env.REACT_APP_SERVER_URL + "/admin/main/info", {
          params: { infoType: code },
          headers: {
            Authorization: `Bearer ${getAuthentication()}`,
          },
        })
        .then((res) => {
          setMainInfo(res.data);
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.message);
          setIsModal(true);
        });
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const getMainInfoText = (code) => {
    return mainInfos?.map((item) => {
      if (item.infoType === code) {
        return item.text;
      }
    });
  };

  const getMainInfoImage = (code) => {
    const imageUrls = mainInfos
      ?.filter((item) => item.infoType === code)
      .map((item) => {
        console.log(
          process.env.REACT_APP_SERVER_URL +
            "/image/" +
            item.savedImage?.savedName
        );
        return (
          process.env.REACT_APP_SERVER_URL +
          "/image/" +
          item.savedImage?.savedName
        );
      });

    return imageUrls || [];
    // return mainInfos?.map(item => {
    //     if (item.infoType === code) {
    //         console.log(process.env.REACT_APP_SERVER_URL + '/image/' + item.savedImage?.savedName)
    //         return process.env.REACT_APP_SERVER_URL + '/image/' + item.savedImage?.savedName
    //     }
    // })
  };

  return (
    <div>
      <Modal
        show={isModal}
        onHide={() => setIsModal(false)}
        onExited={() => {
          setPreImage(null);
          setImage(null);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(mainCode.startsWith("B") || mainCode.startsWith("C")) && (
            <Form.Group className="mb-5">
              <Form.Label>텍스트</Form.Label>
              <Form.Control
                type="text"
                placeholder="텍스트를 입력하세요."
                value={mainInfo?.text}
                onChange={(e) =>
                  setMainInfo({
                    ...mainInfo,
                    text: e.target.value,
                  })
                }
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {(mainInfo?.savedImage || preImage) && (
              <div
                style={{
                  height: "auto",
                  width: "auto",
                }}
              >
                <Image
                  src={
                    preImage
                      ? preImage
                      : process.env.REACT_APP_SERVER_URL +
                        "/image/" +
                        mainInfo?.savedImage.savedName
                  }
                  // src={process.env.REACT_APP_SERVER_URL + '/image/' + articleInfo?.savedImage.savedName}
                  alt="Image Preview"
                  thumbnail
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    marginBottom: "10px",
                  }}
                />
                {mainInfo?.savedImage && (
                  <div>
                    {mainInfo?.savedImage.originalName}
                    {/*<Button variant="danger"*/}
                    {/*        onClick={() => handleFileDelete(main.savedImage.id, "image")}>*/}
                    {/*    이미지 삭제*/}
                    {/*</Button>*/}
                  </div>
                )}
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsModal(false)}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate();
            }}
          >
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      <Carousel interval={2000} className="carousel">
        {mainInfos?.map((item, index) => {
          if (index < 8) {
            let code;
            let i;
            if (index + 1 < 10) {
              i = "0" + (index + 1);
            } else {
              i = index + 1;
            }
            code = "A" + i;
            return (
              <Carousel.Item key={index}>
                <img
                  className="pointer"
                  src={getMainInfoImage(code)}
                  alt="이미지"
                  onClick={(e) => {
                    openModal(e, code);
                  }}
                />
              </Carousel.Item>
            );
          }
        })}
        {/*{imageUrls.map((url, index) => (*/}
        {/*    <Carousel.Item key={index}>*/}
        {/*        <img className="pointer" src={url} alt={`Image - ${index + 1}`} onClick={(e) => {*/}
        {/*            let i;*/}
        {/*            if (index + 1 < 10) {*/}
        {/*                i = '0' + (index + 1)*/}
        {/*            } else {*/}
        {/*                i = index + 1;*/}
        {/*            }*/}
        {/*            openModal(e, 'A' + i)*/}
        {/*        }}/>*/}
        {/*    </Carousel.Item>*/}
        {/*))}*/}
      </Carousel>
      <div>
        <ul className="product-add1">
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=28">
              <img
                src={getMainInfoImage("B01")[0]}
                onClick={(e) => {
                  openModal(e, "B01");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B01")} →</div>
            </a>
          </li>
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=107">
              <img
                src={getMainInfoImage("B02")}
                onClick={(e) => {
                  openModal(e, "B02");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B02")} →</div>
            </a>
          </li>
          <li>
            <a href="https://www.wfish.co.kr/sp2/goods_data_list.htm?cate_code=009">
              <img
                src={getMainInfoImage("B03")}
                onClick={(e) => {
                  openModal(e, "B03");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B03")} →</div>
            </a>
          </li>
          <li>
            <a href="https://www.klfishing.com/shop_item_list.php?ac_id=8">
              <img
                src={getMainInfoImage("B04")}
                onClick={(e) => {
                  openModal(e, "B04");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B04")} →</div>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="product-add2">
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=112">
              <img
                src={getMainInfoImage("B05")}
                onClick={(e) => {
                  openModal(e, "B05");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B05")} →</div>
            </a>
          </li>
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=204">
              <img
                src={getMainInfoImage("B06")}
                onClick={(e) => {
                  openModal(e, "B06");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B06")} →</div>
            </a>
          </li>
          <li>
            <a href="https://www.wfish.co.kr/sp2/goods_data_list.htm?cate_code=012">
              <img
                src={getMainInfoImage("B07")}
                onClick={(e) => {
                  openModal(e, "B07");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B07")} →</div>
            </a>
          </li>
          <li>
            <a href="https://sapa.co.kr/product/list.html?cate_no=261">
              <img
                src={getMainInfoImage("B08")}
                onClick={(e) => {
                  openModal(e, "B08");
                }}
                alt="이미지"
              />
              <div>{getMainInfoText("B08")} →</div>
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
          <Row>
            <Col xs={6} style={{ display: "flex", alignItems: "center" }}>
              <Card.Img
                src={getMainInfoImage("C01")}
                variant="left"
                style={{ width: "675px" }}
                onClick={(e) => {
                  openModal(e, "C01");
                }}
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
                  {getMainInfoText("C01")}
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
          <Row>
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
                  {getMainInfoText("C02")}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col xs={6} style={{ display: "flex", alignItems: "center" }}>
              <Card.Img
                src={getMainInfoImage("C02")}
                variant="left"
                style={{ width: "675px" }}
                onClick={(e) => {
                  openModal(e, "C02");
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      <div className="bottom">
        <img
          src={getMainInfoImage("D01")}
          alt="이미지"
          onClick={(e) => {
            openModal(e, "D01");
          }}
        />
      </div>
    </div>
  );
};

export default ProductAll;

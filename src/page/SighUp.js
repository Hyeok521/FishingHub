import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const SighUp = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    email: "",
    nickname: "",
    name: "",
    birthDate: "",
    tel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/member/login", formData);
      if (response.status === 200) {
        console.log("회원가입 성공:", response.data);
        navigate("/"); // 회원가입 성공 시 메인 페이지로 이동
      } else {
        console.log("회원가입 실패:", response.data);
        navigate("/SignUp"); // 회원가입 실패 시 다시 SignUp 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      navigate("/SighUp"); // 회원가입 실패 시 다시 SignUp 페이지로 이동
    }
  };

  return (
    <Container
      className="SignUp-area"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="SighUp-form"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }} // 수정된 부분
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label className="left-align-label">Id</Form.Label>{" "}
            {/* 클래스 추가 */}
            <Form.Control
              type="text"
              placeholder="아이디를 입력하세요"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password check</Form.Label>
            <Form.Control
              style={{ width: "40em" }}
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
            <Form.Control type="email" placeholder="홍길동@naver.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>닉네임</Form.Label>
            <Form.Control type="text" placeholder="기타치는물고기" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="홍길동" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBirthDate">
            <Form.Label>생년월일</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label>핸드폰 번호</Form.Label>
            <Form.Control type="tel" placeholder="010-0000-0000" />
          </Form.Group>

          <div style={{ textAlign: "right" }}>
            <Button className="SignUp" variant="primary" type="submit">
              회원가입
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SighUp;

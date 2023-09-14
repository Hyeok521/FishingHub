import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const SighUp = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userPwRe: "",
    email: "",
    userNick: "",
    userNm: "",
    birth: "",
    mobile: "",
  });

  const userIdRegex = /^[a-zA-Z0-9]{5,15}$/; // 5~15자의 알파벳 대소문자와 숫자만 허용됩니다.
  const userNickRegex = /^.{2,10}$/; // 2~10자의 어떤 문자도 허용됩니다.
  const userNmRegex = /^[가-힣]{2,5}$/; // 2~5자의 한글만 허용됩니다.
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식의 날짜만 허용됩니다.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 일반적인 이메일 형식을 따릅니다.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 소문자, 대문자, 숫자가 포함되어야 합니다.
  const telRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/; // 전화번호는 XXX-XXXX-XXXX 형식으로 되어야 합니다.

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

    if (!userIdRegex.test(formData.userId)) {
      alert("아이디는 5~15자의 알파벳과 숫자로만 구성되어야 합니다.");
      return;
    }

    if (formData.userPw !== formData.userPwRe) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!passwordRegex.test(formData.userPw)) {
      alert(
        "비밀번호는 최소 8자리, 하나의 대문자, 하나의 소문자, 하나의 숫자가 필요합니다."
      );
      return;
    }

    if (!telRegex.test(formData.mobile)) {
      alert("전화번호 형식이 올바르지 않습니다.");
      return;
    }

    if (!userNickRegex.test(formData.userNick)) {
      alert("닉네임은 2~10자로 제한됩니다.");
      return;
    }

    if (!userNmRegex.test(formData.userNm)) {
      alert("이름은 2~5자의 한글로만 구성되어야 합니다.");
      return;
    }

    if (!birthRegex.test(formData.birth)) {
      alert("생년월일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://13.48.105.95:8080/member/login",
        formData
      );
      if (response.status === 200) {
        console.log("회원가입 성공:", response.data);
        alert("회원가입 성공, 다시 로그인해주세요.");
        navigate("/");
      } else {
        console.log("회원가입 실패:", response.data);
        alert("회원가입 실패, 다시 가입해주세요.");
        navigate("/SighUp");
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert(error.response?.data?.message);
      navigate("/SighUp");
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
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label className="left-align-label">Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디를 입력하세요"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="userPw"
              placeholder="비밀번호를 입력하세요"
              value={formData.userPw}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password check</Form.Label>
            <Form.Control
              style={{ width: "40em" }}
              type="password"
              name="userPwRe"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              value={formData.userPwRe}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="홍길동@naver.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              name="userNick"
              placeholder="기타치는물고기"
              value={formData.userNick}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>이름</Form.Label>
            <Form.Control
              name="userNm"
              type="text"
              placeholder="홍길동"
              value={formData.userNm}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBirthDate">
            <Form.Label>생년월일</Form.Label>
            <Form.Control
              name="birth"
              type="date"
              value={formData.birth}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label>핸드폰 번호</Form.Label>
            <Form.Control
              name="mobile"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
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

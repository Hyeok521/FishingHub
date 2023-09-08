import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Login = ({ setAuthenticate }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      console.log("로그인 요청을 시도합니다..."); // 한글로 로그 출력

      const response = await axios.post(
        "http://13.48.105.95:8080/member/login",
        { userId: id, userPw: password }
      );

      console.log("서버 응답:", response); // 한글로 로그 출력

      if (response.status === 200 && response.data !== "로그인 실패") {
        console.log("로그인 성공!"); // 한글로 로그 출력
        setAuthenticate(true);
        navigate("/");
      } else {
        console.log("로그인 실패. 서버 응답:", response); // 한글로 로그 출력
        alert("로그인 실패"); // 한글로 알림
        navigate("/login");
      }
    } catch (error) {
      console.error("로그인 요청 실패. 에러 정보:", error); // 한글로 로그 출력
    }
  };

  const goToSignUp = (event) => {
    event.preventDefault();
    setAuthenticate(true);
    navigate("/SighUp"); // 이 부분을 /SighUp으로 변경
  };

  const goToIdSearch = (event) => {
    event.preventDefault();
    setAuthenticate(true);
    navigate("/IdSearch");
  };

  const goToPasswordSearch = (event) => {
    event.preventDefault();
    setAuthenticate(true);
    navigate("/PasswordSearch");
  };

  return (
    <Container className="login-area">
      <Form onSubmit={login} className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="id"
            placeholder="id"
            name="userId"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="userPw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <ButtonGroup className="Button">
          <Button type="submit" aria-label="First_Group" variant="primary">
            로그인
          </Button>
          <ButtonGroup aria-label="Second group" className="Id_pass">
            <Button variant="primary" onClick={goToIdSearch}>
              아이디 찾기
            </Button>
            <Button
              className="Pass"
              variant="primary"
              onClick={goToPasswordSearch}
            >
              비밀번호 찾기
            </Button>
          </ButtonGroup>
          <Button
            aria-label="Third group"
            className="SignUp"
            variant="primary"
            onClick={goToSignUp}
          >
            회원가입
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Login = ({ setAuthenticate }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("ccee64d52026e46448ac815273a89fda");
    }
  }, []);

  const kakaoLogin = (event) => {
    event.preventDefault();
    // 카카오 로그아웃 수행
    window.Kakao.Auth.logout(() => {
      console.log("카카오 로그아웃 완료");

      // 로그아웃 시 로컬 스토리지 또는 세션 스토리지에서 사용자 정보 삭제
      localStorage.removeItem("userInfo"); // 예시: 로컬 스토리지에서 삭제
      sessionStorage.removeItem("userInfo"); // 예시: 세션 스토리지에서 삭제

      // 카카오 로그인 요청
      window.Kakao.Auth.login({
        scope: "profile_nickname,account_email,birthday,talk_message",
        success: (response) => {
          console.log("카카오 로그인 성공", response);
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              const kakao_account = res.kakao_account;
              console.log(kakao_account);
              // 카카오 로그인 성공 시, 로그인 상태를 true로 설정
              setAuthenticate(true);
              navigate("/");
            },
          });
        },
        fail: (error) => {
          console.log("카카오 로그인 실패", error);
        },
      });
    });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      console.log("로그인 요청을 시도합니다...");

      const response = await axios.post("/member/login", {
        userId: id,
        userPw: password,
      });

      const logout = () => {
        // 카카오 로그아웃 수행
        window.Kakao.Auth.logout(() => {
          console.log("카카오 로그아웃 완료");
        });
        // 로그인 상태를 false로 설정
        setAuthenticate(false);
      };

      console.log("서버 응답:", response);

      if (response.status === 200 && response.data !== "로그인 실패") {
        console.log("로그인 성공!");
        setAuthenticate(true);
        navigate("/");
      } else {
        console.log("로그인 실패. 서버 응답:", response);
        alert("로그인 실패. 다시 로그인 해주세요.");
        navigate("/login");
      }
    } catch (error) {
      console.error("로그인 요청 실패. 에러 정보:", error);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  const goToSignUp = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/SighUp");
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
        <Button variant="warning" onClick={kakaoLogin}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQOJtNpYFKTS1T5QdhIDFFgLzQO93BuFjFw&usqp=CAU"
            alt="Kakao Login"
            style={{ width: "100%", height: "auto" }}
          />
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

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

    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      setAuthenticate(true);
      navigate("/");
    }
  }, [navigate, setAuthenticate]);

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
      const response = await axios.post(
        "http://13.48.105.95:8080/member/login",
        {
          userId: id,
          userPw: password,
        }
      );

      const joinForm1 = response.data;

      // console.log("joinForm1 값:", joinForm1);

      const logout = () => {
        // 카카오 연결 끊기 요청
        if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
          window.Kakao.API.request({
            url: "/v1/user/unlink",
            success: (response) => {
              console.log("카카오 연결 끊기 성공", response);
            },
            fail: (error) => {
              console.log("카카오 연결 끊기 실패", error);
            },
          });
        }

        // 로그인 상태를 false로 설정
        setAuthenticate(false);
        console.log("사용자 로그아웃");
      };

      console.log("서버 응답:", response);

      if (response.status === 200 && response.data !== "로그인 실패") {
        sessionStorage.setItem("userInfo", JSON.stringify({ joinForm1 }));
        setAuthenticate(true);
        navigate("/");
        console.log("joinForm1 값:", joinForm1);
      } else {
        alert("로그인 실패. 다시 로그인 해주세요.");
        navigate("/login");
      }
    } catch (error) {
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
    // setAuthenticate(true);
    navigate("/IdSearch");
  };

  const goToPasswordSearch = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/PasswordSearch");
  };

  // Function to perform logout
  // const performLogout = async () => {
  //   try {
  //     // Send a logout request to the server
  //     // Replace '/logout' with the actual API endpoint for logging out
  //     const response = await axios.post("/logout");

  //     // Check if the logout was successful
  //     if (response.status === 200) {
  //       // Remove user information from local state or storage
  //       setId("");
  //       setPassword("");

  //       // Navigate to the login or home page
  //       navigate("/"); // Replace '/' with the actual path if different
  //     }
  //   } catch (error) {
  //     console.error("Failed to log out:", error);
  //   }
  // };
  return (
    <Container className="login-area">
      <Form onSubmit={login} className="login-form">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="id"
            placeholder="id"
            name="userId"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
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
        <img
          onClick={kakaoLogin}
          src="kakao.png"
          alt="Kakao Login"
          style={{
            cursor: "pointer",
            width: "160px",
            height: "60px",
            marginLeft: "210px",
            marginTop: "10px",
          }}
        />
      </Form>
    </Container>
  );
};

export default Login;

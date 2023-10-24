import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { deleteCookie, saveCookie } from "../common/CookieUtil";
import { useDispatch } from "react-redux";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      // env 적용
      window.Kakao.init(process.env.REACT_APP_Kakao_Login);
    }
  }, []);

  /**
   * 카카오 로그인
   * 카카오에 로그인 후 토큰을 받아, 그 토큰을 서버로 보내 accessToken을 발행
   * @param {*} event
   */
  const kakaoLogin = (event) => {
    event.preventDefault();

    // 카카오 로그인 요청
    window.Kakao.Auth.login({
      scope: "profile_nickname,account_email,birthday,talk_message",
      success: async (response) => {
        try {
          const kakaoLoginRes = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/member/kakao-login",
            {
              accessToken: response.access_token,
            }
          );
          if (kakaoLoginRes.status === 200) {
            // accessToken을 쿠키에 저장
            saveCookie(
              kakaoLoginRes.data.accessToken,
              kakaoLoginRes.data.tokenExpiresIn
            );
            navigate("/");
          } else {
            alert("로그인 실패. 다시 로그인 해주세요.");
            navigate("/login");
          }
        } catch (error) {
          console.error("로그인 오류:", error);
          deleteCookie("accessToken");
          alert("아이디와 비밀번호를 확인해주세요");
        }
      },
      fail: (error) => {
        console.log("카카오 로그인 실패", error);
        deleteCookie("accessToken");
      },
    });
  };

  /**
   * 일반 로그인
   * @param {*} event
   */
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/member/login",
        {
          userId: id,
          userPw: password,
        }
      );

      console.log("Response from login:", response.data);

      if (response.status === 200 && response.data !== "로그인 실패") {
        // accessToken을 쿠키에 저장
        saveCookie(response.data.accessToken, response.data.tokenExpiresIn);
        navigate("/");
      } else {
        alert("로그인 실패. 다시 로그인 해주세요.");
        deleteCookie("accessToken");
        navigate("/login");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      deleteCookie("accessToken");
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  const goToSignUp = (event) => {
    event.preventDefault();
    navigate("/SighUp");
  };

  const goToIdSearch = (event) => {
    event.preventDefault();
    navigate("/IdSearch");
  };

  const goToPasswordSearch = (event) => {
    event.preventDefault();
    navigate("/PasswordSearch");
  };

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

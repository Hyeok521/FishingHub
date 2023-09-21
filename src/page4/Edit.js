import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios"; // axios 라이브러리를 추가
import { getAuthentication } from "../common/CookieUtil";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [snsAccessToken, setSnsAccessToken] = useState();
  const [formData, setFormData] = useState({
    beforePassword: "",
    afterPassword: "",
    userNick: "",
    userNm: "",
    email: "",
    mobile: "",
    loginType: "",
    birth: "",
  });

  const handleWd = (event) => {
    event.preventDefault();
    // setAuthenticate();
    navigate("/Withdrawal");
  };

  useEffect(() => {
    getUserInfo().then(() => {
      // SNS 로그인인 경우 카카오 SDK 초기화
      if (formData.loginType === "SNS") {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("ccee64d52026e46448ac815273a89fda");
        }
      }
    });
  }, []);

  /**
   * 사용자 정보를 가져오는 함수
   */
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://13.48.105.95:8080/member/info", {
        headers: {
          Authorization: "Bearer " + getAuthentication(),
        },
      });
      if (response.status === 200) {
        setUserInfo(response.data);
        setFormData({
          ...formData,
          loginType: response.data.loginType,
          userNm: response.data.userNm,
          email: response.data.email,
          mobile: response.data.mobile,
          birth: response.data.birth,
          userNick: response.data.userNick,
        });
      } else {
        alert("잘못된 접근입니다.");
        navigate("/");
      }
    } catch (error) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * 수정 버튼 클릭 이벤트
   * @returns {Promise<void>}
   */
  const handleEdit = async () => {
    try {
      if (formData.loginType === "SNS") {
        // 카카오 로그인 요청
        window.Kakao.Auth.login({
          scope: "profile_nickname,account_email,birthday,talk_message",
          success: async (response) => {
            setSnsAccessToken(response.access_token);
            await handleSubmit();
          },
          fail: (error) => {
            alert("인증 실패. 다시 시도해보세요.");
            navigate("/Edit");
          },
        });
      } else {
        await handleSubmit();
      }
    } catch (error) {
      console.log(error);
      alert("회원정보 수정에 실패하였습니다.");
    }
  };

  /**
   * 회원 정보 수정 API 호출
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://13.48.105.95:8080/mypage/updateMemberInfo",
        {
          userPw: formData.beforePassword,
          afterUserPw: formData.afterPassword,
          userNick: formData.userNick,
          userNm: formData.userNm,
          email: formData.email,
          mobile: formData.mobile,
          loginType: formData.loginType,
          birth: formData.birth,
          accessToken: snsAccessToken,
        },
        {
          headers: {
            Authorization: "Bearer " + getAuthentication(),
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("회원정보 수정에 성공하였습니다.");
        navigate("/");
      } else {
        alert("회원정보 수정에 실패하였습니다.");
      }
    } catch (error) {
      alert("회원정보 수정에 실패하였습니다.");
    }
  };

  return (
    // 아이디는 변경하면 안되기 때문에 제거. 비밀번호는 일반 로그인 상태에서만 노출
    <Container>
      {userInfo && (
        <Form className="SighUp-form">
          {userInfo.loginType === "NORMAL" && (
            <>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="beforePassword"
                  placeholder="현재 비밀번호를 입력하세요"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Check</Form.Label>
                <Form.Control
                  type="password"
                  name="afterPassword"
                  placeholder="변경할 비밀번호를 입력하세요"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="userNick"
              value={formData.userNick}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>사용자 이름</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="userNm"
              value={formData.userNm}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label>핸드폰 번호</Form.Label>
            <Form.Control
              type="tel"
              placeholder=""
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label>생년월일</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="birth"
              value={formData.birth}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="SighUp">
            <span>
              <Button
                style={{ marginRight: "5px" }}
                variant="primary"
                type="button"
                onClick={handleEdit}
              >
                수정
              </Button>
              <Button
                style={{ marginRight: "60px" }}
                variant="primary"
                type="button"
                onClick={handleWd}
              >
                탈퇴
              </Button>
            </span>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default Edit;

import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { deleteCookie, getAuthentication } from "../common/CookieUtil";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/authSlice";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfos] = useState();
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

  const userIdRegex = /^[a-zA-Z0-9]{5,15}$/;
  const userNickRegex = /^.{2,10}$/;
  const userNmRegex = /^[가-힣]{2,5}$/;
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const handleWd = () => {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + "/member/me", {
        headers: { Authorization: `Bearer ${getAuthentication()}` },
      })
      .then(() => {
        alert("탈퇴되었습니다.");
        deleteCookie("accessToken");
        dispatch(setUserInfo(null));
        navigate("/login");
      })
      .catch(() => {
        alert("실패하였습니다.");
      });
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      // SNS 로그인인 경우 카카오 SDK 초기화
      if (res.loginType === "SNS") {
        alert("SNS 로그인 유저는 회원정보를 수정할 수 없습니다.");
        navigate("/");
      }
    });
  }, []);

  /**
   * 사용자 정보를 가져오는 함수
   */
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/member/info",
        {
          headers: {
            Authorization: "Bearer " + getAuthentication(),
          },
        }
      );
      if (response.status === 200) {
        setUserInfos(response.data);
        setFormData({
          ...formData,
          loginType: response.data.loginType,
          userNm: response.data.userNm,
          email: response.data.email,
          mobile: response.data.mobile,
          birth: response.data.birth,
          userNick: response.data.userNick,
        });
        return response.data;
      } else {
        alert("잘못된 접근입니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
    // 유효성 검사
    if (!userIdRegex.test(formData.userId)) {
      alert("아이디는 5~15자의 알파벳과 숫자로만 구성되어야 합니다.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!passwordRegex.test(formData.afterPassword)) {
      alert(
        "새 비밀번호는 최소 8자리, 하나의 대문자, 하나의 소문자, 하나의 숫자가 필요합니다."
      );
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
      const response = await axios.put(
        process.env.REACT_APP_SERVER_URL + "/member/update-info",
        {
          userPw: formData.beforePassword,
          newUserPw: formData.afterPassword,
          userNickname: formData.userNick,
          userName: formData.userNm,
          email: formData.email,
          mobile: formData.mobile,
          birth: formData.birth,
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
      console.error(error);
      alert(error.response.data.message);
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

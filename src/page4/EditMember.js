import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./page4.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {getAuthentication} from "../common/CookieUtil";

const EditMember = () => {
    // 내부 상태로 authenticate와 setAuthenticate를 관리
    // const [authenticate, setAuthenticate] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: "",
    });
    const [loginType, setLoginType] = useState();

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (loginType === "SNS") {
            // Kakao SDK 초기화
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init("ccee64d52026e46448ac815273a89fda");
            }
        }
    }, [loginType]);

    const getUserInfo = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/member/info", {
                headers: {
                    Authorization: "Bearer " + getAuthentication(),
                },
            });

            console.log(response);

            if (response.status === 200) {
                setLoginType(response.data.loginType);
            } else {
                alert("잘못된 접근입니다.");
                navigate("/");
            }
        } catch (error) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        try {
            // 비밀번호를 서버로 전송하여 회원 정보를 조회
            const response = await axios.post(
                process.env.REACT_APP_SERVER_URL + "/mypage/mypage",
                {
                    userPw: formData.password,
                }
            );

            // 응답 데이터 확인
            console.log("회원 정보 조회 응답:", response.data);

            if (response.data.success) {
                // 회원 정보 조회 성공
                navigate("/Edit"); // /Edit 페이지로 이동
            } else {
                // 회원 정보 조회 실패
                alert("회원 정보 조회에 실패했습니다. 비밀번호를 확인해주세요.");
            }
        } catch (error) {
            console.error("회원 정보 조회 오류:", error);
            alert("로그인 상태를 확인해주세요.");
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form data submitted:", formData);
    };

    /**
     * 카카오 로그인
     * 카카오에 로그인 후 토큰을 받아, 그 토큰을 서버로 보내 accessToken을 발행
     * @param {*} event
     */
    const kakaoAuth = (event) => {
        event.preventDefault();

        // 카카오 로그인 요청
        window.Kakao.Auth.login({
            scope: "profile_nickname,account_email,birthday,talk_message",
            success: async (response) => {
                try {
                    const kakaoLoginRes = await axios.post(
                        process.env.REACT_APP_SERVER_URL + "/mypage/kakaoAuth",
                        {
                            accessToken: response.access_token,
                        }
                    );
                    if (kakaoLoginRes.status === 200) {
                        navigate("/Edit");
                        // // accessToken을 쿠키에 저장
                        // saveCookie(kakaoLoginRes.data.accessToken, kakaoLoginRes.data.tokenExpiresIn);
                        // setAuthenticate(true);
                        // navigate('/');
                    } else {
                        alert("인증 실패. 다시 시도해보세요.");
                        navigate("/EditMember");
                    }
                } catch (error) {
                    alert("인증 실패. 다시 시도해보세요.");
                    navigate("/EditMember");
                }
            },
            fail: (error) => {
                alert("인증 실패. 다시 시도해보세요.");
                navigate("/EditMember");
            },
        });
    };

    return (
        <Container className="EmBody">
            <Row className="EmBodyRow">
                <Col xs={12} md={8} className="EmBodyCol">
                    <h4>회원정보 수정</h4>
                    {loginType &&
                        (loginType === "NORMAL" ? (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>비밀번호</Form.Label>
                                        <Form.Control
                                            className="EmCtl"
                                            type="password"
                                            placeholder="비밀번호를 입력하세요"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Form>
                                <div className="button-container">
                                    <Button
                                        className="EmButton"
                                        onClick={handleEdit}
                                        variant="primary"
                                        type="button"
                                    >
                                        수정
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="button-container">
                                    <Button
                                        className="EmButton"
                                        onClick={kakaoAuth}
                                        variant="primary"
                                        type="button"
                                    >
                                        카카오톡 인증
                                    </Button>
                                </div>
                            </>
                        ))}
                </Col>
            </Row>
        </Container>
    );
};

export default EditMember;

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {getCookie} from "../common/CookieUtil";


const Withdrawal = ({authenticate, setAuthenticate}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie("accessToken"); // 쿠키에서 토큰을 가져옵니다.
            const response = await axios.delete(
                process.env.REACT_APP_SERVER_URL + "/mypage/delete",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가합니다.
                    },
                    data: {
                        userPw: password,
                        email: email,
                    },
                }
            );
            if (response.status === 200) {
                // setMessage("회원 탈퇴 성공");
                alert("회원탈퇴성공");
                setMessage(response.data);
                setMessage(response.data);
                setAuthenticate(false); // 로그아웃 처리
                navigate("/"); // 메인 페이지로 리다이렉트
            } else {
                setMessage("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            setMessage("올바른 정보를 입력해주세요");
        }
    };

    return (
        <Container className="unregister-container">
            <h4>회원 탈퇴</h4>
            {message && <Alert variant="danger">{message}</Alert>}
            <Form className="unregister" onSubmit={handleSubmit}>
                <Form.Group className="unregister-1" controlId="formBasicEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="이메일을 입력하세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="unregister-2" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button className="unregister-button" variant="primary" type="submit">
                    회원 탈퇴
                </Button>
            </Form>
        </Container>
    );
};

export default Withdrawal;

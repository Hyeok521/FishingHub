import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 라이브러리를 추가
import "./page4.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditMember = () => {
  // 내부 상태로 authenticate와 setAuthenticate를 관리
  // const [authenticate, setAuthenticate] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      // 비밀번호를 서버로 전송하여 회원 정보를 조회
      const response = await axios.post(
        "http://13.48.105.95:8080/member/mypage",
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

  const handleWd = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/Withdrawal");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <Container className="EmBody">
      <Row className="EmBodyRow">
        <Col xs={12} md={8} className="EmBodyCol">
          <h4>회원정보 수정</h4>
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
        </Col>
      </Row>
    </Container>
  );
};

export default EditMember;

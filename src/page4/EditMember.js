import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditMember = () => {
  // 내부 상태로 authenticate와 setAuthenticate를 관리
  const [authenticate, setAuthenticate] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleEdit = (event) => {
    event.preventDefault();
    setAuthenticate(true); // 상태를 true로 설정
    navigate("/Edit"); // /Edit 페이지로 이동
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
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h1>회원정보 수정</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Id를 입력하세요"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="홍길동@naver.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button onClick={handleEdit} variant="primary" type="button">
              수정하기
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditMember;

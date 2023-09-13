import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./page4.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditMember = () => {
  // 내부 상태로 authenticate와 setAuthenticate를 관리
  // const [authenticate, setAuthenticate] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleEdit = (event) => {
    event.preventDefault();
    // setAuthenticate(true); // 상태를 true로 설정
    navigate("/Edit"); // /Edit 페이지로 이동
  };

  const handleWd = (event) => {
    event.preventDefault();
    // setAuthenticate(true); // 상태를 true로 설정
    navigate("/Withdrawal"); // /Edit 페이지로 이동
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
      <Row className="EmBodyCol">
        <Col xs={12} md={8}>
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
          <Button
            className="EmButton"
            onClick={handleEdit}
            variant="primary"
            type="button"
          >
            수정
          </Button>

          <Button
            className="WdButton"
            onClick={handleWd}
            variant="primary"
            type="button"
          >
            탈퇴
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditMember;

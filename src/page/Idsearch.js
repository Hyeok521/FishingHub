import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const Idsearch = () => {
  const [formData, setFormData] = useState({
    userNm: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/member/searchId", formData);
      if (response.data.message && response.data.foundId) {
        alert(`${response.data.message} ${response.data.foundId}`);
      } else if (response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("아이디 찾기 실패:", error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <Container className="IdSet">
      <Form className="IdForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            name="userNm"
            placeholder="홍길동"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="홍길동@naver.com"
            required
            onChange={handleChange}
          />
          <Button type="submit" style={{ marginTop: "10px" }}>
            찾기
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Idsearch;

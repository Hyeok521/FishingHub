import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";

const Idsearch = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
  });

  const [emailDomain, setEmailDomain] = useState("");
  const emailDomains = ["@naver.com", "@gmail.com", "@daum.net"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeEmailDomain = (e) => {
    const selectedDomain = e.target.value;
    setEmailDomain(selectedDomain);

    if (selectedDomain) {
      setFormData({
        ...formData,
        email: formData.email.split("@")[0] + selectedDomain,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/member/search-id",
        formData
      );
      if (response.status === 200) {
        alert(`${response.data}입니다.`);
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
            style={{ width: "38.5em" }}
            type="text"
            name="userName"
            placeholder="홍길동"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <div className="input-group">
            <Form.Control
              type="email"
              name="email"
              placeholder="홍길동@naver.com"
              required
              value={formData.email}
              onChange={handleChange}
              style={{ borderRight: "1px solid black" }}
            />
            <select onChange={handleChangeEmailDomain} value={emailDomain}>
              <option value="">이메일 선택</option>
              {emailDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" style={{ marginTop: "10px" }}>
            찾기
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Idsearch;

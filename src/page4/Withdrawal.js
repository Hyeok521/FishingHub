import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const Withdrawal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 회원 탈퇴 로직을 작성하세요.
    // 예를 들어, axios.post("/api/unsubscribe", { email, password }) 같은 형태가 될 수 있습니다.

    // 성공했다면
    setMessage("회원 탈퇴가 성공적으로 완료되었습니다.");

    // 실패했다면
    // setMessage("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
  };

  return (
    <Container className="unregister-container">
      <h4>회원 탈퇴</h4>
      {message && <Alert variant="info">{message}</Alert>}
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

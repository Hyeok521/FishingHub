import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const Edit = () => {
  return (
    <Container>
      <Form className="SighUp-form">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="변경할 비밀번호를 입력하세요"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="text" placeholder="변경할 닉네임을 입력하세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>핸드폰 번호</Form.Label>
          <Form.Control
            type="tel"
            placeholder="변경할 핸드폰 번호를 입력하세요"
          />
        </Form.Group>

        <span>
          <Button className="SighUp" variant="primary" type="submit">
            회원가입
          </Button>
        </span>
      </Form>
    </Container>
  );
};

export default Edit;

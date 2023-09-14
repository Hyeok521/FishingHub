import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const Edit = () => {
  return (
    <Container>
      <Form className="SighUp-form">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password Check</Form.Label>
          <Form.Control
            type="password"
            placeholder="변경할 비밀번호를 입력하세요"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>사용자 이름</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>email</Form.Label>
          <Form.Control type="email" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>핸드폰 번호</Form.Label>
          <Form.Control type="tel" placeholder="" />
        </Form.Group>

        <span>
          <Button className="SighUp" variant="primary" type="submit">
            수정
          </Button>
        </span>
      </Form>
    </Container>
  );
};

export default Edit;

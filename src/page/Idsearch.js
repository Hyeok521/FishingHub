import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const Idsearch = () => {
  return (
    <Container className="IdSet">
      <Form className="IdForm">
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>핸드폰 인증</Form.Label>
          <Form.Control
            type="tel"
            placeholder="010-0000-0000   /   하이픈(-)포함해서 입력"
            required
          />
          <Button type="submit" style={{ marginTop: "10px" }}>
            발송
          </Button>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>email 인증</Form.Label>
          <Form.Control type="email" placeholder="홍길동@naver.com" />
          <Button type="submit" style={{ marginTop: "10px" }}>
            발송
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Idsearch;

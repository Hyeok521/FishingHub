import React from "react";
import { Form, Button, Container } from "react-bootstrap";
//
const SighUp = () => {
  return (
    <Container className="SighUp-area">
      <Form className="SighUp-form">
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디를 입력하세요"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password check</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control type="email" placeholder="홍길동@naver.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="text" placeholder="기타치는물고기" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="홍길동" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirthDate">
          <Form.Label>생년월일</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>핸드폰 번호</Form.Label>
          <Form.Control type="tel" placeholder="010-0000-0000" />
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

export default SighUp;

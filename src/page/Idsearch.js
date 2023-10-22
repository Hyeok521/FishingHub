import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";


const Idsearch = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                        style={{width: "40em"}}
                        type="text"
                        name="userName"
                        placeholder="홍길동"
                        required
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        style={{width: "40em"}}
                        type="email"
                        name="email"
                        placeholder="홍길동@naver.com"
                        required
                        onChange={handleChange}
                    />
                    <Button type="submit" style={{marginTop: "10px"}}>
                        찾기
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Idsearch;

import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userNm: "",
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
      // EC2 서버 포트로 전송
      const response = await axios.post(
        "http://13.48.105.95:8080/member/join",
        formData
      );
      console.log(response.data);
      // 성공 처리
    } catch (error) {
      console.error(error);
      // 실패 처리
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        아이디 :
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        비밀번호 :
        <input
          type="password"
          name="userPw"
          value={formData.userPw}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        이름 :
        <input
          type="text"
          name="userNm"
          value={formData.userNm}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">버튼</button>
    </form>
  );
};

export default SignUpForm;

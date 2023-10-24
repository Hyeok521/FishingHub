import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import WeatherWidget from "./WeatherWidget";
import { deleteCookie } from "../common/CookieUtil";
import { ROLE_ADMIN } from "../common/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const menuList = ["게시판", "정보제공", "고객센터", "마이페이지"];
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  // 로그아웃
  const logout = () => {
    // 일반 로그인이든 카카오 로그인이든 단순히 쿠키에 담겨있는 토큰을 삭제하기만 하면 로그아웃 상태입니다.
    deleteCookie("accessToken");

    dispatch(setUserInfo(null));
    console.log("사용자 로그아웃");
    navigate("/");
  };

  const Communityboard = (event) => {
    event.preventDefault();
    navigate("/Communityboard");
  };

  const Fishingboard = (event) => {
    event.preventDefault();
    navigate("/Fishingboard");
  };

  const TrendBoard = (event) => {
    event.preventDefault();
    navigate("/TrendBoard");
  };

  const PointerInfo_1 = (event) => {
    event.preventDefault();
    navigate("/PointerInfo_1");
  };

  const AnnounCement = (event) => {
    event.preventDefault();
    navigate("/AnnounCement");
  };

  const Faq = (event) => {
    event.preventDefault();
    navigate("/Faq");
  };

  const QNA = (event) => {
    event.preventDefault();
    navigate("/QNA");
  };

  const EditMember = (event) => {
    event.preventDefault();
    navigate("/Edit");
  };

  const MemberList = (event) => {
    event.preventDefault();
    navigate("/memberList?page=1");
  };
  return (
    <div>
      <div className="header-void">Welcome to Fishing Hub!</div>
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>
        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) =>
            menu === "마이페이지" && auth?.userType === ROLE_ADMIN ? (
              <button key={index}>회원 관리</button>
            ) : (
              <button key={index}>{menu}1</button>
            )
          )}
        </div>
      </div>

      <div className="burger-menu hide">
        <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
      </div>

      <div
        className="nav-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="Logo">
          <Link to="/">
            <img width={100} src="FNH3.png" />
          </Link>
        </div>

        <ul
          className="menu"
          style={{
            display: "flex",
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {menuList.map((menu, index) => (
            <li key={index} className="Highdrop">
              <Dropdown>
                <Dropdown.Toggle variant="light" id={`dropdown-${menu}`}>
                  {menu === "마이페이지" && auth?.userType === ROLE_ADMIN
                    ? "회원관리"
                    : menu}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {menu === "게시판" && (
                    <>
                      <Dropdown.Item
                        eventKey="1"
                        onClick={Communityboard}
                        className="menu-item"
                      >
                        커뮤니티 게시판
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={Fishingboard}
                        className="menu-item"
                      >
                        출조정보 게시판
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={TrendBoard}
                        className="menu-item"
                      >
                        조황정보 게시판
                      </Dropdown.Item>
                    </>
                  )}
                  {menu === "정보제공" && (
                    <>
                      <Dropdown.Item
                        eventKey="1"
                        onClick={PointerInfo_1}
                        className="menu-item"
                      >
                        포인트 정보
                      </Dropdown.Item>
                    </>
                  )}
                  {menu === "고객센터" && (
                    <>
                      <Dropdown.Item
                        eventKey="1"
                        onClick={AnnounCement}
                        className="menu-item"
                      >
                        공지사항
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={Faq}
                        className="menu-item"
                      >
                        FAQ
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={QNA}
                        className="menu-item"
                      >
                        Q&A
                      </Dropdown.Item>
                    </>
                  )}
                  {menu === "마이페이지" &&
                    (auth?.userType === ROLE_ADMIN ? (
                      <Dropdown.Item
                        eventKey="1"
                        onClick={MemberList}
                        className="menu-item"
                      >
                        회원관리
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        eventKey="1"
                        onClick={EditMember}
                        className="menu-item"
                      >
                        회원정보 수정
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ))}
        </ul>

        <div className="LogSet">
          {auth ? (
            <div onClick={logout}>
              <FontAwesomeIcon icon={faUser} />
              <span style={{ cursor: "pointer" }}>로그아웃</span>
            </div>
          ) : (
            <div onClick={() => navigate("/login")}>
              <FontAwesomeIcon icon={faUser} />
              <span style={{ cursor: "pointer" }}>로그인</span>
            </div>
          )}
        </div>
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Navbar;

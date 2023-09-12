import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import WeatherWidget from "./WeatherWidget";

const Navbar = ({ authenticate, setAuthenticate }) => {
  const menuList = ["게시판", "정보제공", "고객센터", "마이페이지"];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  const Communityboard = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/Communityboard");
  };

  const Fishingboard = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/Fishingboard");
  };

  const TrendBoard = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/TrendBoard");
  };

  const AnnounCement = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/AnnounCement");
  };

  const Faq = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/Faq");
  };

  const QNA = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/QNA");
  };

  const EditMember = (event) => {
    event.preventDefault();
    // setAuthenticate(true);
    navigate("/EditMember");
  };

  return (
    <div>
      <div className="header-void">Welcome to Fishing Hub!</div>
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>
        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
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
                  {menu}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {menu === "게시판" && (
                    <>
                      <Dropdown.Item eventKey="1" onClick={Communityboard}>
                        커뮤니티 게시판
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={Fishingboard}>
                        출조정보 게시판
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3" onClick={TrendBoard}>
                        조황정보 게시판
                      </Dropdown.Item>
                    </>
                  )}
                  {menu === "정보제공" && (
                    <>
                      <Dropdown.Item eventKey="1">어종정보</Dropdown.Item>
                      <Dropdown.Item eventKey="2">포인터 정보</Dropdown.Item>
                      <Dropdown.Item eventKey="3">날씨 정보</Dropdown.Item>
                    </>
                  )}
                  {menu === "고객센터" && (
                    <>
                      <Dropdown.Item eventKey="1" onClick={AnnounCement}>
                        공지사항
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={Faq}>
                        FAQ
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3" onClick={QNA}>
                        Q&A
                      </Dropdown.Item>
                    </>
                  )}
                  {menu === "마이페이지" && (
                    <Dropdown.Item eventKey="1" onClick={EditMember}>
                      회원정보 수정
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ))}
        </ul>

        <div className="LogSet">
          {authenticate ? (
            <div onClick={() => setAuthenticate(false)}>
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

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
//

const Navbar = ({ authenticate, setAuthenticate }) => {
  const menuList = ["게시판", "정보제공", "고객센터", "마이페이지"];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`?q=${event.target.value}`);
    }
  };
  return (
    <div>
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

      <div className="nav-header">
        <div className="Logo">
          <Link to="/">
            <img width={100} src="FNH3.png" />
          </Link>
        </div>

        <div className="LogSet">
          {authenticate ? (
            <div onClick={() => setAuthenticate(false)}>
              <FontAwesomeIcon icon={faUser} />
              <span tyle={{ cursor: "pointer" }}>로그아웃</span>
            </div>
          ) : (
            <div onClick={() => navigate("/login")}>
              <FontAwesomeIcon icon={faUser} />
              <span style={{ cursor: "pointer" }}>로그인</span>
            </div>
          )}
        </div>
      </div>

      <div class="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index} className="Highdrop">
              <Dropdown>
                <Dropdown.Toggle variant="light" id={`dropdown-${menu}`}>
                  {menu}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {menu === "게시판" && (
                    <>
                      <Dropdown.Item eventKey="1">
                        커뮤니티 게시판
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2">
                        출조정보 게시판
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3">
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
                      <Dropdown.Item eventKey="1">공지사항</Dropdown.Item>
                      <Dropdown.Item eventKey="2">FAQ</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Q&A</Dropdown.Item>
                    </>
                  )}
                  {menu === "마이페이지" && (
                    <Dropdown.Item eventKey="1">회원정보 수정</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ))}
        </ul>

        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="제품검색" onKeyPress={onCheckEnter} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

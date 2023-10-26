import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./page2/page2.css";
import "./page4/page4.css";
import { useSelector } from "react-redux";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router";
import ProductAll from "./page/ProductAll";
import SighUp from "./page/SighUp";
import Idsearch from "./page/Idsearch";
import PasswordSearch from "./page/PasswordSearch";
import Login from "./page/Login";
import PrivateRoute from "./Route/PrivateRoute";
import Board from "./page/Board";
import PointerInfo_1 from "./page2/PointerInfo_1";
import Edit from "./page4/Edit";
import PointerInfo_2 from "./page2/PointerInfo_2";
import MemberList from "./page4/MemberList";
import PointerInfo_3 from "./page2/PointerInfo_3";
import PointerInfo_4 from "./page2/PointerInfo_4";
import PointerInfo_5 from "./page2/PointerInfo_5";
import PointerInfo_6 from "./page2/PointerInfo_6";
import PointerInfo_7 from "./page2/PointerInfo_7";
import PointerInfo_8 from "./page2/PointerInfo_8";
import PublicRoute from "./Route/PublicRoute";

function App() {
  const auth = useSelector((state) => state.auth.auth);
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    function checkScreenWidth() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const screenRatio = (screenWidth / screenHeight) * 100;

      if (screenRatio >= 125) {
        document.body.style.overflowX = "hidden";
      } else {
        document.body.style.overflowX = "hidden";
      }
    }

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div>
      {/*<Loading/>*/}
      <Navbar auth={auth} />
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<PublicRoute children={<ProductAll />} />} />

        {/* 회원 가입 */}
        <Route
          path="/SighUp"
          element={<PublicRoute children={<SighUp />} notLogin={true} />}
        />

        {/* 아이디 찾기 */}
        <Route
          path="/Idsearch"
          element={<PublicRoute children={<Idsearch />} notLogin={true} />}
        />

        {/* 비밀번호 찾기 */}
        <Route
          path="/PasswordSearch"
          element={
            <PublicRoute children={<PasswordSearch />} notLogin={true} />
          }
        />

        {/* 로그인 */}
        <Route
          path="/login"
          element={<PublicRoute children={<Login />} notLogin={true} />}
        />

        {/* 게시판 S */}
        <Route
          path="/Communityboard"
          element={<PublicRoute children={<Board boardMasterId={1} />} />}
        />
        <Route
          path="/Fishingboard"
          element={<PublicRoute children={<Board boardMasterId={2} />} />}
        />
        <Route
          path="/TrendBoard"
          element={<PublicRoute children={<Board boardMasterId={3} />} />}
        />
        <Route
          path="/AnnounCement"
          element={<PublicRoute children={<Board boardMasterId={4} />} />}
        />
        <Route
          path="/Faq"
          element={<PublicRoute children={<Board boardMasterId={5} />} />}
        />
        <Route
          path="/QNA"
          element={<PublicRoute children={<Board boardMasterId={6} />} />}
        />
        {/* 게시판 E */}

        {/* 회원정보 수정 */}
        <Route
          path="/Edit"
          element={
            <PrivateRoute children={<Edit authenticate={authenticate} />} />
          }
        />

        {/* 회원 관리 */}
        <Route
          path="/memberList"
          element={<PrivateRoute children={<MemberList />} isAdmin={true} />}
        />

        {/* 정보 제공 S */}
        <Route
          path="/PointerInfo_1"
          element={<PublicRoute children={<PointerInfo_1 />} />}
        />
        <Route
          path="/PointerInfo_2"
          element={<PublicRoute children={<PointerInfo_2 />} />}
        />
        <Route
          path="/PointerInfo_3"
          element={<PublicRoute children={<PointerInfo_3 />} />}
        />
        <Route
          path="/PointerInfo_4"
          element={<PublicRoute children={<PointerInfo_4 />} />}
        />
        <Route
          path="/PointerInfo_5"
          element={<PublicRoute children={<PointerInfo_5 />} />}
        />
        <Route
          path="/PointerInfo_6"
          element={<PublicRoute children={<PointerInfo_6 />} />}
        />
        <Route
          path="/PointerInfo_7"
          element={<PublicRoute children={<PointerInfo_7 />} />}
        />
        <Route
          path="/PointerInfo_8"
          element={<PublicRoute children={<PointerInfo_8 />} />}
        />
        {/* 정보 제공 E */}
      </Routes>
      <Footer authenticate={authenticate} setAuthenticate={setAuthenticate} />
    </div>
  );
}

export default App;

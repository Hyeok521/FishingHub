import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./page2/page2.css";
import "./page4/page4.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import PrivateRoute from "./Route/PrivateRoute";
import SighUp from "./page/SighUp";
import Idsearch from "./page/Idsearch";
import PasswordSearch from "./page/PasswordSearch";
import Communityboard from "./page/Communityboard";
import Footer from "./component/Footer";
import Fishingboard from "./page/Fishingboard";
import TrendBoard from "./page/TrendBoard";
import FishInformation from "./page2/FishInformation";
import PointerInformation from "./page2/PointerInformation";
import WeatherInformation from "./page2/WeatherInformation";
import AnnounCement from "./page3/AnnounCement";
import Faq from "./page3/Faq";
import QNA from "./page3/QNA";
import EditMember from "./page4/EditMember";
import Edit from "./page4/Edit";
import Withdrawal from "./page4/Withdrawal";
import { getAuthentication, getCookie } from "./common/CookieUtil";

function App() {
  let [authenticate, setAuthenticate] = useState(false);
  const handleResize = () => {
    const zoomLevel = window.outerWidth / window.innerWidth;
    if (zoomLevel >= 1.0) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
    }
  };

  // 컴포넌트가 마운트되거나 언마운트될 때 이벤트 리스너를 추가/제거
  useEffect(() => {
    // 쿠키에서 accessToken을 가져와 authenticate를 업데이트합니다.
    // 이 useEffect는 새로고침, 페이지 이동 때마다 실행되는데, 이때마다 계속 서버로 토큰의 유효성 검사를 요청하는 것은 불필요할 것 같습니다.
    // 어차피 쿠키에 토큰의 유효시간 동안 저장을 하고, 인증이 필요한 로직에는 accessToken을 같이 서버로 넘기기 때문에, 그 때 검사를 해도 충분한 것 같습니다.
    const accessToken = getAuthentication();
    setAuthenticate(accessToken ? true : false);
  }, []);

  return (
    <div>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route
          path="/SighUp"
          element={<SighUp setAuthenticate={setAuthenticate} />}
        />
        <Route
          path="/Idsearch"
          element={<Idsearch setAuthenticate={setAuthenticate} />}
        />
        <Route
          path="/PasswordSearch"
          element={<PasswordSearch setAuthenticate={setAuthenticate} />}
        />
        <Route
          path="/login"
          element={<Login setAuthenticate={setAuthenticate} />}
        />
        <Route
          path="/product/:id"
          element={<PrivateRoute authenticate={authenticate} />}
        />

        {/* 
          URL 접근 예제 
          <PrivateRoute>가고 싶은 URL</PrivateRoute>
        */}
        <Route
          path="/Communityboard"
          element={
            // <PrivateRoute authenticate={authenticate}>
            <Communityboard authenticate={authenticate} />
            // </PrivateRoute>
          }
        />
        <Route
          path="/Fishingboard"
          element={<Fishingboard authenticate={authenticate} />}
        />

        <Route
          path="/TrendBoard"
          element={<TrendBoard authenticate={authenticate} />}
        />

        <Route
          path="/FishInformation"
          element={<FishInformation authenticate={authenticate} />}
        />

        <Route
          path="/PointerInformation"
          element={<PointerInformation authenticate={authenticate} />}
        />

        <Route
          path="/WeatherInformation"
          element={<WeatherInformation authenticate={authenticate} />}
        />

        <Route
          path="/AnnounCement"
          element={<AnnounCement authenticate={authenticate} />}
        />

        <Route path="/Faq" element={<Faq authenticate={authenticate} />} />

        <Route path="/QNA" element={<QNA authenticate={authenticate} />} />

        <Route
          path="/EditMember"
          element={<EditMember authenticate={authenticate} />}
        />

        <Route path="/Edit" element={<Edit authenticate={authenticate} />} />
        <Route
          path="Withdrawal"
          element={<Withdrawal authenticate={authenticate} />}
        />
      </Routes>
      <Footer authenticate={authenticate} setAuthenticate={setAuthenticate} />
    </div>
  );
}

export default App;

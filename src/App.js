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
import axios from "axios";

function App() {
  let [authenticate, setAuthenticate] = useState(false);
  const handleResize = () => {
    const zoomLevel = window.outerWidth / window.innerWidth;
    if (zoomLevel >= 1.1) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
    }
  };

  // 컴포넌트가 마운트되거나 언마운트될 때 이벤트 리스너를 추가/제거
  useEffect(() => {
    // 세션 스토리지에서 토큰을 가져옵니다.
    const token = sessionStorage.getItem("token");
    if (token) {
      // 백엔드에 토큰 유효성 검사를 요청합니다.
      axios
        .post("http://13.48.105.95:8080/member/login", { token: token }) // 백엔드 API 주소를 적절하게 수정해야 합니다.
        .then((response) => {
          if (response.data.isValid) {
            setAuthenticate(true);
          }
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
        });
    }
  }, []);
  return (
    <div>
      <Navbar authenticate={authenticate} />
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

        <Route
          path="/Communityboard"
          element={<Communityboard authenticate={authenticate} />}
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

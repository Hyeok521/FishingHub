import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import PrivateRoute from "./Route/PrivateRoute";
import SighUp from "./page/SighUp";
import Idsearch from "./page/Idsearch";
import PasswordSearch from "./page/PasswordSearch";
import Communityboard from "./page/Communityboard";
<<<<<<< HEAD
import Footer from "./component/Footer";
=======
import Fishingboard from "./page/Fishingboard";
import TrendBoard from "./page/TrendBoard";
import AnnounCement from "./page3/AnnounCement";
import Faq from "./page3/Faq";
import QNA from "./page3/QNA";
import EditMember from "./page4/EditMember";
import Edit from "./page4/Edit";

>>>>>>> cc51e6cda23b1a98f42684c13e4bd16bd51e1a4d
function App() {
  let [authenticate, setAuthenticate] = useState(false);
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
      </Routes>
      <Footer authenticate={authenticate} setAuthenticate={setAuthenticate} />
    </div>
  );
}

export default App;

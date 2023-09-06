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
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import ProductAll from "../page/ProductAll";
import SighUp from "../page/SighUp";
import Idsearch from "../page/Idsearch";
import PasswordSearch from "../page/PasswordSearch";
import Login from "../page/Login";
import PrivateRoute from "./PrivateRoute";
import Board from "../page/Board";
import EditMember from "../page4/EditMember";
import Edit from "../page4/Edit";
import Withdrawal from "../page4/Withdrawal";
import MemberList from "../page4/MemberList";
import PointerInfo_1 from "../page2/PointerInfo_1";
import PointerInfo_2 from "../page2/PointerInfo_2";
import PointerInfo_3 from "../page2/PointerInfo_3";
import PointerInfo_4 from "../page2/PointerInfo_4";
import PointerInfo_5 from "../page2/PointerInfo_5";
import PointerInfo_6 from "../page2/PointerInfo_6";
import PointerInfo_7 from "../page2/PointerInfo_7";
import PointerInfo_8 from "../page2/PointerInfo_8";

const Router = () => {
  <Routes>
    <Route path="/" element={<ProductAll />} />
    <Route path="/SighUp" element={<SighUp />} />
    <Route path="/Idsearch" element={<Idsearch />} />
    <Route path="/PasswordSearch" element={<PasswordSearch />} />
    <Route path="/login" element={<Login />} />
    <Route path="/product/:id" element={<PrivateRoute />} />
    <Route path="/Communityboard" element={<Board boardMasterId={1} />} />
    <Route path="/Fishingboard" element={<Board boardMasterId={2} />} />

    <Route path="/TrendBoard" element={<Board boardMasterId={3} />} />

    <Route path="/PointerInfo_1" element={<PointerInfo_1 />} />

    <Route path="/AnnounCement" element={<Board boardMasterId={4} />} />

    <Route path="/Faq" element={<Board boardMasterId={5} />} />

    <Route path="/QNA" element={<Board boardMasterId={6} />} />

    <Route path="/EditMember" element={<EditMember />} />

    <Route path="/Edit" element={<Edit />} />
    <Route path="Withdrawal" element={<Withdrawal />} />
    <Route
      path="/memberList"
      element={<PrivateRoute children={<MemberList />} />}
    />
    <Route path="/PointerInfo_2" element={<PointerInfo_2 />} />
    <Route path="/PointerInfo_3" element={<PointerInfo_3 />} />
    <Route path="/PointerInfo_4" element={<PointerInfo_4 />} />
    <Route path="/PointerInfo_5" element={<PointerInfo_5 />} />
    <Route path="/PointerInfo_6" element={<PointerInfo_6 />} />
    <Route path="/PointerInfo_7" element={<PointerInfo_7 />} />
    <Route path="/PointerInfo_8" element={<PointerInfo_8 />} />
  </Routes>;
};
export default Router;

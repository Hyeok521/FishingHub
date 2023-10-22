import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useLocation} from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {getAuthentication} from "../common/CookieUtil";
import axios from "axios";
import {setUserInfo} from "../redux/authSlice";
import {ROLE_ADMIN} from "../common/Constants";

const PrivateRoute = ({isAdmin, children}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth);
    const accessToken = getAuthentication();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("PrivateRoute")
        const fetchUserInfo = async () => {
            console.log("fetchUserInfo 호출")
            try {
                const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/member/info", {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
                dispatch(setUserInfo(res.data));
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        if (!auth && accessToken) {
            fetchUserInfo()
        } else {
            setLoading(false)
        }
    }, [location]);

    if (loading) {
        return null;
    }

    if (!auth) {
        return <Navigate to="/login" replace state={{from: location}}/>;
    }

    if (isAdmin && auth.userType !== ROLE_ADMIN) {
        alert("접근 권한이 없습니다.");
        return <Navigate to="/" replace state={{from: location}}/>;
    }
    return children;
};

export default PrivateRoute;

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAuthentication} from "../common/CookieUtil";
import axios from "axios";
import {setUserInfo} from "../redux/authSlice";
import {Navigate} from "react-router-dom";
import {useLocation} from "react-router";

const PublicRoute = ({children, notLogin}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth);
    const accessToken = getAuthentication();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("PublicRoute")
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
                setLoading(false);
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

    if (notLogin) {
        if (auth) {
            alert("접근 권한이 없습니다.");
            return <Navigate to="/" replace state={{from: location}}/>;
        }
    }
    return children;
};

export default PublicRoute;
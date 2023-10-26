import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getAuthentication} from "../common/CookieUtil";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import CustomPagination from "../component/board/CustomPagination";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {ROLE_USER} from "../common/Constants";


const MemberList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [memberList, setMemberList] = useState();
    const [memberId, setMemberId] = useState();
    const [nowPage, setNowPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        console.log("MemberList")
        fetchMemberList();
    }, [location]);

    // 회원 목록 조회
    const fetchMemberList = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/admin/member/list", {
                params: {page: nowPage - 1},
                headers: {Authorization: "Bearer " + getAuthentication()}
            }
        ).then(res => {
            const data = res.data;
            if (data.content.length > 0) {
                setMemberList(data.content)
                setTotalPages(data.totalPages);
                setMemberId(data.totalElements - ((nowPage - 1) * data.size))
            } else {
                setMemberList(null);
                setMemberId(0);
                setTotalPages(0);
            }
        }).catch(() => {
            alert("잘못된 접근입니다.");
            navigate("/");
        })
    }

    // 회원 삭제
    const deleteMember = (userNo) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + "/admin/member", {
            params: {userNo},
            headers: {Authorization: "Bearer " + getAuthentication()}
        }).then(res => {
            alert("회원이 삭제되었습니다.");
            fetchMemberList();
        }).catch((error) => {
            if (error.response.data.status === 400 || error.response.data.status === 403) {
                alert(error.response.data.message);
            } else {
                alert("회원 삭제 실패");
            }
        })
    }
    return (
        <Container className="BoardBody">
            <Row>
                <Col>
                    <h4 style={{marginTop: "30px", marginBottom: "40px"}}>
                        회원 목록
                    </h4>
                </Col>
            </Row>
            <Col className="BodyCol">
                <Table striped bordered hover className="fixedTable">
                    <thead>
                    <tr>
                        <th style={{width: "70px"}}>번호</th>
                        <th style={{width: "200px"}}>아이디</th>
                        <th style={{width: "200px"}}>이름</th>
                        <th style={{width: "100px"}}>로그인 유형</th>
                        <th style={{width: "120px"}}>회원 등급</th>
                        <th style={{width: "60px"}}>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {memberList &&
                        memberList.map((member, index) => (
                            <tr key={index}>
                                <td>{memberId - index}</td>
                                <td>
                                    {member.userId}
                                </td>
                                <td>
                                    {member.userNm}
                                </td>
                                <td>{member.loginType === 'NORMAL' ? '일반' : 'SNS'}</td>
                                <td>{member.userType === ROLE_USER ? '일반' : '관리자'}</td>
                                <td><Button onClick={() => deleteMember(member.userNo)}>삭제</Button></td>
                            </tr>
                        ))}
                    {!memberList &&
                        (<tr>
                            <td colSpan={6}>등록된 회원이 없습니다.</td>
                        </tr>)
                    }
                    </tbody>
                </Table>
            </Col>

            {/* 페이지네이션 S */}
            {<CustomPagination limit={5} now={nowPage} totalPages={totalPages} setPage={setNowPage}/>}
            {/* 페이지네이션 S */}
        </Container>
    );
};

export default MemberList;
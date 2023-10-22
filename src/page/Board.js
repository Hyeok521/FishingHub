import React, {useEffect, useState} from "react";
import {Col, Container, Row,} from "react-bootstrap";
import axios from "axios";
import {getAuthentication} from "../common/CookieUtil";
import {useNavigate} from "react-router-dom";
import CustomPagination from "../component/board/CustomPagination";
import {useLocation} from "react-router";
import BoardList from "../component/board/BoardList";
import BoardViewModal from "../component/board/BoardViewModal";
import BoardUpdateModal from "../component/board/BoardUpdateModal";
import {
    BOARD_DELETE,
    BOARD_READ,
    BOARD_UPDATE,
    BOARD_WRITE,
    COMMENT_READ,
    COMMENT_UPDATE,
    COMMENT_WRITE,
    ROLE_ADMIN,
    ROLE_ALL,
    ROLE_USER
} from "../common/Constants";
import {useSelector} from "react-redux";

const Board = ({boardMasterId}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const [nowPage, setNowPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [articleId, setArticleId] = useState();
    const [articleInfo, setArticleInfo] = useState();
    const [boardMasterInfo, setBoardMasterInfo] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState("");
    const auth = useSelector(state => state.auth.auth);
    const token = getAuthentication();

    useEffect(() => {
        fetchBoardMaster();
        fetchPosts();
    }, [location])

    // 게시글 조회
    const fetchPosts = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/board/list", {params: {page: nowPage - 1, boardMasterId}})
            .then((response) => {
                console.log(response); // 이 줄을 추가하세요.
                const data = response.data
                if (data.content.length > 0) {
                    setArticles(data.content);
                    setTotalPages(data.totalPages);
                    setArticleId(data.totalElements - ((nowPage - 1) * data.size))
                } else {
                    setArticles(null);
                    setTotalPages(0);
                }
            })
            .catch((error) => {
                console.error(error)
                alert("잘못된 접근입니다.");
                navigate("/");
            });
    };

    // 게시판 정보 조회
    const fetchBoardMaster = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/board/master", {params: {boardMasterId}})
            .then(res => {
                setBoardMasterInfo(res.data);
            }).catch((error) => {
            console.error(error)
            alert("잘못된 접근입니다.");
            navigate("/");
        })
    }

    // 게시글 삭제 action
    const handleDeletePost = (postId) => {
        if (!auth) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        if (!checkRole(BOARD_DELETE)) {
            alert("삭제 권한이 없습니다.");
            return;
        }
        axios
            .delete(process.env.REACT_APP_SERVER_URL + '/board', {
                params: {boardId: postId, boardMasterId},
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((response) => {
                if (response.status === 200) {
                    alert("게시글 삭제 성공");
                    fetchPosts(); // 게시글 삭제 후, 다시 서버에서 게시글 목록을 가져옵니다.
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response.data.status === 400 || error.response.data.status === 403) {
                    alert(error.response.data.message);
                } else {
                    alert("게시글 삭제 실패");
                }
            }).finally(() => {
            setShowEditModal(false);
            setShowViewModal(false);
        });
    };

    // 댓글 저장 action
    const handleCommentSave = () => {
        if (!articleInfo) {
            console.error("댓글 저장")
            alert("잘못된 접근입니다.");
        }

        if (!auth) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        if (!checkRole(COMMENT_WRITE)) {
            alert("쓰기 권한이 없습니다.");
            return;
        }
        axios.post(process.env.REACT_APP_SERVER_URL + "/board/comment/write", {
            boardMasterId: boardMasterInfo.id,
            boardId: articleInfo.id,
            content: newComment
        }, {
            headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        }).then(() => {
            alert("댓글 저장 성공")
            if (!checkRole(BOARD_READ)) {
                alert("보기 권한이 없습니다.");
                return;
            }
            axios.get(process.env.REACT_APP_SERVER_URL + "/board/view", {
                params: {boardId: articleInfo.id, boardMasterId},
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setArticleInfo(res.data);
            }).catch((error) => {
                console.error(error)
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("잘못된 접근입니다.");
                }
            })
        }).catch((error) => {
            console.error(error)
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("댓글 저장 실패");
            }
        }).finally(() => {
            setNewComment(""); // 댓글 작성 폼 비우기
        })
    };

    // 권한 검증
    const checkRole = (checkType) => {
        const role = auth ? auth.userType : ROLE_ALL;
        if (!boardMasterInfo || !checkType) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
        if (role === ROLE_ADMIN) {
            return true;
        }

        let checkTypeRole;
        if (checkType === BOARD_READ) {
            checkTypeRole = boardMasterInfo.readRole;
        } else if (checkType === BOARD_WRITE) {
            checkTypeRole = boardMasterInfo.writeRole;
        } else if (checkType === BOARD_UPDATE) {
            checkTypeRole = boardMasterInfo.updateRole;
        } else if (checkType === BOARD_DELETE) {
            checkTypeRole = boardMasterInfo.deleteRole;
        } else if (checkType === COMMENT_READ) {
            checkTypeRole = boardMasterInfo.commentReadRole;
        } else if (checkType === COMMENT_WRITE) {
            checkTypeRole = boardMasterInfo.commentWriteRole;
        } else if (checkType === COMMENT_UPDATE) {
            checkTypeRole = boardMasterInfo.commentUpdateRole;
        } else {
            checkTypeRole = boardMasterInfo.commentDeleteRole;
        }

        if (role === ROLE_ALL && (checkTypeRole === ROLE_USER || checkTypeRole === ROLE_ADMIN)) {
            return false;
        }

        return !(role === 'ROLE_USER' && checkTypeRole === 'ROLE_ADMIN');
    }

    // 보기 모달
    const openModalForView = (boardId) => {
        if (!checkRole(BOARD_READ)) {
            alert("보기 권한이 없습니다.");
            return;
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/board/view", {
            params: {boardId, boardMasterId},
            headers: token && {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setArticleInfo(res.data);
            setIsEditing(false);
            setShowViewModal(true);
        }).catch((error) => {
            console.error(error)
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("잘못된 접근입니다.");
            }
        })
    };

    // 글쓰기 모달
    const openModalForCreate = () => {
        if (!auth) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        if (!checkRole(BOARD_WRITE)) {
            alert("작성 권한이 없습니다.");
            return;
        }
        setArticleInfo(null);
        setIsEditing(false);
        setShowEditModal(true);
    };

    // 수정 모달
    const openModalForEdit = (boardId) => {
        if (!auth) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        if (!checkRole(BOARD_UPDATE)) {
            alert("수정 권한이 없습니다.");
            return;
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/board/view", {
            params: {boardId, boardMasterId},
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setArticleInfo(res.data);
            setIsEditing(true);
            setShowEditModal(true);
        }).catch((error) => {
            console.error(error)
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("잘못된 접근입니다.");
            }
        })

    };

    return (
        <Container className="BoardBody">
            {/* 제목 S */}
            <Row>
                <Col>
                    <h4 style={{marginTop: "30px", marginBottom: "40px"}}>
                        {boardMasterInfo && boardMasterInfo.title}
                    </h4>
                </Col>
            </Row>
            {/* 제목 E */}

            {/* 게시물 리스트 S */}
            <BoardList articles={articles} articleId={articleId} openModalForView={openModalForView}
                       openModalForEdit={openModalForEdit} openModalForCreate={openModalForCreate}
                       handleDeletePost={handleDeletePost} boardMasterInfo={boardMasterInfo}
                       checkRole={checkRole}/>
            {/* 게시물 리스트 E */}

            {/* 게시물 작성, 수정 모달 S */}
            <BoardUpdateModal showEditModal={showEditModal} setShowEditModal={setShowEditModal}
                              setIsEditing={setIsEditing} isEditing={isEditing}
                              articleInfo={articleInfo}
                              setArticleInfo={setArticleInfo} fetchPosts={fetchPosts} boardMasterId={boardMasterId}
                              checkRole={checkRole}/>
            {/* 게시물 작성, 수정 모달 E */}

            {/* 게시물 보기 모달 S */}
            <BoardViewModal showViewModal={showViewModal} setShowViewModal={setShowViewModal}
                            setArticleInfo={setArticleInfo} articleInfo={articleInfo}
                            newComment={newComment} setNewComment={setNewComment}
                            handleCommentSave={handleCommentSave}/>
            {/* 게시물 보기 모달 S */}

            {/* 페이지네이션 S */}
            {<CustomPagination limit={5} now={nowPage} totalPages={totalPages} setPage={setNowPage}/>}
            {/* 페이지네이션 S */}
        </Container>
    );
};

export default Board;

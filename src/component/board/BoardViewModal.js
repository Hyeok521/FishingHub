import {Button, Form, Modal} from "react-bootstrap";
import {formatDate, getUserNickName} from "../../common/CommonUtils";
import React from "react";
import {useSelector} from "react-redux";

const BoardViewModal = ({
                            showViewModal,
                            setShowViewModal,
                            setArticleInfo,
                            articleInfo,
                            newComment,
                            setNewComment,
                            handleCommentSave
                        }) => {
    const auth = useSelector(state => state.auth.auth);

    return (<Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        onExited={() => {
            setArticleInfo(null);
        }}
        size="lg"
    >
        <Modal.Header closeButton>
            <Modal.Title>게시글 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="modal-section">
                <h3>{articleInfo?.title}</h3>
            </div>
            <div className="modal-section">
                {articleInfo?.savedImage && (
                    <div className="text-center" style={{marginTop: "20px"}}>
                        <img
                            src={process.env.REACT_APP_SERVER_URL + '/image/' + articleInfo?.savedImage.savedName}
                            alt="게시글 이미지"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                marginBottom: "20px",
                            }}
                        />
                    </div>
                )}
            </div>
            <h5
                dangerouslySetInnerHTML={{
                    __html: articleInfo?.content?.replace(/\n/g, "<br />"),
                }}
            ></h5>

            {/* 댓글 작성 폼 S */}
            <Form.Group>
                <Form.Label style={{marginTop: "50px"}}>댓글 작성</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="작성자 이름"
                    value={getUserNickName(auth)}
                    readOnly={true}
                />
                <Form.Control
                    style={{marginTop: "5px"}}
                    as="textarea"
                    rows={3}
                    placeholder="댓글을 입력하세요."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </Form.Group>
            <Button
                style={{marginTop: "10px"}}
                variant="primary"
                onClick={() => {
                    handleCommentSave()
                }}
            >
                댓글 저장
            </Button>
            {/* 댓글 작성 폼 E */}

            {/* 댓글 목록 S */}
            {articleInfo?.boardCommentList?.map((comment, index) => (
                <div
                    key={index}
                    style={{
                        marginTop: "20px",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                    }}
                >
                    <strong>{getUserNickName(comment.member)}</strong> ({formatDate(comment.createdAt)})
                    <p
                        dangerouslySetInnerHTML={{
                            __html: comment.content.replace(/\n/g, "<br />"),
                        }}
                    ></p>
                </div>
            ))}
            {/* 댓글 목록 E */}
        </Modal.Body>
    </Modal>)
}
export default BoardViewModal;
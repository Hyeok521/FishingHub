import {Button, Form, Image, Modal} from "react-bootstrap";
import {getUserNickName} from "../../common/CommonUtils";
import React, {useState} from "react";
import axios from "axios";
import {getAuthentication} from "../../common/CookieUtil";
import {BOARD_UPDATE, BOARD_WRITE, UPDATE, WRITE} from "../../common/Constants";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const BoardUpdateModal = ({
                              showEditModal,
                              setShowEditModal,
                              setIsEditing,
                              isEditing,
                              articleInfo,
                              setArticleInfo,
                              fetchPosts,
                              boardMasterId,
                              checkRole
                          }) => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.auth);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [preImage, setPreImage] = useState(null);

    // 게시글 작성 action
    const handleWritePost = (command) => {
        if (!auth) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        if (!checkRole(command === UPDATE ? BOARD_UPDATE : BOARD_WRITE)) {
            alert(command === UPDATE ? "수정 권한이 없습니다." : "작성 권한이 없습니다.");
            return;
        }

        // 글 작성에 필요한 데이터 수집
        const formData = new FormData();
        formData.append("title", articleInfo.title);
        formData.append("content", articleInfo.content);
        formData.append("boardMasterId", boardMasterId);
        if (command === 'UPDATE') {
            formData.append("boardId", articleInfo.id);
        }

        // 파일과 이미지 추가
        if (file) {
            formData.append("file", file);
        }
        if (image) {
            formData.append("image", image);
        }

        // formData를 사용하여 데이터를 보냅니다.
        axios
            .post(process.env.REACT_APP_SERVER_URL + "/board/" + (command === UPDATE ? "update" : 'write'), formData, {
                headers: {
                    Authorization: `Bearer ${getAuthentication()}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    alert(command === UPDATE ? "게시글 수정 성공" : "게시글 작성 성공");
                    fetchPosts(); // 게시글 작성 후, 다시 서버에서 게시글 목록을 가져옵니다.
                }
            })
            .catch((error) => {
                console.error(error)
                alert(command === UPDATE ? "게시글 수정 실패" : "게시글 작성 실패");
            }).finally(() => {
            setShowEditModal(false);
        });
    };


    // 파일 업로드
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    // 이미지 업로드
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setImage(image);

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setPreImage(reader.result);
        }
    };

    // 첨부파일 및 이미지 파일 삭제
    const handleFileDelete = (fileId, type) => {
        if (!auth) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        axios
            .delete(process.env.REACT_APP_SERVER_URL + "/attach", {
                params: {fileId}, headers: {
                    Authorization: "Bearer " + getAuthentication(),
                },
            })
            .then(() => {
                if (type === "file") {
                    alert("첨부파일이 삭제되었습니다.");
                    setArticleInfo({
                        ...articleInfo,
                        savedFile: null,
                    });
                } else {
                    alert("이미지가 삭제되었습니다.");
                    setArticleInfo({
                        ...articleInfo,
                        savedImage: null,
                    });
                }
                fetchPosts();
            })
            .catch((error) => {
                console.error(error)
                alert(error.response.data.message)
            });
    };

    return (
        <Modal
            show={showEditModal}
            onHide={() => {
                setShowEditModal(false);
                setPreImage(null)
            }}
            size="lg"
            onExited={() => {
                setArticleInfo(null);
                setIsEditing(false);
                setPreImage(null)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "게시글 수정" : "게시글 작성"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="제목을 입력하세요."
                            value={articleInfo?.title}
                            onChange={(e) =>
                                setArticleInfo({
                                    ...articleInfo,
                                    title: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>내용</Form.Label>
                        <div style={{border: "1px solid #ccc", padding: "10px"}}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="내용을 입력하세요."
                                value={articleInfo?.content}
                                onChange={(e) =>
                                    setArticleInfo({
                                        ...articleInfo,
                                        content: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>작성자</Form.Label>
                        <Form.Control
                            type="text"
                            value={getUserNickName(auth)}
                            readOnly={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>파일 업로드</Form.Label>
                        {!articleInfo?.savedFile && <Form.Control type="file" onChange={handleFileChange}/>}
                        {articleInfo?.savedFile && (
                            <div>
                                {articleInfo?.savedFile.originalName}
                                <Button
                                    style={{marginTop: "10px"}}
                                    variant="danger"
                                    onClick={() => handleFileDelete(articleInfo.savedFile.id, "file")}
                                >
                                    파일 삭제
                                </Button>
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>이미지 업로드</Form.Label>
                        {!articleInfo?.savedImage &&
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />}
                        {(articleInfo?.savedImage || preImage) && (
                            <div
                                style={{
                                    height: "auto",
                                    width: "auto",
                                }}
                            >
                                <Image
                                    src={preImage ? preImage : process.env.REACT_APP_SERVER_URL + '/image/' + articleInfo?.savedImage.savedName}
                                    // src={process.env.REACT_APP_SERVER_URL + '/image/' + articleInfo?.savedImage.savedName}
                                    alt="Image Preview"
                                    thumbnail
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        marginBottom: "10px",
                                    }}
                                />
                                {articleInfo?.savedImage &&
                                    <div>
                                        {articleInfo?.savedImage.originalName}
                                        <Button variant="danger"
                                                onClick={() => handleFileDelete(articleInfo.savedImage.id, "image")}>
                                            이미지 삭제
                                        </Button>
                                    </div>
                                }
                            </div>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowEditModal(false)}>
                    취소
                </Button>
                <Button variant="primary" onClick={() => {
                    handleWritePost(isEditing ? UPDATE : WRITE)
                }}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BoardUpdateModal;
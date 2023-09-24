import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Image,
} from "react-bootstrap";
import axios from "axios";
import { getAuthentication } from "../common/CookieUtil"; // getAuthentication 함수를 가져옵니다.

const Communityboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get("http://13.48.105.95:8080/board/list")
      .then((response) => {
        setPosts(response.data);
        console.log("게시글 목록 조회 리스폰스:", response);
      })
      .catch((error) => {
        console.error("게시글 목록 조회 실패:", error);
      });
  };

  useEffect(() => {
    const storedToken = getAuthentication();
    console.log("쿠키에서 가져온 토큰:", storedToken);

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true); // 로그인 상태 인증

      // 서버에서 게시글 목록을 가져옵니다.
      fetchPosts();
    }
  }, []);

  const refreshPosts = () => {
    fetchPosts();
  };

  // axios로 사용자 정보를 가져오는 부분 (기존 코드 유지)
  // }
  // }, []);
  // axios
  //   .get("/api/user", {
  //     headers: { Authorization: `Bearer ${storedToken}` },
  //   })
  //   .then((response) => {
  //     setUserId(response.data.id);
  //   });

  // }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [comments, setComments] = useState({});
  const [newOrEditedPost, setNewOrEditedPost] = useState({
    title: "",
    content: "",
    author: "",
    file: null,
    fileURL: null,
    image: null,
    imageURL: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setNewOrEditedPost({
      ...newOrEditedPost,
      file,
      fileURL,
    });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const imageURL = URL.createObjectURL(image);
    setNewOrEditedPost({
      ...newOrEditedPost,
      image,
      imageURL,
    });
  };

  const handleFileDelete = () => {
    setNewOrEditedPost({
      ...newOrEditedPost,
      file: null,
      fileURL: null,
    });
  };

  const handleImageDelete = () => {
    setNewOrEditedPost({
      ...newOrEditedPost,
      image: null,
      imageURL: null,
    });
  };

  // 댓글 저장 함수
  const handleCommentSave = () => {
    if (currentPost) {
      // 현재 게시물이 있는 경우
      const postId = currentPost.id;
      const commentDate = new Date().toISOString().split("T")[0];
      const newComments = [
        ...(comments[postId] || []),
        {
          author: newCommentAuthor, // 댓글 작성자 이름 사용
          date: commentDate,
          text: newComment,
        },
      ];
      setComments({
        ...comments,
        [postId]: newComments,
      });
      setNewComment(""); // 댓글 작성 폼 비우기
      setNewCommentAuthor(""); // 댓글 작성자 이름 비우기
    }
  };

  const handleWritePost = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 글 작성에 필요한 데이터 수집
    const boardData = {
      title: newOrEditedPost.title,
      content: newOrEditedPost.content,
      author: newOrEditedPost.author,
    };

    // 파일 업로드와 이미지 업로드 처리
    const fileData = new FormData();
    if (newOrEditedPost.file) {
      fileData.append("file", newOrEditedPost.file);
    }
    if (newOrEditedPost.image) {
      fileData.append("image", newOrEditedPost.image);
    }

    axios
      .post(
        "http://13.48.105.95:8080/board/writepro",
        {
          board: boardData,
          file: fileData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          alert("게시글 작성 성공");
          console.log("게시글 작성 응답:", response.data);

          // 게시글 작성 후, 다시 서버에서 게시글 목록을 가져옵니다.
          axios
            .get("http://13.48.105.95:8080/board/list")
            .then((response) => {
              setPosts(response.data);
              console.log("게시글 목록 재조회 리스폰스:", response);
            })
            .catch((error) => {
              console.error("게시글 목록 재조회 실패:", error);
            });
        }
      })
      .catch((error) => {
        alert("게시글 작성 실패");
        console.error("게시글 작성 에러:", error);
      });
  };

  const handleEditPost = (postId, postAuthor, updatedData) => {
    if (userId !== postAuthor) {
      alert("수정 권한이 없습니다.");
      return;
    }

    axios
      .post(`http://13.48.105.95:8080/board/update/${postId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data === "수정되었습니다.") {
          alert("게시글 수정 성공");
          axios
            .get("http://13.48.105.95:8080/board/list")
            .then((response) => {
              setPosts(response.data);
              console.log("게시글 목록 재조회 리스폰스:", response);
            })
            .catch((error) => {
              console.error("게시글 목록 재조회 실패:", error);
            });
        }
      })
      .catch((error) => {
        alert("게시글 수정 실패");
        console.error("게시글 수정 에러:", error);
      });
  };

  const handleDeletePost = (postId, postAuthor) => {
    if (userId !== postAuthor) {
      alert("삭제 권한이 없습니다.");
      return;
    }

    axios
      .delete(`http://13.48.105.95:8080/board/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 204) {
          alert("게시글 삭제 성공");
          axios
            .get("http://13.48.105.95:8080/board/list")
            .then((response) => {
              setPosts(response.data);
              console.log("게시글 목록 재조회 리스폰스:", response);
            })
            .catch((error) => {
              console.error("게시글 목록 재조회 실패:", error);
            });
        }
      })
      .catch((error) => {
        alert("게시글 삭제 실패");
        console.error("게시글 삭제 에러:", error);
      });
  };

  const openModalForEdit = (post) => {
    setCurrentPost(post);
    setNewOrEditedPost({ ...post });
    setIsEditing(true);
    setShowEditModal(true);
  };

  const openModalForView = (post) => {
    setCurrentPost(post);
    setIsEditing(false);
    setShowViewModal(true);
  };

  const openModalForCreate = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
    } else {
      setCurrentPost(null);
      setNewOrEditedPost({
        title: "",
        content: "",
        author: "",
        file: null,
        fileURL: null,
        image: null,
        imageURL: null,
      });
      setIsEditing(false);
      setShowCreateModal(true);
    }
  };
  const handleSave = () => {
    if (currentPost) {
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id
            ? { ...currentPost, ...newOrEditedPost }
            : post
        )
      );
    } else {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          ...newOrEditedPost,
          date: new Date().toISOString().split("T")[0],
          comments: [],
        },
      ]);
    }
    setShowEditModal(false);
    setShowViewModal(false);
    setShowCreateModal(false);
  };

  return (
    <Container className="BoardBody">
      <Row>
        <Col>
          <h4 style={{ marginTop: "30px", marginBottom: "40px" }}>
            커뮤니티 게시판
          </h4>
        </Col>
      </Row>
      <Row>
        <Col className="BodyCol">
          <Table striped bordered hover className="fixedTable">
            <thead>
              <tr>
                <th style={{ width: "70px" }}>글번호</th>
                <th style={{ width: "200px" }}>제목</th>
                <th>내용</th>
                <th style={{ width: "70px" }}>작성자</th>
                <th style={{ width: "120px" }}>작성일</th>
                <th style={{ width: "120px" }}>파일</th>
                <th style={{ width: "120px" }}>이미지</th>
                <th style={{ width: "150px" }}>작업</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <span
                      style={{
                        cursor: "pointer",
                        color: "black",
                      }}
                      onClick={() => openModalForView(post)}
                    >
                      {post.title.length > 15
                        ? post.title.slice(0, 15) + "..."
                        : post.title}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        cursor: "pointer",
                        color: "black",
                      }}
                      onClick={() => openModalForView(post)}
                    >
                      {post.content.length > 25
                        ? post.content.slice(0, 25) + "..."
                        : post.content}
                    </span>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>
                    {post.fileURL && (
                      <a
                        style={{ textDecorationLine: "none", color: "black" }}
                        href={post.fileURL}
                        download
                      >
                        다운로드
                      </a>
                    )}
                  </td>
                  <td>
                    {post.imageURL && (
                      <a
                        style={{ textDecorationLine: "none", color: "black" }}
                        href={post.imageURL}
                        download
                      >
                        다운로드
                      </a>
                    )}
                  </td>
                  <td>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="primary"
                      onClick={() => openModalForEdit(post)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() =>
                        setPosts(posts.filter((p) => p.id !== post.id))
                      }
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="write-button" onClick={openModalForCreate}>
            글쓰기
          </Button>
        </Col>
      </Row>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        onExited={() => {
          setCurrentPost(null);
          setNewOrEditedPost({
            title: "",
            content: "",
            author: "",
            file: null,
            fileURL: null,
            image: null,
            imageURL: null,
          });
          setIsEditing(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "게시글 수정" : "게시글 보기"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요."
                value={newOrEditedPost.title}
                onChange={(e) =>
                  setNewOrEditedPost({
                    ...newOrEditedPost,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            {isEditing && (
              <Form.Group>
                <Form.Label>내용</Form.Label>
                <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="내용을 입력하세요."
                    value={newOrEditedPost.content}
                    onChange={(e) =>
                      setNewOrEditedPost({
                        ...newOrEditedPost,
                        content: e.target.value,
                      })
                    }
                  />
                </div>
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                placeholder="작성자를 입력하세요."
                value={newOrEditedPost.author}
                onChange={(e) =>
                  setNewOrEditedPost({
                    ...newOrEditedPost,
                    author: e.target.value,
                  })
                }
              />
            </Form.Group>
            {isEditing && (
              <>
                <Form.Group>
                  <Form.Label>파일 업로드</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                  {newOrEditedPost.file && (
                    <div>
                      <Button
                        style={{ marginTop: "10px" }}
                        variant="danger"
                        onClick={handleFileDelete}
                      >
                        파일 삭제
                      </Button>
                    </div>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>이미지 업로드</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {newOrEditedPost.image && (
                    <div
                      style={{
                        height: "auto",
                        width: "auto",
                      }}
                    >
                      <Image
                        src={newOrEditedPost.imageURL}
                        alt="Image Preview"
                        thumbnail
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          marginBottom: "10px",
                        }}
                      />
                      <div>
                        <Button variant="danger" onClick={handleImageDelete}>
                          이미지 삭제
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>
            취소
          </Button>
          {isEditing && (
            <Button variant="primary" onClick={handleSave}>
              저장
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        onExited={() => {
          setCurrentPost(null);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>게시글 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-section">
            <h3>{currentPost?.title}</h3>
          </div>
          <div className="modal-section">
            {currentPost?.imageURL && (
              <div className="text-center" style={{ marginTop: "20px" }}>
                <img
                  src={currentPost?.imageURL}
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
              __html: currentPost?.content.replace(/\n/g, "<br />"),
            }}
          ></h5>
          {/* 댓글 작성 폼 */}
          <Form.Group>
            <Form.Label style={{ marginTop: "50px" }}>댓글 작성</Form.Label>
            <Form.Control
              type="text"
              placeholder="작성자 이름"
              value={newCommentAuthor}
              onChange={(e) => setNewCommentAuthor(e.target.value)}
            />
            <Form.Control
              style={{ marginTop: "5px" }}
              as="textarea"
              rows={3}
              placeholder="댓글을 입력하세요."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{ marginTop: "10px" }}
            variant="primary"
            onClick={handleCommentSave}
          >
            댓글 저장
          </Button>

          {/* 댓글 목록 */}
          {comments[currentPost?.id]?.map((comment, index) => (
            <div
              key={index}
              style={{
                marginTop: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <strong>{comment.author}</strong> ({comment.date})
              <p
                dangerouslySetInnerHTML={{
                  __html: comment.text.replace(/\n/g, "<br />"),
                }}
              ></p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
        onExited={() => {
          setCurrentPost(null);
          setNewOrEditedPost({
            title: "",
            content: "",
            author: "",
            file: null,
            fileURL: null,
            image: null,
            imageURL: null,
          });
          setIsEditing(false);
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
                value={newOrEditedPost.title}
                onChange={(e) =>
                  setNewOrEditedPost({
                    ...newOrEditedPost,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>내용</Form.Label>
              <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="내용을 입력하세요."
                  value={newOrEditedPost.content}
                  onChange={(e) =>
                    setNewOrEditedPost({
                      ...newOrEditedPost,
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
                placeholder="작성자를 입력하세요."
                value={newOrEditedPost.author}
                onChange={(e) =>
                  setNewOrEditedPost({
                    ...newOrEditedPost,
                    author: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>파일 업로드</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {newOrEditedPost.file && (
                <div>
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="danger"
                    onClick={handleFileDelete}
                  >
                    파일 삭제
                  </Button>
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>이미지 업로드</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {newOrEditedPost.image && (
                <div
                  style={{
                    height: "auto",
                    width: "auto",
                  }}
                >
                  <Image
                    src={newOrEditedPost.imageURL}
                    alt="Image Preview"
                    thumbnail
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <div>
                    <Button variant="danger" onClick={handleImageDelete}>
                      이미지 삭제
                    </Button>
                  </div>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowCreateModal(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Communityboard;

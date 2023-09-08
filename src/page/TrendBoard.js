import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const TrendBoard = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 글",
      content: "첫 번째 내용",
      author: "홍길동",
      date: "2023-09-05",
      file: null,
      fileURL: null,
    },

    {
      id: 2,
      title: "두 번째 글",
      content: "두 번째 내용",
      author: "홍길동",
      date: "2023-09-05",
      file: null,
      fileURL: null,
    },

    {
      id: 3,
      title: "세 번째 글",
      content: "세 번째 내용",
      author: "홍길동",
      date: "2023-09-05",
      file: null,
      fileURL: null,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newOrEditedPost, setNewOrEditedPost] = useState({
    title: "",
    content: "",
    author: "",
    file: null,
  });

  const openModalForNewPost = () => {
    setCurrentPost(null);
    setNewOrEditedPost({ title: "", content: "", author: "", file: null });
    setShowModal(true);
  };

  const openModalForEdit = (post) => {
    setCurrentPost(post);
    setNewOrEditedPost({ ...post });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewOrEditedPost({
      ...newOrEditedPost,
      file: file,
    });
  };

  const handleFileDelete = () => {
    setNewOrEditedPost({
      ...newOrEditedPost,
      file: null,
    });
  };

  const handleSave = () => {
    if (newOrEditedPost.file) {
      const blob = new Blob([newOrEditedPost.file], {
        type: newOrEditedPost.file.type,
      });
      newOrEditedPost.fileURL = URL.createObjectURL(blob);
    }

    if (currentPost) {
      // Update existing post
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id
            ? { ...currentPost, ...newOrEditedPost }
            : post
        )
      );
    } else {
      // Add new post
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          ...newOrEditedPost,
          views: 0,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Container className="BoardBody">
      <Row>
        <Col>
          <h4 style={{ marginTop: "30px", marginBottom: "40px" }}>
            조황정보 게시판
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover className="fixedTable">
            <thead>
              <tr>
                <th style={{ width: "70px" }}>글번호</th>
                <th style={{ width: "270px" }}>제목</th>
                <th>내용</th>
                <th style={{ width: "70px" }}>작성자</th>
                <th style={{ width: "120px" }}>작성일</th>
                <th style={{ width: "120px" }}>파일</th>
                <th style={{ width: "150px" }}>작업</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td className="auto-wrap">{post.content}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>
                    {post.fileURL && (
                      <>
                        <a href={post.fileURL} download>
                          파일 다운로드
                        </a>
                      </>
                    )}
                  </td>

                  <td className="center-align">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="success"
                        onClick={() => openModalForEdit(post)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(post.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="write-button" onClick={openModalForNewPost}>
            글쓰기
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPost ? "게시글 수정" : "새 게시글"}</Modal.Title>
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
                <Button variant="danger" onClick={handleFileDelete}>
                  파일 삭제
                </Button>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
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

export default TrendBoard;

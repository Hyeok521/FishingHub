import React, { useState } from "react";
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

const AnnounCement = () => {
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

  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
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
          <h3 style={{ marginTop: "30px", marginBottom: "40px" }}>공지사항</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover className="fixedTable">
            <thead>
              <tr>
                <th style={{ width: "70px" }}>글번호</th>
                <th style={{ width: "150px" }}>제목</th>
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
                      <Button variant="danger" onClick={handleFileDelete}>
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
                    <div>
                      <Image
                        src={newOrEditedPost.imageURL}
                        alt="Image Preview"
                        thumbnail
                      />
                      <Button variant="danger" onClick={handleImageDelete}>
                        이미지 삭제
                      </Button>
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
      >
        <Modal.Header closeButton>
          <Modal.Title>게시글 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{currentPost?.title}</h5>
          {currentPost?.imageURL && (
            <div className="text-center" style={{ marginTop: "20px" }}>
              <img
                src={currentPost?.imageURL}
                alt="게시글 이미지"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </div>
          )}
          <p>{currentPost?.content}</p>
        </Modal.Body>
      </Modal>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
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
                  <Button variant="danger" onClick={handleFileDelete}>
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
                <div>
                  <Image
                    src={newOrEditedPost.imageURL}
                    alt="Image Preview"
                    thumbnail
                  />
                  <Button variant="danger" onClick={handleImageDelete}>
                    이미지 삭제
                  </Button>
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

export default AnnounCement;

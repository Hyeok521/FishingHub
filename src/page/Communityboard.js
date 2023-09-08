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

const Communityboard = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "안녕하세요 조재현입니다.",
      content: "주말에 낚시가려고 하는데 괜찮은 포인트 있을까요",
      author: "조재현",
      date: "2023-09-05",
      file: null,
      fileURL: null,
      comments: [],
    },
    {
      id: 2,
      title: "밤 낚시",
      content: "오랜만에 기타 챙겨서 낚시 왔는데 너무 좋아요",
      author: "어양록",
      date: "2023-09-06",
      file: null,
      fileURL: null,
      comments: [],
    },
    {
      id: 3,
      title: "날씨가 언제쯤 선선해질 까요",
      content: "너무 더워서 고기 잡다가 쓰러질거 같아요",
      author: "정동진",
      date: "2023-09-07",
      file: null,
      fileURL: null,
      comments: [],
    },
  ]);

  const [showPostModal, setShowPostModal] = useState(false);
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
    setShowPostModal(true);
  };

  const openModalForView = (post) => {
    setCurrentPost(post);
    setIsEditing(false);
    setShowPostModal(true);
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
    setShowPostModal(false);
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
                    {post.title.length > 15 ? (
                      <span
                        style={{
                          cursor: "pointer",
                          color: "black",
                        }}
                        onClick={() => openModalForView(post)}
                      >
                        {post.title.slice(0, 15) + "..."}
                      </span>
                    ) : (
                      post.title
                    )}
                  </td>
                  <td>
                    {post.content.length > 25 ? (
                      <span
                        style={{
                          cursor: "pointer",
                          color: "black",
                        }}
                        onClick={() => openModalForView(post)}
                      >
                        {post.content.slice(0, 25) + "..."}
                      </span>
                    ) : (
                      post.content
                    )}
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
                        파일 다운로드
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
                        이미지 다운로드
                      </a>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => openModalForEdit(post)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="danger"
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
          <Button
            className="write-button"
            onClick={() => {
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
              setShowPostModal(true);
            }}
          >
            글쓰기
          </Button>
        </Col>
      </Row>
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowPostModal(false)}>
            취소
          </Button>
          {isEditing && (
            <Button variant="primary" onClick={handleSave}>
              저장
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Communityboard;

import { Button, Col, Row, Table } from "react-bootstrap";
import React from "react";
import {
  downloadAttachFile,
  formatDate,
  getUserNickName,
} from "../../common/CommonUtils";
import {
  BOARD_DELETE,
  BOARD_UPDATE,
  BOARD_WRITE,
  ROLE_ADMIN,
} from "../../common/Constants";
import { useSelector } from "react-redux";

const BoardList = ({
  articles,
  articleId,
  openModalForView,
  openModalForEdit,
  openModalForCreate,
  handleDeletePost,
  boardMasterInfo,
  checkRole,
}) => {
  const auth = useSelector((state) => state.auth.auth);

  return (
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
            {articles &&
              articles.map((post, index) => (
                <tr key={index}>
                  <td>{articleId - index}</td>
                  <td>
                    <span
                      style={{
                        cursor: "pointer",
                        color: "black",
                      }}
                      onClick={() => openModalForView(post.id)}
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
                      onClick={() => openModalForView(post.id)}
                    >
                      {post.content.length > 25
                        ? post.content.slice(0, 25) + "..."
                        : post.content}
                    </span>
                  </td>
                  <td>{getUserNickName(post.member)}</td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>
                    {post.savedFile && (
                      <a
                        style={{ textDecorationLine: "none", color: "black" }}
                        onClick={() => downloadAttachFile(post.savedFile.id)}
                      >
                        <span style={{ cursor: "pointer" }}>다운로드</span>
                      </a>
                    )}
                  </td>
                  <td>
                    {post.savedImage && (
                      <a
                        style={{ textDecorationLine: "none", color: "black" }}
                        onClick={() => downloadAttachFile(post.savedImage.id)}
                      >
                        <span style={{ cursor: "pointer" }}>다운로드</span>
                      </a>
                    )}
                  </td>
                  <td>
                    {((auth && post.member.userId === auth.userId) ||
                      (auth && auth.userType === ROLE_ADMIN)) && (
                      <>
                        {boardMasterInfo && auth && checkRole(BOARD_UPDATE) && (
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="primary"
                            onClick={() => openModalForEdit(post.id)}
                          >
                            수정
                          </Button>
                        )}
                        {boardMasterInfo && auth && checkRole(BOARD_DELETE) && (
                          <Button
                            variant="primary"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            삭제
                          </Button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            {!articles && (
              <tr>
                <td colSpan={8}>게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
        {boardMasterInfo && auth && checkRole(BOARD_WRITE) && (
          <Button className="write-button" onClick={openModalForCreate}>
            글쓰기
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default BoardList;

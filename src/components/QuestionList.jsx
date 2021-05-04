import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Popconfirm, Collapse, Comment } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Service } from '../service/config.js';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
const { Panel } = Collapse;

export const StyledCollapse = styled(Collapse)``;
export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledConfirm = styled(Popconfirm)`
  margin-left: 0.5rem;
`;
export const CommentContainer = styled.div`
  margin: 2.5rem;
`;

const QuestionList = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  showMessage,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const { id, title, body } = selectedQuestion;

  const handleChange = () => {
    setShowEdit(false);
    setShowComments(false);
  };

  const deleteQuestion = async (id) => {
    await Service.remove(id);
    showMessage('삭제되었습니다');
  };

  const openEditForm = (question) => {
    setSelectedQuestion(question);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuestion({
      ...selectedQuestion,
      [name]: value,
    });
  };

  const updateQuestion = async () => {
    // 모든 API 호출에는 try/catch로 에러 핸들링을 해주세요
    try {
      await Service.update(id, { title, body });
      showMessage('수정되었습니다');
    } catch (err) {
      console.log(err)
    }
  };

  const genExtra = () => (
    <>
      <CheckCircleTwoTone
        twoToneColor="#52c41a"
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
      <span>답변 완료</span>
    </>
    // 댓글이 없으면
  );

  const handleCommentBtnClick = async (questionid) => {
    await fetchComments(questionid);
    setShowComments(true);
  };

  const fetchComments = async (questionId) => {
    const response = await Service.getAllComments({ params: { questionId } });
    setComments(response.data.results);
    console.log(response.data.results);
  };

  return (
    <StyledCollapse accordion onChange={handleChange}>
      {questions.map((question) => (
        <>
          <Panel key={question.id} header={question.title} extra={genExtra()}>
            {showEdit ? (
              <Form id="edit-form" onFinish={updateQuestion}>
                <Form.Item>
                  <Input
                    name="title"
                    value={title}
                    onChange={handleEditChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input.TextArea
                    name="body"
                    value={body}
                    onChange={handleEditChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="default" htmlType="submit">
                    수정하기
                  </Button>
                  <Button type="default" onClick={() => setShowEdit(false)}>
                    취소
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <>
                <ContentContainer>
                  <Content>{question.body}</Content>
                  <div>
                    <Button onClick={() => handleCommentBtnClick(question.id)}>
                      답변보기
                    </Button>
                    <Button onClick={() => openEditForm(question)}>수정</Button>
                    <StyledConfirm
                      title="정말 삭제하시겠습니까?"
                      onConfirm={() => deleteQuestion(question.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>삭제</Button>
                    </StyledConfirm>
                  </div>
                </ContentContainer>

                {showComments && (
                  // 독립적인 컴포넌트로 리팩토링하고 QnA처럼 모든 데이터를 컨테이너 컴포넌트에서 관리하면 수월해져요
                  <CommentContainer>
                    {comments.length > 0 && (
                      <CommentList
                        comments={comments}
                        fetchComments={fetchComments}
                      />
                    )}
                    <Comment
                      content={
                        <CommentForm
                          comments={comments}
                          setComments={setComments}
                          questionId={question.id}
                        />
                      }
                    />
                  </CommentContainer>
                )}
              </>
            )}
          </Panel>
        </>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

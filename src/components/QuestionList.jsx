import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Popconfirm, Collapse, Tag, message } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Comments from './Comments.jsx';
import EditForm from './EditForm.jsx';
import { showErrorMsg } from '../service/messages.js';
import { commentService } from '../service/commentAPI.js';
import { questionService } from '../service/config.js';
const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)``;
const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledConfirm = styled(Popconfirm)`
  margin-left: 0.5rem;
`;

const QuestionList = ({ questions, showMessage }) => {
  // console.log('QuestionList');
  const [showEdit, setShowEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [questionId, setQuestionId] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsByQid, setCommentsByQid] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchAllComments = async () => {
    try {
      const response = await commentService.getAll({
        params: { limit: 100 },
      });
      // console.log(response);
      setComments(response.data.results);
    } catch (e) {
      showErrorMsg();
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  const addComment = async (input) => {
    const { body } = input;
    try {
      await commentService.add({
        questionId,
        body,
      });
    } catch (e) {
      showErrorMsg();
    }
    fetchAllComments();
    showCommentMessage('작성되었습니다.');
  };

  const fetchCommentsByQid = async (questionId) => {
    setLoading(true);
    try {
      const response = await commentService.getAll({
        params: { questionId },
      });
      // console.log(response);
      setCommentsByQid(response.data.results);
    } catch (e) {
      showErrorMsg();
    }
    setLoading(false);
  };

  const showCommentMessage = (text) => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: text, key, duration: 2 });
      fetchCommentsByQid(questionId);
    }, 1000);
  };

  const checkIfReplied = (id) => {
    // console.log(id);
    const idArr = comments.map((comment) => comment.questionId);
    const set = new Set(idArr);
    const uniqueArr = [...set];
    // console.log(uniqueArr);
    if (uniqueArr.includes(id)) {
      return (
        <>
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          <span>답변완료</span>
        </>
      );
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await questionService.remove(id);
    } catch (e) {
      showErrorMsg();
    }
    showMessage('삭제되었습니다');
  };

  const openEditForm = (question) => {
    setSelectedQuestion(question);
    setShowEdit(true);
  };

  const handlePanelChange = (key) => {
    setShowEdit(false);
    setQuestionId(key);
    fetchCommentsByQid(key);
  };

  const showPanelHeader = (question) => {
    const { category, title } = question;
    return (
      <>
        {category && <Tag color="#87d068">{category}</Tag>}
        <span>{title}</span>
      </>
    );
  };

  return (
    <StyledCollapse accordion onChange={handlePanelChange}>
      {questions.map((question) => (
        <>
          <Panel
            key={question.id}
            header={showPanelHeader(question)}
            extra={checkIfReplied(question.id)}
          >
            {showEdit ? (
              <EditForm
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                showMessage={showMessage}
                setShowEdit={setShowEdit}
              />
            ) : (
              <>
                <ContentContainer>
                  <Content>{question.body}</Content>
                  <div>
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

                <Comments
                  addComment={addComment}
                  commentsByQid={commentsByQid}
                  showCommentMessage={showCommentMessage}
                  loading={loading}
                  fetchAllComments={fetchAllComments}
                />
              </>
            )}
          </Panel>
        </>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

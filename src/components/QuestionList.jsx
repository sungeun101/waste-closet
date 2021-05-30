import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Popconfirm, Collapse, Tag } from 'antd';
import Comments from './Comments.jsx';
import EditForm from './EditForm.jsx';
import { CheckCircleTwoTone, CommentOutlined } from '@ant-design/icons';
import { showSuccessMsg, showErrorMsg } from '../messages.js';
import {
  commentService,
  commentsRef,
} from 'service/firebase/firestoreComments.js';
import { questionService } from 'service/config.js';
const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)``;
const StyledPanel = styled(Panel)``;
const PanelHeader = styled.span``;
const Title = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 60%;
  position: relative;
  top: 5px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;
const Content = styled.div`
  padding: 2rem;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledConfirm = styled(Popconfirm)`
  margin-left: 0.5rem;
`;
const CommentCount = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  opacity: 0.5;

  &:hover {
    opacity: 0.7;
  }
`;
const AdminReplied = styled.span`
  @media screen and (max-width: 48rem) {
    display: none;
  }
`;
const ReplyText = styled.span`
  @media screen and (max-width: 48rem) {
    display: none;
  }
`;

const QuestionList = ({ questions, fetchQuestions, userObj }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [questionId, setQuestionId] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    handleFirestoreComments();
  }, []);

  const handleFirestoreComments = () => {
    let arr = [];
    commentsRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          arr.push({ ...change.doc.data(), id: change.doc.id });
        }
        if (change.type === 'removed') {
          const index = arr.indexOf(change.doc.data());
          arr.splice(index, 1);
        }
      });
      let filteredArr = arr.filter(
        (docs, index, callback) =>
          index === callback.findIndex((element) => element.id === docs.id)
      );
      setDocs(filteredArr);
    });
  };

  const checkIfAdminReplied = (id) => {
    const adminDocs = docs.filter((doc) => doc.displayName === '관리자');
    const docQid = adminDocs.map((doc) => doc.questionId);
    if (docQid.includes(id)) {
      return (
        <>
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            onClick={(event) => {
              event.stopPropagation();
            }}
          />{' '}
          <AdminReplied>답변완료</AdminReplied>
        </>
      );
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await questionService.remove(id);
      commentService.remove(id);
    } catch (e) {
      showErrorMsg();
    }
    await fetchQuestions();
    showSuccessMsg('삭제되었습니다');
  };

  const openEditForm = (question) => {
    setSelectedQuestion(question);
    setShowEdit(true);
  };

  const handlePanelChange = async (key) => {
    setShowEdit(false);
    setQuestionId(key);
  };

  const showPanelHeader = (question) => {
    const { category, title, id } = question;
    const commentsByQid = docs.filter((doc) => doc.questionId === id);
    return (
      <PanelHeader>
        {category && <Tag color="#87d068">{category}</Tag>}
        <Title>{title}</Title>
        {commentsByQid.length > 0 && (
          <CommentCount>
            <CommentOutlined />
            {commentsByQid.length}{' '}
            <ReplyText>
              {commentsByQid.length > 1 ? 'replies' : 'reply'}
            </ReplyText>
          </CommentCount>
        )}
      </PanelHeader>
    );
  };

  return (
    <StyledCollapse accordion onChange={handlePanelChange}>
      {questions.map((question) => (
        <>
          <StyledPanel
            key={question.id}
            header={showPanelHeader(question)}
            extra={checkIfAdminReplied(question.id)}
          >
            {showEdit ? (
              <EditForm
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                setShowEdit={setShowEdit}
                fetchQuestions={fetchQuestions}
              />
            ) : (
              <>
                <ContentContainer>
                  <BtnContainer>
                    <span>{question.createdAt}</span>
                    <Button onClick={() => openEditForm(question)}>수정</Button>
                    <StyledConfirm
                      title="정말 삭제하시겠습니까?"
                      onConfirm={() => deleteQuestion(question.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>삭제</Button>
                    </StyledConfirm>
                  </BtnContainer>
                  <Content>{question.body}</Content>
                </ContentContainer>

                <Comments questionId={questionId} userObj={userObj} />
              </>
            )}
          </StyledPanel>
        </>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Popconfirm, Collapse, Tag } from 'antd';
import Comments from './Comments.jsx';
import EditForm from './EditForm.jsx';
import { CheckCircleTwoTone, CommentOutlined } from '@ant-design/icons';
import { showSuccessMsg, showErrorMsg, showWarningMsg } from '../messages.js';
import { commentService } from 'service/firebase/firestoreComments.js';
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
const ContentTitle = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
`;
const CommentContainer = styled.div`
  margin: clamp(1.8rem, 2.5vw, 2.8rem);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Content = styled.div`
  padding: 2rem;
`;
const Time = styled.div`
  margin-top: 3rem;
  opacity: 0.5;
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
const AdminRepliedBox = styled.div`
  margin-top: 0.25rem;
`;
const AdminReplied = styled.span`
  margin-left: 0.2rem;
  @media screen and (max-width: 48rem) {
    display: none;
  }
`;
const ReplyText = styled.span`
  @media screen and (max-width: 48rem) {
    display: none;
  }
`;

const QuestionList = ({ questions, fetchQuestions, userObj, comments }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [questionId, setQuestionId] = useState('');

  const checkIfAdminReplied = (id) => {
    const adminDocs = comments.filter((doc) => doc.displayName === '?????????');
    const docQid = adminDocs.map((doc) => doc.questionId);
    if (docQid.includes(id)) {
      return (
        <AdminRepliedBox>
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          <AdminReplied>????????????</AdminReplied>
        </AdminRepliedBox>
      );
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await questionService.remove(id);
      const commentsByQid = comments.filter((doc) => doc.questionId === id);
      commentsByQid.forEach((doc) => commentService.remove(doc.id));
    } catch (e) {
      showErrorMsg();
    }
    await fetchQuestions();
    showSuccessMsg('?????????????????????');
  };

  const openEditForm = (question) => {
    setSelectedQuestion(question);
    setShowEdit(true);
  };

  const handlePanelChange = async (key) => {
    setShowEdit(false);
    setQuestionId(key);
    if (!userObj) {
      showWarningMsg('????????? ???????????? ???????????? ????????????.');
    }
  };

  const handlePanelHeader = (question) => {
    const { category, title, id } = question;
    const commentsByQid = comments.filter((doc) => doc.questionId === id);

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

  const handlePostedTime = (time) => {
    const arr = time.substring(0, 10);
    return arr;
  };

  return (
    <StyledCollapse accordion onChange={handlePanelChange}>
      {questions.map((question) => (
        <>
          <StyledPanel
            key={question.id}
            header={handlePanelHeader(question)}
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
                  <Content>
                    <ContentTitle>{question.title}</ContentTitle>
                    <div>{question.body}</div>
                    <Time>{handlePostedTime(question.createdAt)}</Time>
                  </Content>
                  {userObj && (
                    <BtnContainer>
                      <Button onClick={() => openEditForm(question)}>
                        ??????
                      </Button>
                      <StyledConfirm
                        title="?????? ?????????????????????????"
                        onConfirm={() => deleteQuestion(question.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button>??????</Button>
                      </StyledConfirm>
                    </BtnContainer>
                  )}
                </ContentContainer>
                <CommentContainer>
                  {userObj && (
                    <Comments questionId={questionId} userObj={userObj} />
                  )}
                </CommentContainer>
              </>
            )}
          </StyledPanel>
        </>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

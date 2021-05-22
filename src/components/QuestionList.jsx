import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Popconfirm, Collapse, Tag, Badge } from 'antd';
import Comments from './Comments.jsx';
import EditForm from './EditForm.jsx';
import { showSuccessMsg, showErrorMsg } from '../messages.js';
import { questionService } from '../service/config.js';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { commentService } from 'service/firestoreConfig.js';
import useFirestore from 'service/useFirestore.js';
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

const QuestionList = ({ questions, fetchQuestions, userObj }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [questionId, setQuestionId] = useState('');
  const [docs, setDocs] = useState([]);
  // const [docQid, setDocQid] = useState([]);
  // const [docsHaveAdmin, setDocsHavAdmin] = useState([]);

  const getAllDouments = () => {
    let arr = [];
    commentService.commentsRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let id = doc.data();
        arr.push(id);
      });
      setDocs(arr);
    });
  };
  // const getDoumentQuestionId = () => {
  //   let arr = [];
  //   commentService.commentsRef.onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       let id = doc.data().questionId;
  //       arr.push(id);
  //     });
  //     let uniqueArr = Array.from(new Set(arr));
  //     setDocQid(uniqueArr);
  //   });
  // };

  // const getDocsHaveAdmin = () => {
  //   let arr = [];
  //   commentService.commentsRef
  //     .where('displayName', '==', '관리자')
  //     .onSnapshot((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         let docs = doc.data().questionId;
  //         arr.push(docs);
  //       });
  //       let uniqueArr = Array.from(new Set(arr));
  //       setDocsHavAdmin(uniqueArr);
  //     });
  // };

  useEffect(() => {
    getAllDouments();
    // getDoumentQuestionId();
    // getDocsHaveAdmin();
  }, []);
  console.log(docs);
  // console.log(docsHaveAdmin);

  const checkIfAdminReplied = (id) => {
    const docsHaveAdmin = docs.filter((doc) => doc.displayName === '관리자');
    console.log(docsHaveAdmin);
    const docQid = docsHaveAdmin.map((doc) => doc.questionId);
    if (docQid.includes(id)) {
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

  const showCommentCount = (id) => {
    // if (docQid.includes(id)) {
    //   return (
    //     <>
    //
    //     </>
    //   );
    // }
  };

  const deleteQuestion = async (id) => {
    try {
      await questionService.remove(id);
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

  const handlePanelChange = (key) => {
    setShowEdit(false);
    setQuestionId(key);
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

                <Comments questionId={questionId} userObj={userObj} />
              </>
            )}
          </Panel>
        </>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

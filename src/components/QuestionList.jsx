import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Popconfirm, Collapse } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { QuestionService } from '../service/config.js';
import Comments from './Comments.jsx';
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
  const [showEdit, setShowEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const { id, title, body } = selectedQuestion;
  const [questionId, setQuestionId] = useState('');

  const deleteQuestion = async (id) => {
    await QuestionService.remove(id);
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
    await QuestionService.update(id, { title, body });
    showMessage('수정되었습니다');
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

  const handleChange = (key) => {
    setShowEdit(false);
    setQuestionId(key);
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

                <Comments questionId={questionId} />
              </>
            )}
          </Panel>
        </>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

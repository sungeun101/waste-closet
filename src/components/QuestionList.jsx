import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Popconfirm, Collapse } from 'antd';
import { Service } from '../service/config.js';
const { Panel } = Collapse;

export const StyledCollapse = styled(Collapse)``;
export const ContentBox = styled.div`
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

const QuestionList = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  showMessage,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const { id, title, body } = selectedQuestion;

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
    await Service.update(id, { title, body });
    showMessage('수정되었습니다');
  };

  const genExtra = () => (
    // <SettingOutlined
    //     onClick={event => {
    //         event.stopPropagation();
    //     }}
    // />
    <span>답변 완료</span>
    // 댓글이 없으면 댓글달기 아이콘 표시
  );

  return (
    <StyledCollapse accordion onChange={() => setShowEdit(false)}>
      {questions.map((question) => (
        <Panel key={question.id} header={question.title} extra={genExtra()}>
          {!showEdit ? (
            <ContentBox>
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
            </ContentBox>
          ) : (
            <Form id="edit-form" onFinish={updateQuestion}>
              <Form.Item>
                <Input name="title" value={title} onChange={handleEditChange} />
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
          )}
        </Panel>
      ))}
    </StyledCollapse>
  );
};

export default QuestionList;

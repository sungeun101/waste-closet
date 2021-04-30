import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 2.5rem;
  padding-top: 5rem;
`;
const StyledItem = styled(Form.Item)`
  display: flex;
  justify-content: center;
`;

const AddForm = ({ setVisible, form, addQuestion }) => {
  const handleSubmit = (values) => {
    addQuestion(values);
    const { title, body } = values;
    if (title === '' || body === '') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (
    <StyledForm form={form} id="add-form" onFinish={handleSubmit}>
      <StyledItem
        name="title"
        rules={[
          {
            required: true,
            message: '제목을 입력해주세요.',
          },
        ]}
      >
        <Input placeholder="제목" />
      </StyledItem>
      <StyledItem
        name="body"
        rules={[
          {
            required: true,
            message: '내용을 입력해주세요.',
          },
        ]}
      >
        <Input.TextArea rows={4} placeholder="내용" />
      </StyledItem>
    </StyledForm>
  );
};

export default AddForm;

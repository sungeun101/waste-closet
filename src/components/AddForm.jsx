import React, { useState } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import SelectBar from './SelectBar';

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
  const [category, setCategory] = useState('');

  const handleSubmit = (values) => {
    const { title, body } = values;
    addQuestion({ category, title, body });
    setVisible(false);
  };

  const getSelectedOption = (value) => {
    setCategory(value);
  };

  return (
    <>
      <StyledForm form={form} id="add-form" onFinish={handleSubmit}>
        <SelectBar selectedOption={getSelectedOption} />
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
    </>
  );
};

export default AddForm;

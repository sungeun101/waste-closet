import React, { useState } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import CategoryBar from './CategoryBar';

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

const AddForm = ({ form, addQuestion, category, setCategory }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (values) => {
    const { title, body } = values;
    addQuestion({
      category: selectedOption,
      title,
      body,
    });
    setSelectedOption('');
  };
  const getSelectedOption = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <StyledForm form={form} id="add-form" onFinish={handleSubmit}>
        <CategoryBar
          category={category}
          setCategory={setCategory}
          setSelectedOption={getSelectedOption}
        />
        <StyledItem
          name="title"
          rules={[
            {
              required: true,
              message: '제목을 입력해주세요.',
            },
          ]}
          help="제목은 60자 이내로 입력해주세요."
        >
          <Input placeholder="제목" maxLength={60} />
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

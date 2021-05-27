import React, { useState } from 'react';
import { showSuccessMsg, showErrorMsg } from '../messages';
// import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import CategoryBar from './CategoryBar.jsx';
import { questionService } from 'service/config';

const EditForm = ({
  selectedQuestion,
  setSelectedQuestion,
  setShowEdit,
  fetchQuestions,
}) => {
  const [category, setCategory] = useState('');
  const { id, title, body } = selectedQuestion;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuestion({
      ...selectedQuestion,
      [name]: value,
    });
  };

  const updateQuestion = async () => {
    try {
      await questionService.update(id, { title, body, category });
    } catch (e) {
      showErrorMsg();
    }
    await fetchQuestions();
    showSuccessMsg('수정되었습니다');
  };

  const getSelectedOption = (value) => {
    setCategory(value);
  };

  return (
    <Form id="edit-form" onFinish={updateQuestion}>
      <CategoryBar
        category={category}
        setCategory={setCategory}
        selectedOption={getSelectedOption}
      />
      <Form.Item
        rules={[
          {
            required: true,
            message: '제목을 입력해주세요.',
          },
        ]}
        help="제목은 60자 이내로 입력해주세요."
      >
        <Input
          name="title"
          value={title}
          onChange={handleEditChange}
          maxLength={60}
        />
      </Form.Item>
      <Form.Item>
        <Input.TextArea
          name="body"
          rules={[
            {
              required: true,
              message: '내용을 입력해주세요.',
            },
          ]}
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
  );
};

export default EditForm;

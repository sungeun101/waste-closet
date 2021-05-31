import React, { useState, useEffect } from 'react';
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
  const [category, setCategory] = useState('# 카테고리');
  const { id, title, body } = selectedQuestion;

  useEffect(() => {
    if (selectedQuestion.category === '') {
      setCategory('# 카테고리');
    } else {
      setCategory(selectedQuestion.category);
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuestion({
      ...selectedQuestion,
      [name]: value,
    });
  };

  const updateQuestion = async () => {
    try {
      if (category === '# 카테고리') {
        await questionService.update(id, { title, body, category: '' });
      } else {
        await questionService.update(id, { title, body, category });
      }
    } catch (e) {
      showErrorMsg();
    }
    await fetchQuestions();
    showSuccessMsg('수정되었습니다');
  };

  const getSelectedOption = (value) => {
    console.log(value);
    setCategory(value);
  };

  return (
    <Form id="edit-form" onFinish={updateQuestion}>
      <CategoryBar
        category={category}
        setCategory={setCategory}
        setSelectedOption={getSelectedOption}
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

import React, { useState } from 'react';
import { questionService } from '../service/config';
import { showErrorMsg } from '../service/messages';
// import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import SelectBar from './SelectBar.jsx';

const EditForm = ({
  selectedQuestion,
  setSelectedQuestion,
  showMessage,
  setShowEdit,
}) => {
  const { id, title, body } = selectedQuestion;
  const [category, setCategory] = useState('');
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
    showMessage('수정되었습니다');
  };

  const getOptionValue = (value) => {
    setCategory(value);
  };

  return (
    <Form id="edit-form" onFinish={updateQuestion}>
      <SelectBar sendOptionValue={getOptionValue} />
      <Form.Item>
        <Input name="title" value={title} onChange={handleEditChange} />
      </Form.Item>
      <Form.Item>
        <Input.TextArea name="body" value={body} onChange={handleEditChange} />
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

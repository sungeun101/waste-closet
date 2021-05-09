import React, { useState } from 'react';
// import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { commentService } from '../service/commentAPI.js';
import { showErrorMsg } from '../service/messages.js';
const { TextArea } = Input;

const CommentForm = ({ questionId, showMessage }) => {
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = async (input) => {
    const { body } = input;
    try {
      await commentService.add({
        questionId,
        body,
      });
    } catch (e) {
      showErrorMsg();
    }
    showMessage('작성되었습니다.');
    form.resetFields();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="body"
        rules={[
          {
            required: true,
            message: '내용을 입력해주세요.',
          },
        ]}
      >
        <TextArea rows={4} onChange={handleChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;

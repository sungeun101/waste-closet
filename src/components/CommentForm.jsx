import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

const CommentForm = ({ addComment }) => {
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Form form={form} onFinish={addComment}>
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

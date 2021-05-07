import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { CommentService } from '../service/comment.js';
const { TextArea } = Input;

const CommentForm = ({ comments, setComments, questionId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = async (input) => {
    if (!value) {
      return;
    }
    const { body } = input;
    const response = await CommentService.add({
      questionId,
      body,
    });
    const newBody = response.data.body;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      form.resetFields();
      setComments([
        ...comments,
        {
          body: newBody,
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="body">
        <TextArea rows={4} onChange={handleChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;

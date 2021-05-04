import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Service } from '../service/config';
const { TextArea } = Input;

const CommentForm = ({ questionId, comments, setComments }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = async (input) => {
    if (!value) {
      return;
    }

    const { body } = input;
    const response = await Service.addComment({
      questionId,
      body,
    });
    const newBody = response.data.body;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      // setValue(''); //안됨..
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

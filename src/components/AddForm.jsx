import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
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

const AddForm = ({ fetchQuestions, baseURL, setShowModal }) => {
  const [form] = Form.useForm();

  const addQuestion = async (values) => {
    const { title, body } = values;
    if (title === '' || body === '') return;
    // if (body === '') {s
    //     form.setFieldsValue({
    //         body: 'Hello world!'
    //     })
    // }
    await axios.post(baseURL, { title, body });
    setShowModal(false);
    message.success('질문이 작성되었습니다');
    fetchQuestions();
    form.resetFields();
  };

  return (
    <StyledForm form={form} name="add-form" onFinish={addQuestion}>
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
      <StyledItem>
        <Button type="primary" htmlType="submit">
          질문하기
        </Button>
      </StyledItem>
    </StyledForm>
  );
};

export default AddForm;

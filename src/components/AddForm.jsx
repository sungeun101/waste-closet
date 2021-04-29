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

  // 이 함수는 props로 부모 컴포넌트에서 넘기도록 하는게 AddForm을 비쥬얼 컴포넌트로서 재활용하기 쉬울거에요
  const addQuestion = async (values) => {
    const { title, body } = values;
    // Form.Item rules required에서 빈값 핸들링 하고 있기 때문에 이 if 블록까지 올 일이 없을거에요. 값 없이 제출 버튼을 눌러 확인해보세요!
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

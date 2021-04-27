import React, { useState } from 'react'
import axios from 'axios';
import { Form, Input, Button,message } from 'antd';
import 'antd/dist/antd.css';

const AddForm = ({ fetchQuestions, baseURL }) => {
    const [isBtnClicked, setIsBtnClicked] = useState(false)
    const [form] = Form.useForm()

    const addQuestion = async values => {
        const { title, body } = values
        if (title === '' || body === '') return
        // if (body === '') {
        //     form.setFieldsValue({
        //         body: 'Hello world!'
        //     })
        // }
        await axios.post(baseURL, { title, body });
        message.success('질문이 작성되었습니다')
        setIsBtnClicked(false)
        fetchQuestions()
        form.resetFields()
    }

    const handleClick = () => {
        setIsBtnClicked(true)
        form.resetFields()
    }


    return (
        <Form form={form} name="add-form" onFinish={addQuestion}>
            {isBtnClicked ?
                (
                    <>
                        <Form.Item
                            name='title'
                            rules={[
                                {
                                    required: true,
                                    message: '제목을 입력해주세요.',
                                },
                            ]}>
                            <Input placeholder="제목" />
                        </Form.Item>
                        <Form.Item
                            name='body' 
                            rules={[
                                {
                                    required: true,
                                    message: '내용을 입력해주세요.',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="내용" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                질문하기
                            </Button>
                            <Button
                                type="default"
                                onClick={() => setIsBtnClicked(false)}>
                                취소
                            </Button>
                        </Form.Item>
                    </>
                ) : (
                    <Button type="primary" onClick={handleClick}>
                        질문하기
                    </Button>
                )
            }
        </Form>
    );
};

export default AddForm;
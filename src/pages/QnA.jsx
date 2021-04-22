import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, List, Spin } from 'antd';
import QnaHeader from '../components/QnaHeader';
import 'antd/dist/antd.css';

const baseURL = 'https://limitless-sierra-67996.herokuapp.com/v1/questions'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const QnA = () => {
    const initialQuestionState = {
        id: null,
        title: '',
        body: ''
    }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [questions, setQuestions] = useState([initialQuestionState])
    const [selectedQuestion, setSelectedQuestion] = useState(initialQuestionState)

    const { id, title, body } = selectedQuestion

    const handleChange = e => {
        const { name, value } = e.target
        setSelectedQuestion({
            ...selectedQuestion,
            [name]: value
        })
    }
    // const onReset = () => {
    //     setSelectedQuestion(initialQuestionState)
    // }

    const fetchQuestions = async () => {
        setError(null)
        setLoading(true)
        try {
            const response = await axios.get(baseURL, { params: { page: 17 } });
            setQuestions(response.data.results)
            // console.log(response.data.results)
        } catch (e) {
            setError(e);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const addQuestion = async values => {
        const { title, body } = values
        await axios.post(baseURL, { title, body });
        fetchQuestions()
    }

    const deleteQuestion = async id => {
        await axios.delete(baseURL + '/' + id)
        fetchQuestions()
    }

    const deleteAllQuestions = async () => {
        for await (const question of questions) {
            await axios.delete(baseURL + '/' + question.id)
        }
        fetchQuestions()
    }

    const openEditForm = question => {
        setSelectedQuestion(question)
    }

    const updateQuestion = async () => {
        await axios.patch(baseURL + '/' + id, { title, body })
        fetchQuestions()
    }


    return (
        <>
            {error && <div>Something went wrong!</div>}
            {loading ? (
                <Spin />
            ) :
                (<>
                    <QnaHeader />

                    <Form {...layout} name="nest-messages" onFinish={addQuestion}>
                        <Form.Item name='title' >
                            <Input placeholder="제목" />
                        </Form.Item>
                        <Form.Item name='body'>
                            <Input.TextArea placeholder="내용" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                질문하기
                            </Button>
                        </Form.Item>
                    </Form>

                    <Form {...layout} name="nest-messages2" onFinish={updateQuestion}>
                        <Form.Item>
                            <Input name='title' value={title} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Input.TextArea name='body' value={body} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="default" htmlType="submit">
                                수정하기
                            </Button>
                            {/* <Button type="default" onClick={onReset}>
                                초기화
                            </Button> */}
                        </Form.Item>
                    </Form>

                    <Button danger onClick={deleteAllQuestions}>모두 삭제</Button>

                    <List
                        itemLayout="horizontal"
                        dataSource={questions}
                        renderItem={question => (
                            <List.Item>
                                <List.Item.Meta
                                    title={question.title}
                                    description={question.body}
                                />
                                <Button type="link" onClick={() => openEditForm(question)}>edit</Button>
                                <Button type="link" onClick={() => deleteQuestion(question.id)}>delete</Button>
                            </List.Item>
                        )}
                    />
                </>)
            }
        </>
    )
}

export default QnA;


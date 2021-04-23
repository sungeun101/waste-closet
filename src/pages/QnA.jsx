import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, List, Spin, Pagination, Alert, Space } from 'antd';
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
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [totalResults, setTotalResults] = useState(1)
    const [deleteCheck, setDeleteCheck] = useState(false)
    const [idToBeDeleted, setIdToBeDeleted] = useState(1)

    const fetchQuestions = async () => {
        setError(null)
        setLoading(true)
        try {
            const response = await axios.get(baseURL, { params: { page: currentPageNumber } })
            // console.log(response)
            setQuestions(response.data.results)
            setTotalResults(response.data.totalResults)
            setDeleteCheck(false)
        } catch (e) {
            setError(e);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const handlePageChange = async page => {
        // 1. current page setting
        setCurrentPageNumber(page)
        // 2. api call 
        const res = await axios.get(baseURL, { params: { page: page } })
        // 3. questions setting
        setQuestions(res.data.results)
    }

    const { id, title, body } = selectedQuestion

    const handleChange = e => {
        const { name, value } = e.target
        setSelectedQuestion({
            ...selectedQuestion,
            [name]: value
        })
    }

    const addQuestion = async values => {
        const { title, body } = values
        await axios.post(baseURL, { title, body });
        fetchQuestions()
    }

    const deleteQuestion = async id => {
        setDeleteCheck(false)
        await axios.delete(baseURL + '/' + id)
        fetchQuestions()
    }

    const deleteAllQuestions = async () => {
        setLoading(true)
        for await (const question of questions) {
            await axios.delete(baseURL + '/' + question.id)
        }
        setLoading(false)
        fetchQuestions()
    }

    const openEditForm = question => {
        setSelectedQuestion(question)
    }

    const updateQuestion = async () => {
        await axios.patch(baseURL + '/' + id, { title, body })
        fetchQuestions()
    }

    const handleDeleteCheck = id => {
        setDeleteCheck(true)
        setIdToBeDeleted(id)
    }

    return (
        <>
            {error && <div>Something went wrong!</div>}

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
                </Form.Item>
            </Form>

            <Button danger onClick={deleteAllQuestions}>현재 페이지 삭제</Button>

            {loading ? (
                <Spin />
            ) : (

                    <List
                        itemLayout="horizontal"
                        dataSource={questions}
                        renderItem={question => (
                            <List.Item>
                                <List.Item.Meta
                                    title={question.title}
                                    description={question.body}
                                />
                                {
                                    (deleteCheck === true && question.id === idToBeDeleted) ? (
                                        <Alert
                                            message="정말 삭제하시겠습니까?"
                                            type="warning"
                                            showIcon
                                            action={
                                                <Space>
                                                    <Button onClick={() => deleteQuestion(question.id)} size="small" type="primary" ghost >
                                                        Yes
                                                </Button>
                                                    <Button onClick={() => setDeleteCheck(false)} size="small" danger ghost >
                                                        No
                                                </Button>
                                                </Space>
                                            }
                                        />
                                    ) : (
                                            <>
                                                <Button type="link" onClick={() => openEditForm(question)}>edit</Button>
                                                <Button type="link" onClick={() => handleDeleteCheck(question.id)}>delete</Button>
                                            </>
                                        )
                                }
                            </List.Item>
                        )}
                    />
                )}


            <Pagination
                onChange={handlePageChange}
                // onChange={page => handlePageChange(page)}
                total={totalResults}
            />

        </>
    )
}

export default QnA;


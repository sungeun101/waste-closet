import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Form, Input, Button, List, Spin, Pagination, Popconfirm, message, Collapse, Select } from 'antd';
import QnaHeader from '../components/QnaHeader';
import AddForm from '../components/AddForm';

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
    const [isBtnClicked, setIsBtnClicked] = useState(false)

    const fetchQuestions = async () => {
        setError(null)
        setLoading(true)
        try {
            const response = await axios.get(baseURL, { params: { page: currentPageNumber } })
            console.log(response)
            setQuestions(response.data.results)
            setTotalResults(response.data.totalResults)
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

    const confirmDelete = async id => {
        await axios.delete(baseURL + '/' + id)
        message.success('삭제되었습니다')
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
        setIsBtnClicked(true)
    }
    const updateQuestion = async () => {
        await axios.patch(baseURL + '/' + id, { title, body })
        fetchQuestions()
    }


    const { Panel } = Collapse;

    const genExtra = () => (
        // <SettingOutlined
        //     onClick={event => {
        //         event.stopPropagation();
        //     }}
        // />
        <span>답변 완료</span>
    );


    return (
        <>
            {error && <div>Something went wrong!</div>}

            <QnaHeader />

            <AddForm fetchQuestions={fetchQuestions} baseURL={baseURL} layout={layout} />

            <Button danger onClick={deleteAllQuestions}>현재 페이지 삭제</Button>

            {
                loading ? (
                    <Spin />
                ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={questions}
                            renderItem={question => (
                                <Collapse
                                    onChange={() => setIsBtnClicked(false)}
                                // expandIconPosition={'right'}
                                >
                                    <Panel
                                        header={question.title}
                                        // key="1"
                                        extra={genExtra()}>

                                        {isBtnClicked === false ? (
                                            <>
                                                <div>{question.body}</div>
                                                <Button
                                                    type="link"
                                                    onClick={() => openEditForm(question)}>edit</Button>
                                                <Popconfirm
                                                    title="정말 삭제하시겠습니까?"
                                                    onConfirm={() => confirmDelete(question.id)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <a href="#">delete</a>
                                                </Popconfirm>
                                            </>
                                        ) : (
                                                <Form {...layout}
                                                    name="nest-messages2"
                                                    onFinish={updateQuestion}>
                                                    <Form.Item>
                                                        <Input
                                                            name='title'
                                                            value={title}
                                                            onChange={handleChange} />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Input.TextArea
                                                            name='body'
                                                            value={body}
                                                            onChange={handleChange} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                                        <Button
                                                            type="default"
                                                            htmlType="submit">
                                                            수정하기
                                                        </Button>
                                                        <Button
                                                            type="default"
                                                            onClick={() => setIsBtnClicked(false)}>
                                                            취소
                                                        </Button>
                                                    </Form.Item>
                                                </Form>

                                            )}

                                    </Panel>
                                </Collapse>
                            )}
                        />
                    )
            }


            <Pagination
                onChange={handlePageChange}
                // onChange={page => handlePageChange(page)}
                total={totalResults}
            />

        </>
    )
}

export default QnA;


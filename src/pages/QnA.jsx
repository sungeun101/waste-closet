import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { Form, Input, Button,  Spin, Popconfirm, message, Collapse } from 'antd';
import SearchBar from '../components/SearchBar';
import AddForm from '../components/AddForm';
import { StyledButton,StyledCollapse,ContentBox,Content,StyledPagination} from './QnA.elements';
// import { Container, Button } from '../../globalStyles';

const baseURL = 'https://limitless-sierra-67996.herokuapp.com/v1/questions'

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
        message.success('수정되었습니다')
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

            <SearchBar />

            <AddForm fetchQuestions={fetchQuestions} baseURL={baseURL} />

            <StyledButton danger onClick={deleteAllQuestions}>현재 페이지 삭제</StyledButton>

            {
                loading ? (
                    <Spin />
                ) : (
                            <StyledCollapse accordion
                            onChange={() => setIsBtnClicked(false)}
                            // expandIconPosition={'right'}
                            >
                                {questions.map(question => (
                                    <Panel
                                        header={question.title}
                                        // key="1"
                                        extra={genExtra()}>

                                        {isBtnClicked === false ? (
                                            <ContentBox>
                                                <Content>{question.body}</Content>
                                                <div>
                                                    <Button
                                                        type="link"
                                                        onClick={() => openEditForm(question)}>edit</Button>
                                                    <Popconfirm
                                                        title="정말 삭제하시겠습니까?"
                                                        onConfirm={() => confirmDelete(question.id)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                        >
                                                        <Button
                                                        type="link">delete</Button>
                                                    </Popconfirm>
                                                </div>
                                            </ContentBox>
                                        ) : (
                                                <Form 
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
                                                    <Form.Item>
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
                                ))}     
                            </StyledCollapse>
                            )}
   
            <StyledPagination
                onChange={handlePageChange}
                // onChange={page => handlePageChange(page)}
                total={totalResults}
            />

        </>
    )
}

export default QnA;


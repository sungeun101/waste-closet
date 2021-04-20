import React, { useEffect, useRef, useState } from 'react';
import Question from '../components/Question';
import QuestionForm from '../components/QuestionForm';
import axios from 'axios';
import { Form, Input, Button, List, Avatar } from 'antd';
import QnaHeader from '../components/QnaHeader';

const baseURL = 'https://limitless-sierra-67996.herokuapp.com/v1/questions'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const QnA = ({ questionData }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [questions, setQuestions] = useState([{ title: 'hello', body: '내용' }])

    useEffect(() => {
        const fetchQuestions = async () => {
            setError(null)
            setLoading(true)
            try {
                const response = await axios.get(baseURL, { params: { page: 15 } });
                setQuestions(response.data.results)
            } catch (e) {
                setError(e);
            }
            setLoading(false)
        }
        fetchQuestions()
    }, [])

    const addQuestion = async values => {
        const { title, body } = values
        await axios.post(baseURL, { title, body });
        const newQuestions = [...questions, values]
        setQuestions(newQuestions)
    }

    //handleSubmit
    const onFinish = (values) => {
        console.log('Success:', values.question);
        addQuestion(values.question)
    };

    return (
        <>
            {error && <div>Something went wrong!</div>}
            {loading ? (
                <div>
                    Loading...
                </div>
            ) :
                (<>
                    <QnaHeader />

                    <Form {...layout} name="nest-messages" onFinish={onFinish}>
                        <Form.Item
                            name={['question', 'title']}
                            label="제목"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['question', 'body']} label="내용">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                질문하기
                            </Button>
                        </Form.Item>
                    </Form>


                    <List
                        itemLayout="horizontal"
                        dataSource={questions}
                        renderItem={questions => (
                            <List.Item>
                                <List.Item.Meta
                                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={questions.title}
                                    description={questions.body}
                                />
                            </List.Item>
                        )}
                    />

                    {/* {questions && (
                        questions.map(question => (
                            <Question
                                key={question.id}
                                question={question}
                            />)))
                    } */}


                </>)
            }
        </>
    )
}

export default QnA;


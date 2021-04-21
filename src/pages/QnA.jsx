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

    useEffect(() => {
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
        fetchQuestions()
    }, [])

    const addQuestion = async values => {
        const { title, body } = values
        const res = await axios.post(baseURL, { title, body });
        const newQuestions = [{ ...questions, values }]
        setQuestions(newQuestions)
        console.log(newQuestions)
    }

    const onFinish = async (values) => {
        addQuestion(values.question)
    };

    const remove = (id) => {
        axios.delete(`baseURL/${id}`)
    }

    // const removeAll =()=>{
    //     axios.delete(baseURL)
    // }

    return (
        <>
            {error && <div>Something went wrong!</div>}
            {loading ? (
                <Spin />
            ) :
                (<>
                    <QnaHeader />

                    <Form {...layout} name="nest-messages" onFinish={onFinish}>
                        <Form.Item
                            name={['question', 'title']}
                        >
                            <Input placeholder="제목" />
                        </Form.Item>
                        <Form.Item name={['question', 'body']} >
                            <Input.TextArea placeholder="내용" />
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
                                <Button type="link">edit</Button>
                                <Button type="link" onClick={remove}>delete</Button>
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


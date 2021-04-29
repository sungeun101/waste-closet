import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Spin, message, Collapse } from 'antd';
import SearchBar from '../components/SearchBar';
import ModalForm from '../components/ModalForm';
import {
  StyledButton,
  BtnContainer,
  StyledCollapse,
  ContentBox,
  Content,
  StyledConfirm,
  StyledPagination,
} from './QnA.elements';

const baseURL = 'https://limitless-sierra-67996.herokuapp.com/v1/questions';

const QnA = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  // isBtnClicked라는 변수이름이 무엇을 의미하는지 모호함
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const fetchQuestions = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(baseURL, {
        params: { page: currentPageNumber },
      });
      setQuestions(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const addQuestion = async (values) => {
    const { title, body } = values;
    console.log(values);

    await axios.post(baseURL, { title, body });
    message.success('질문이 작성되었습니다');
    fetchQuestions();
  };

  const handlePageChange = async (page) => {
    // 1. current page setting
    setCurrentPageNumber(page);
    // 2. api call
    const res = await axios.get(baseURL, { params: { page: page } });
    // 3. questions setting
    setQuestions(res.data.results);
  };

  const { id, title, body } = selectedQuestion;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuestion({
      ...selectedQuestion,
      [name]: value,
    });
  };

  const confirmDelete = async (id) => {
    await axios.delete(baseURL + '/' + id);
    message.success('삭제되었습니다');
    fetchQuestions();
  };

  const deleteAllQuestions = async () => {
    setLoading(true);
    for await (const question of questions) {
      await axios.delete(baseURL + '/' + question.id);
    }
    setLoading(false);
    fetchQuestions();
  };

  const openEditForm = (question) => {
    setSelectedQuestion(question);
    setIsBtnClicked(true);
  };
  const updateQuestion = async () => {
    await axios.patch(baseURL + '/' + id, { title, body });
    message.success('수정되었습니다');
    fetchQuestions();
  };

  const { Panel } = Collapse;

  const genExtra = () => (
    // <SettingOutlined
    //     onClick={event => {
    //         event.stopPropagation();
    //     }}
    // />
    <span>답변 완료</span>
    // 댓글이 없으면 댓글달기 아이콘 표시
  );

  const showModal = () => {
    form.resetFields();
    setVisible(true);
  };

  return (
    <>
      {error && <div>Something went wrong!</div>}

      <SearchBar />

      <BtnContainer>
        <Button type="primary" onClick={showModal}>
          질문하기
        </Button>
        <ModalForm
          form={form}
          visible={visible}
          setVisible={setVisible}
          addQuestion={addQuestion}
        />

        <StyledButton danger onClick={deleteAllQuestions}>
          현재 페이지 삭제
        </StyledButton>
      </BtnContainer>

      {loading ? (
        <Spin />
      ) : (
        <StyledCollapse accordion onChange={() => setIsBtnClicked(false)}>
          {questions.map((question) => (
            <Panel header={question.title} extra={genExtra()}>
              {/* !isBtnClicked 로 더 간편하게 표현할 수 있어요 */}
              {isBtnClicked === false ? (
                <ContentBox>
                  <Content>{question.body}</Content>
                  <div>
                    <Button onClick={() => openEditForm(question)}>수정</Button>
                    <StyledConfirm
                      title="정말 삭제하시겠습니까?"
                      onConfirm={() => confirmDelete(question.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>삭제</Button>
                    </StyledConfirm>
                  </div>
                </ContentBox>
              ) : (
                <Form id="edit-form" onFinish={updateQuestion}>
                  <Form.Item>
                    <Input name="title" value={title} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item>
                    <Input.TextArea
                      name="body"
                      value={body}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="default" htmlType="submit">
                      수정하기
                    </Button>
                    <Button
                      type="default"
                      onClick={() => setIsBtnClicked(false)}
                    >
                      취소
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Panel>
          ))}
        </StyledCollapse>
      )}

      <StyledPagination onChange={handlePageChange} total={totalResults} />
    </>
  );
};

export default QnA;

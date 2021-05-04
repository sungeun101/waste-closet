import React, { useEffect, useState } from 'react';
import { Form, Button, Skeleton, message, Result } from 'antd';
import SearchBar from '../components/SearchBar';
import ModalForm from '../components/ModalForm';
import PageBar from '../components/PageBar';
import { StyledButton, BtnContainer, StyledConfirm } from './QnA.elements';
import QuestionList from '../components/QuestionList';
import { Service } from '../service/config';

const QnA = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const fetchQuestions = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await Service.getAll({
        params: { page: currentPageNumber },
      });
      setQuestions(response.data.results);
      console.log(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentPageNumber]);

  const showMessage = (text) => {
    message.success(text);
    fetchQuestions();
  };

  const addQuestion = async (values) => {
    const { title, body } = values;
    console.log(title, body);
    await Service.add({ title, body });
    showMessage('질문이 작성되었습니다');
  };

  const deleteAllQuestions = async () => {
    setLoading(true);
    for await (const question of questions) {
      await Service.remove(question.id);
    }
    setLoading(false);
    showMessage('삭제되었습니다');
  };

  const showModal = () => {
    form.resetFields();
    setVisible(true);
  };

  return (
    <>
      {error && (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      )}

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

        <StyledConfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={deleteAllQuestions}
          okText="Yes"
          cancelText="No"
        >
          <StyledButton danger>현재 페이지 삭제</StyledButton>
        </StyledConfirm>
      </BtnContainer>

      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <QuestionList questions={questions} showMessage={showMessage} />
      )}

      <PageBar
        setCurrentPageNumber={setCurrentPageNumber}
        totalResults={totalResults}
      />
    </>
  );
};

export default QnA;

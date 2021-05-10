import React, { useEffect, useState } from 'react';
import { Form, Button, Skeleton, message, Result } from 'antd';
import SearchBar from '../components/SearchBar';
import ModalForm from '../components/ModalForm';
import {
  StyledButton,
  BtnContainer,
  StyledConfirm,
  StyledPagination,
} from './QnA.elements';
import QuestionList from '../components/QuestionList';
import { questionService } from '../service/config';
import { showErrorMsg } from '../service/messages';
import {
  DeleteOutlined,
  ReloadOutlined,
  EditOutlined,
} from '@ant-design/icons';

const QnA = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('# 카테고리');
  const [form] = Form.useForm();

  const fetchQuestions = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await questionService.getAll({
        params: { page: currentPageNumber, sortBy: 'createdAt:desc' },
      });
      // console.log(response);
      setQuestions(response.data.results);
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
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: text, key, duration: 2 });
      fetchQuestions();
    }, 1000);
  };

  const addQuestion = async (values) => {
    try {
      await questionService.add(values);
    } catch (e) {
      showErrorMsg();
    }
    showMessage('질문이 작성되었습니다');
  };

  const deleteAllQuestions = async () => {
    setLoading(true);
    try {
      for await (const question of questions) {
        await questionService.remove(question.id);
      }
    } catch (e) {
      showErrorMsg();
    }
    setLoading(false);
    showMessage('삭제되었습니다');
  };

  const showModal = () => {
    form.resetFields();
    setVisible(true);
  };

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPageNumber(page);
  };

  const handleSearchByCategory = async (value) => {
    setError(null);
    setLoading(true);
    try {
      const response = await questionService.getAll({
        params: { category: value },
      });
      const questions = response.data.results;
      if (questions.length > 0) {
        const searchResult = questions.filter(
          (question) => question.category === value
        );
        setQuestions(searchResult);
      } else {
        setQuestions([]);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const handleReload = () => {
    fetchQuestions();
    setSelected('# 카테고리');
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
      <SearchBar
        handleSearchByCategory={handleSearchByCategory}
        setSelected={setSelected}
        selected={selected}
      />
      <BtnContainer>
        <Button type="primary" onClick={showModal}>
          <EditOutlined />
          질문하기
        </Button>
        <ModalForm
          form={form}
          visible={visible}
          setVisible={setVisible}
          addQuestion={addQuestion}
        />
        <div>
          <Button onClick={handleReload}>
            <ReloadOutlined />
          </Button>
          <StyledConfirm
            title="정말 삭제하시겠습니까?"
            onConfirm={deleteAllQuestions}
            okText="Yes"
            cancelText="No"
          >
            <StyledButton danger>
              <DeleteOutlined />
              페이지 삭제
            </StyledButton>
          </StyledConfirm>
        </div>
      </BtnContainer>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : questions.length > 0 ? (
        <QuestionList questions={questions} showMessage={showMessage} />
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
      <StyledPagination onChange={handlePageChange} total={totalResults} />
    </>
  );
};

export default QnA;

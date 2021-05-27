import React, { useEffect, useState } from 'react';
import { Form, Button, Skeleton } from 'antd';
import SearchHeader from '../components/SearchHeader';
import ModalForm from '../components/ModalForm';
import {
  StyledButton,
  BtnContainer,
  StyledConfirm,
  StyledPagination,
} from './QnA.elements';
import QuestionList from '../components/QuestionList';
import { showSuccessMsg, showErrorMsg } from '../messages';
import {
  DeleteOutlined,
  ReloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { questionService } from 'service/config';
import { commentService } from 'service/firebase/firestoreComments';
import useFirestore from 'service/firebase/useFirestore';

const QnA = ({ userObj }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('# 분류별 검색');
  const [searchValue, setSearchValue] = useState('');
  const [form] = Form.useForm();

  const fetchQuestions = async (page = currentPageNumber) => {
    setError(null);
    setLoading(true);
    try {
      const response = await questionService.getAll({
        params: { page, sortBy: 'createdAt:desc' },
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
  }, [currentPageNumber]);

  const addQuestion = async (values) => {
    try {
      await questionService.add(values);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    setVisible(false);
    await fetchQuestions();
    showSuccessMsg('질문이 작성되었습니다');
  };

  // questions.forEach((question) => comment(question.id));
  // const getAllCommentsId =()=>{
  // commentsRef
  //   .where('capital', '==', true)
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, ' => ', doc.data());
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('Error getting documents: ', error);
  //   });

  // }

  const deletePage = async () => {
    setLoading(true);
    try {
      for await (const question of questions) {
        await questionService.remove(question.id);
      }
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    setLoading(false);
    if (currentPageNumber > 1) {
      await fetchQuestions(currentPageNumber - 1);
    } else {
      await fetchQuestions();
    }
    showSuccessMsg('삭제되었습니다');
  };

  const showModal = () => {
    form.resetFields();
    setVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPageNumber(page);
  };

  const handleReload = () => {
    fetchQuestions();
    setSearchValue('');
    setSelected('# 분류별 검색');
  };

  const fetchAllQuestions = async () => {
    try {
      const response = await questionService.getAll({
        params: { limit: 1000, sortBy: 'createdAt:desc' },
      });
      return response.data.results;
    } catch (e) {
      setError(e);
    }
  };

  const searchByCategory = async (value) => {
    setError(null);
    setLoading(true);
    try {
      const allQuestions = await fetchAllQuestions();
      const searchResult = allQuestions.filter(
        (question) => question.category === value
      );
      setQuestions(searchResult);
      setTotalResults(searchResult.length);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const searchByName = async (value) => {
    setError(null);
    setLoading(true);
    try {
      const allQuestions = await fetchAllQuestions();
      const searchResult = allQuestions.filter(
        (question) =>
          question.title.includes(value) || question.body.includes(value)
      );
      setQuestions(searchResult);
      setTotalResults(searchResult.length);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      {error && showErrorMsg}
      <SearchHeader
        searchByCategory={searchByCategory}
        searchByName={searchByName}
        setSelected={setSelected}
        selected={selected}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <BtnContainer>
        {userObj.displayName !== '관리자' && (
          <>
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
          </>
        )}
        <div>
          <Button onClick={handleReload}>
            <ReloadOutlined />
          </Button>
          {userObj.displayName === '관리자' && (
            <StyledConfirm
              title="이 페이지를 삭제하시겠습니까?"
              onConfirm={deletePage}
              okText="Yes"
              cancelText="No"
            >
              {questions.length > 0 && (
                <StyledButton danger>
                  <DeleteOutlined />
                  페이지 삭제
                </StyledButton>
              )}
            </StyledConfirm>
          )}
        </div>
      </BtnContainer>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : questions.length > 0 ? (
        <QuestionList
          questions={questions}
          fetchQuestions={fetchQuestions}
          userObj={userObj}
        />
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
      <StyledPagination onChange={handlePageChange} total={totalResults} />
    </>
  );
};

export default QnA;

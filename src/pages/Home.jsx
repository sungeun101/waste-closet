import React, { useEffect, useState } from 'react';
import { Form, Button, Skeleton, Tooltip } from 'antd';
import SearchHeader from '../components/SearchHeader';
import ModalForm from '../components/ModalForm';
import {
  StyledButton,
  BtnContainer,
  StyledConfirm,
  StyledPagination,
} from './Home.elements';
import QuestionList from '../components/QuestionList';
import { showSuccessMsg, showErrorMsg, showWarningMsg } from '../messages';
import {
  DeleteOutlined,
  ReloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { questionService } from 'service/config';
import {
  commentService,
  commentsRef,
} from 'service/firebase/firestoreComments';

const Home = ({ userObj }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('# 분류별 검색');
  const [searchValue, setSearchValue] = useState('');
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchQuestions();
  }, [currentPageNumber]);

  useEffect(() => {
    handleFirestoreComments();
  }, []);

  const fetchQuestions = async (page = currentPageNumber) => {
    setError(null);
    setLoading(true);
    try {
      const response = await questionService.getAll({
        params: { page, sortBy: 'createdAt:desc' },
      });
      // console.log(response);
      setQuestions(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const handleFirestoreComments = () => {
    let arr = [];
    commentsRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          arr.push({ ...change.doc.data(), id: change.doc.id });
        }
        if (change.type === 'removed') {
          const index = arr.indexOf(change.doc.data());
          arr.splice(index, 1);
        }
      });
      let filteredArr = arr.filter(
        (docs, index, callback) =>
          index === callback.findIndex((element) => element.id === docs.id)
      );
      setComments(filteredArr);
    });
  };

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

  const deletePage = async () => {
    setLoading(true);
    try {
      for await (const question of questions) {
        await questionService.remove(question.id);
        const commentsByQid = comments.filter(
          (doc) => doc.questionId === question.id
        );
        commentsByQid.forEach((doc) => commentService.remove(doc.id));
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
        {!userObj && (
          <Button type="primary" onClick={() => showWarningMsg()}>
            <EditOutlined />
            질문하기
          </Button>
        )}
        {userObj && userObj.displayName !== '관리자' && (
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
          {userObj && userObj.displayName === '관리자' && (
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
          comments={comments}
        />
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
      <StyledPagination onChange={handlePageChange} total={totalResults} />
    </>
  );
};

export default Home;

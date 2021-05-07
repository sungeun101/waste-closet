import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Comment } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { Service } from '../service/config.js';

const CommentContainer = styled.div`
  margin: 2.5rem;
`;

const Comments = (questionId) => {
  console.log(questionId);
  const [comments, setComments] = useState([]);

  const fetchComments = async (questionId) => {
    const response = await Service.getAllComments({ params: { questionId } });
    // console.log(response.data.results);
    setComments(response.data.results);
  };

  useEffect(() => {
    fetchComments(questionId);
  }, []);

  return (
    <CommentContainer>
      {comments.length > 0 && (
        <CommentList comments={comments} fetchComments={fetchComments} />
      )}
      <Comment
        content={
          <CommentForm
            comments={comments}
            setComments={setComments}
            questionId={questionId}
          />
        }
      />
    </CommentContainer>
  );
};

export default Comments;

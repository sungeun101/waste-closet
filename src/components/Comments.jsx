import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Comment, message } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { commentService } from '../service/commentAPI.js';
import { showErrorMsg } from '../service/messages.js';

const CommentContainer = styled.div`
  margin: 2.5rem;
`;

const Comments = ({ questionId }) => {
  // console.log('Comments');
  const [comments, setComments] = useState([]);

  const fetchCommentsByQid = async (questionId) => {
    try {
      const response = await commentService.getAll({
        params: { questionId },
      });
      console.log(response);
      setComments(response.data.results);
    } catch (e) {
      showErrorMsg();
    }
  };

  useEffect(() => {
    fetchCommentsByQid(questionId);
  }, []);

  const showMessage = (text) => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: text, key, duration: 2 });
      fetchCommentsByQid(questionId);
    }, 1000);
  };

  return (
    <CommentContainer>
      {comments.length > 0 && (
        <CommentList comments={comments} showMessage={showMessage} />
      )}
      <Comment
        content={
          <CommentForm questionId={questionId} showMessage={showMessage} />
        }
      />
    </CommentContainer>
  );
};

export default Comments;

import React from 'react';
import styled from 'styled-components';
import { Comment } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { showErrorMsg, showSuccessMsg } from 'messages.js';
import useFirestore from 'service/firebase/useFirestore.js';
import { commentService } from 'service/firebase/firestoreComments.js';
import dayjs from 'dayjs';

const CommentContainer = styled.div`
  margin: clamp(1.8rem, 2.5vw, 2.8rem);
`;

const Comments = ({ questionId, userObj }) => {
  const { email, displayName, photoURL } = userObj;
  const { docs } = useFirestore(questionId);

  const addComment = async (input) => {
    const { body } = input;
    let now = dayjs();
    let time = now.format('YYYY.MM.DD HH:mm');
    try {
      const commentObj = {
        questionId,
        body,
        email,
        displayName,
        photoURL,
        timestamp: time,
      };
      await commentService.add(commentObj);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    showSuccessMsg('작성되었습니다.');
  };

  return (
    <CommentContainer>
      {docs && <CommentList comments={docs} userObj={userObj} />}
      <Comment content={<CommentForm addComment={addComment} />} />
    </CommentContainer>
  );
};

export default Comments;

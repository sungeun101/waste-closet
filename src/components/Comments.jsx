import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment, Spin } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { projectFirestore } from 'service/firebase.js';
import { dbService } from 'service/firestoreConfig.js';
import { showErrorMsg, showSuccessMsg } from 'messages.js';
import useFirestore from 'service/useFirestore.js';

const CommentContainer = styled.div`
  margin: 2.5rem;
`;

const Comments = ({ questionId, userObj }) => {
  const { displayName, photoURL } = userObj;

  const { docs } = useFirestore('comments', questionId);
  console.log(docs);

  const addComment = async (input) => {
    const { body } = input;
    try {
      const commentObj = {
        questionId,
        body,
        displayName,
        photoURL,
        timestamp: Date.now(),
      };
      dbService.add(commentObj);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    showSuccessMsg('작성되었습니다.');
  };

  return (
    <CommentContainer>
      {docs && (
        <CommentList docs={docs} questionId={questionId} userObj={userObj} />
      )}
      <Comment content={<CommentForm addComment={addComment} />} />
    </CommentContainer>
  );
};

export default Comments;

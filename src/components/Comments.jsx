import React from 'react';
import { Comment } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { showErrorMsg, showSuccessMsg } from 'messages.js';
import useFirestore from 'service/firebase/useFirestore.js';
import { commentService } from 'service/firebase/firestoreComments.js';
import dayjs from 'dayjs';

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
    <>
      {docs && <CommentList comments={docs} userObj={userObj} />}
      <Comment content={<CommentForm addComment={addComment} />} />
    </>
  );
};

export default Comments;

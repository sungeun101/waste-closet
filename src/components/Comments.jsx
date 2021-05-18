import React from 'react';
import styled from 'styled-components';
import { Comment, Spin } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';

const CommentContainer = styled.div`
  margin: 2.5rem;
`;

const Comments = ({
  loading,
  commentsByQid,
  fetchAllComments,
  fetchCommentsByQid,
  addComment,
  questionId,
  userObj,
}) => {
  return (
    <CommentContainer>
      {loading ? (
        <Spin />
      ) : (
        <>
          {commentsByQid.length > 0 && (
            <CommentList
              commentsByQid={commentsByQid}
              fetchAllComments={fetchAllComments}
              fetchCommentsByQid={fetchCommentsByQid}
              questionId={questionId}
              userObj={userObj}
            />
          )}
          <Comment content={<CommentForm addComment={addComment} />} />
        </>
      )}
    </CommentContainer>
  );
};

export default Comments;

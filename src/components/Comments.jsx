import React from 'react';
import styled from 'styled-components';
import { Comment, Spin } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';

const CommentContainer = styled.div`
  margin: 2.5rem;
`;

const Comments = ({
  addComment,
  commentsByQid,
  showCommentMessage,
  loading,
  fetchAllComments,
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
              showCommentMessage={showCommentMessage}
              fetchAllComments={fetchAllComments}
            />
          )}
          <Comment content={<CommentForm addComment={addComment} />} />
        </>
      )}
    </CommentContainer>
  );
};

export default Comments;

import React from 'react';
import styled from 'styled-components';
import { Comment, List } from 'antd';

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(comment) => (
        <Comment author="admin" content={comment.body} />
      )}
    />
  );
};

export default CommentList;

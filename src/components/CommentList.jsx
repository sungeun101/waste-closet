import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Comment,
  List,
  Popconfirm,
  Button,
  Form,
  Input,
  Avatar,
  // Tooltip,
} from 'antd';
import { showSuccessMsg, showErrorMsg } from '../messages.js';
import { commentService } from 'service/firestoreConfig.js';
// import moment from 'moment';

const StyledList = styled(List)``;
const CommentContainer = styled.div`
  margin-bottom: 0.5rem;
  word-break: break-all;
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 48rem) {
    flex-direction: column;
  }
`;
const StyledComment = styled(Comment)``;
const BtnContainer = styled.div`
  display: flex;
  padding-top: 2rem;

  @media screen and (max-width: 48rem) {
    padding-top: 0;
    padding-left: 2rem;
  }
`;

const CommentList = ({ comments, userObj }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('1');
  const [body, setBody] = useState({});

  const openEditForm = (comment) => {
    setEditId(comment.id);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setBody(e.target.value);
  };

  const updateComment = (id) => {
    try {
      commentService.update(id, { body });
      setShowEdit(false);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    showSuccessMsg('수정되었습니다.');
  };

  const removeComment = async (id) => {
    try {
      await commentService.remove(id);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    showSuccessMsg('삭제되었습니다.');
  };

  return (
    comments.length > 0 && (
      <StyledList
        dataSource={comments}
        header={`${comments.length} ${
          comments.length > 1 ? 'replies' : 'reply'
        }`}
        itemLayout="horizontal"
        renderItem={(comment) =>
          editId === comment.id && showEdit ? (
            <Form onFinish={() => updateComment(comment.id)}>
              <Form.Item
                name="body"
                rules={[
                  {
                    required: true,
                    message: '내용을 입력해주세요.',
                  },
                ]}
              >
                <Input value={body} onChange={handleEditChange} />
              </Form.Item>
              <Form.Item>
                <Button type="default" htmlType="submit">
                  수정하기
                </Button>
                <Button type="default" onClick={() => setShowEdit(false)}>
                  취소
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <CommentContainer>
              <StyledComment
                avatar={
                  <Avatar
                    src={comment.photoURL}
                    alt={`${comment.displayName}'s avatar`}
                  />
                }
                author={comment.displayName}
                content={comment.body}
                // datetime={
                //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                //     <span>{moment().fromNow()}</span>
                //   </Tooltip>
                // }
              />
              {comment.displayName === userObj.displayName && (
                <BtnContainer>
                  <Button type="link" onClick={() => openEditForm(comment)}>
                    수정
                  </Button>
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    onConfirm={() => removeComment(comment.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link">삭제</Button>
                  </Popconfirm>
                </BtnContainer>
              )}
            </CommentContainer>
          )
        }
      />
    )
  );
};

export default CommentList;

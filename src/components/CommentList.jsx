import React, { useState } from 'react';
// import styled from 'styled-components';
import { Comment, List, Popconfirm, Button, Form, Input, Avatar } from 'antd';
import { commentService } from '../service/commentAPI.js';
import { showSuccessMsg, showErrorMsg } from '../messages.js';

const CommentList = ({
  commentsByQid,
  fetchAllComments,
  fetchCommentsByQid,
  questionId,
  userObj,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('1');
  const [selectedComment, setSelectedComment] = useState({});
  const { body } = selectedComment;

  const openEditForm = (comment) => {
    setSelectedComment(comment);
    setEditId(comment.id);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedComment({
      ...selectedComment,
      [name]: value,
    });
  };

  const update = async (id) => {
    try {
      await commentService.update(id, { body });
      setShowEdit(false);
    } catch (e) {
      showErrorMsg();
    }
    await fetchCommentsByQid(questionId);
    showSuccessMsg('수정되었습니다.');
  };

  const remove = async (id) => {
    try {
      await commentService.remove(id);
    } catch (e) {
      showErrorMsg();
    }
    await fetchCommentsByQid(questionId);
    await fetchAllComments();
    showSuccessMsg('삭제되었습니다.');
  };

  return (
    <List
      dataSource={commentsByQid}
      header={`${commentsByQid.length} ${
        commentsByQid.length > 1 ? 'replies' : 'reply'
      }`}
      itemLayout="horizontal"
      renderItem={(comment) =>
        editId === comment.id && showEdit ? (
          <Form onFinish={() => update(comment.id)}>
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
          <>
            <Comment
              avatar={
                <Avatar
                  src={userObj.photoURL}
                  alt={`${userObj.displayName}'s avatar`}
                />
              }
              author={userObj.displayName}
              content={comment.body}
            />
            <Button onClick={() => openEditForm(comment)}>수정</Button>
            <Popconfirm
              title="정말 삭제하시겠습니까?"
              onConfirm={() => remove(comment.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>삭제</Button>
            </Popconfirm>
          </>
        )
      }
    />
  );
};

export default CommentList;

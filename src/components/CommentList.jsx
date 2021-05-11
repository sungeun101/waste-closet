import React, { useState } from 'react';
// import styled from 'styled-components';
import { Comment, List, Popconfirm, Button, Form, Input } from 'antd';
import { commentService } from '../service/commentAPI.js';
import { showErrorMsg } from '../service/messages.js';

const CommentList = ({
  commentsByQid,
  showCommentMessage,
  fetchAllComments,
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
    showCommentMessage('수정되었습니다.');
  };

  const remove = async (id) => {
    try {
      await commentService.remove(id);
    } catch (e) {
      showErrorMsg();
    }
    fetchAllComments();
    showCommentMessage('삭제되었습니다.');
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
            <Form.Item>
              <Input name="body" value={body} onChange={handleEditChange} />
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
            <Comment author="admin" content={comment.body} />
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

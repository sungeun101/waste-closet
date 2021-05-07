import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment, List, Popconfirm, Button, Form, Input } from 'antd';
import { Service } from '../service/config';

const CommentList = ({ comments, fetchComments }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('1');
  const [selectedComment, setSelectedComment] = useState({});
  const { body } = selectedComment;

  const remove = async (id) => {
    const res = await Service.getCommentbyId(id);
    const questionId = res.data.questionId;
    await Service.removeComment(id);
    fetchComments(questionId);
  };

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
    await Service.updateComment(id, { body });
    const res = await Service.getCommentbyId(id);
    const questionId = res.data.questionId;
    fetchComments(questionId);
    setShowEdit(false);
  };

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(comment) => {
        return editId === comment.id && showEdit ? (
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
        );
      }}
    />
  );
};

export default CommentList;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment, List, Popconfirm, Button, Form, Input } from 'antd';
import { Service } from '../service/config';

const CommentList = ({ comments, fetchComments }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const { id, body } = selectedComment;

  const remove = async (id) => {
    console.log(id);
    const res = await Service.getCommentbyId(id);
    const questionId = res.data.questionId;
    await Service.removeComment(id);
    await fetchComments(questionId);
  };

  const openEditForm = (comment) => {
    setSelectedComment(comment);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedComment({
      ...selectedComment,
      [name]: value,
    });
  };

  const update = async (data) => {
    console.log(data);
    await Service.updateComment(id, { body });
    setShowEdit(false);
    const res = await Service.getCommentbyId(id);
    const questionId = res.data.questionId;
    await fetchComments(questionId);
  };

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(comment) => {
        return showEdit ? (
          <Form id="edit-form" onFinish={update}>
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
            <div>
              <Button onClick={() => openEditForm(comment)}>수정</Button>
              <Popconfirm
                title="정말 삭제하시겠습니까?"
                onConfirm={() => remove(comment.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button>삭제</Button>
              </Popconfirm>
            </div>
          </>
        );
      }}
    />
  );
};

export default CommentList;

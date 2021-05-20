import React, { useState } from 'react';
// import styled from 'styled-components';
import { Comment, List, Popconfirm, Button, Form, Input, Avatar } from 'antd';
import { showSuccessMsg, showErrorMsg } from '../messages.js';
import { dbService } from 'service/firestoreConfig.js';

const CommentList = ({ comments }) => {
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
      dbService.update(id, { body });
      setShowEdit(false);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    showSuccessMsg('수정되었습니다.');
  };

  const removeComment = async (id) => {
    try {
      await dbService.remove(id);
    } catch (e) {
      showErrorMsg();
      console.log(e.message);
    }
    showSuccessMsg('삭제되었습니다.');
  };

  return (
    comments.length > 0 && (
      <List
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
            <>
              <Comment
                avatar={
                  <Avatar
                    src={comment.photoURL}
                    alt={`${comment.displayName}'s avatar`}
                  />
                }
                author={comment.displayName}
                content={comment.body}
              />
              <Button onClick={() => openEditForm(comment)}>수정</Button>
              <Popconfirm
                title="정말 삭제하시겠습니까?"
                onConfirm={() => removeComment(comment.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button>삭제</Button>
              </Popconfirm>
            </>
          )
        }
      />
    )
  );
};

export default CommentList;

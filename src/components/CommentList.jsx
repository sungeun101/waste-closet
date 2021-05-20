import React, { useState } from 'react';
// import styled from 'styled-components';
import { Comment, List, Popconfirm, Button, Form, Input, Avatar } from 'antd';
import { commentService } from '../service/commentAPI.js';
import { showSuccessMsg, showErrorMsg } from '../messages.js';
import useFirestore from 'service/useFirestore.js';

const CommentList = ({ docs, questionId, userObj }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('1');
  const [selectedComment, setSelectedComment] = useState({});
  const { body } = selectedComment;

  const openEditForm = (doc) => {
    setSelectedComment(doc);
    setEditId(doc.id);
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
    console.log(id);
    try {
      await commentService.update(id, { body });
      setShowEdit(false);
    } catch (e) {
      showErrorMsg();
    }
    // await fetchCommentsByQid(questionId);
    showSuccessMsg('수정되었습니다.');
  };

  const remove = async (id) => {
    try {
      await commentService.remove(id);
    } catch (e) {
      showErrorMsg();
    }
    // await deleteFromFirestore(id);
    // await fetchCommentsByQid(questionId);
    // await fetchAllComments();
    showSuccessMsg('삭제되었습니다.');
  };

  // const deleteFromFirestore = async (id) => {
  //   await projectFirestore
  //     .collection('comments')
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       console.log('Document successfully deleted!');
  //     })
  //     .catch((error) => {
  //       console.error('Error removing document: ', error);
  //     });
  // };

  return (
    docs.length > 0 && (
      <List
        dataSource={docs}
        header={`${docs.length} ${docs.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(doc) =>
          editId === doc.id && showEdit ? (
            <Form onFinish={() => update(doc.id)}>
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
                    src={doc.photoURL}
                    alt={`${doc.displayName}'s avatar`}
                  />
                }
                author={doc.displayName}
                content={doc.body}
              />
              <Button onClick={() => openEditForm(doc)}>수정</Button>
              <Popconfirm
                title="정말 삭제하시겠습니까?"
                onConfirm={() => remove(doc.id)}
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

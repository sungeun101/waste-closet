import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import AddForm from './AddForm';

const ModalForm = ({ form, visible, setVisible, addQuestion }) => {
  const [category, setCategory] = useState('# 카테고리');

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setCategory('# 카테고리');
  };

  const handleSubmit = () => {
    setCategory('# 카테고리');
  };

  return (
    <Modal
      onCancel={handleCancel}
      visible={visible}
      footer={[
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
        <Button
          form="add-form"
          htmlType="submit"
          key="submit"
          type="primary"
          onClick={handleSubmit}
        >
          질문하기
        </Button>,
      ]}
    >
      <AddForm
        form={form}
        addQuestion={addQuestion}
        category={category}
        setCategory={setCategory}
      />
    </Modal>
  );
};

export default ModalForm;

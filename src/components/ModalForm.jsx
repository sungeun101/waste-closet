import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import AddForm from './AddForm';

const ModalForm = ({ form, visible, setVisible, addQuestion }) => {
  const [selected, setSelected] = useState('# 카테고리');

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setSelected('# 카테고리');
  };

  return (
    <Modal
      onCancel={handleCancel}
      visible={visible}
      footer={[
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
        <Button form="add-form" htmlType="submit" key="submit" type="primary">
          질문하기
        </Button>,
      ]}
    >
      <AddForm
        setVisible={setVisible}
        form={form}
        addQuestion={addQuestion}
        selected={selected}
        setSelected={setSelected}
      />
    </Modal>
  );
};

export default ModalForm;

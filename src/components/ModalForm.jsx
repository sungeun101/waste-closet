import { Modal, Button } from 'antd';
import React from 'react';
import AddForm from './AddForm';

const ModalForm = ({ form, visible, setVisible, addQuestion }) => {
  const handleModalCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      footer={[
        <Button key="back" onClick={handleModalCancel}>
          취소
        </Button>,
        <Button form="add-form" htmlType="submit" key="submit" type="primary">
          질문하기
        </Button>,
      ]}
    >
      <AddForm setVisible={setVisible} form={form} addQuestion={addQuestion} />
    </Modal>
  );
};

export default ModalForm;

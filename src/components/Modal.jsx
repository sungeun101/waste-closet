import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import AddForm from './AddForm';

const ModalWrapper = styled.div`
  width: 30rem;
  height: 22rem;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;
const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
  z-index: 10;
`;

const Modal = ({ showModal, setShowModal, fetchQuestions, baseURL }) => {
  return (
    <ModalWrapper showModal={showModal}>
      <AddForm
        fetchQuestions={fetchQuestions}
        baseURL={baseURL}
        setShowModal={setShowModal}
      />
      <CloseModalButton
        aria-label="Close modal"
        onClick={() => setShowModal((prev) => !prev)}
      />
    </ModalWrapper>
  );
};

export default Modal;

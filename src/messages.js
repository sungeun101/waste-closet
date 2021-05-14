import { message } from 'antd';

export const showSuccessMsg = (text) => {
  const key = 'updatable';
  message.loading({ content: 'Loading...', key });
  message.success({ content: text, key, duration: 2 });
};

export const showErrorMsg = () => {
  message.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
};

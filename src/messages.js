import { message } from 'antd';

export const showSuccessMsg = (text) => {
  const key = 'updatable';
  message.loading({ content: 'Loading...', key });
  message.success({ content: text, key, duration: 2 });
};

const error = '에러가 발생했습니다. 잠시 후 다시 시도해주세요.';

export const showErrorMsg = (text = error) => {
  message.error({ content: text, duration: 4 });
};

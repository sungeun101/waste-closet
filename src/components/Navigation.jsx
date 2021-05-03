import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    setCurrent(document.location.pathname);
  }, []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/" icon={<FileSearchOutlined />}>
        <Link to="/">품목검색</Link>
      </Menu.Item>
      <Menu.Item key="/qna" icon={<QuestionCircleOutlined />}>
        <Link to="/qna">Q&amp;A</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;

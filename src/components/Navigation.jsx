import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { authService } from 'service/firebase';

const Navigation = () => {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    setCurrent(document.location.pathname);
  }, []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/" icon={<FileSearchOutlined />}>
        <Link to="/">품목검색</Link>
      </Menu.Item>
      <Menu.Item key="/qna" icon={<QuestionCircleOutlined />}>
        <Link to="/qna">Q&amp;A</Link>
      </Menu.Item>
      <Button onClick={onLogOutClick}>Log Out</Button>
    </Menu>
  );
};

export default Navigation;

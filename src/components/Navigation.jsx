import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { authService } from 'service/firebase';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navigation = ({ setAdminLogin }) => {
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
    setAdminLogin(false);
  };

  return (
    <Nav>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="/" icon={<FileSearchOutlined />}>
          <Link to="/">품목검색</Link>
        </Menu.Item>
        <Menu.Item key="/qna" icon={<QuestionCircleOutlined />}>
          <Link to="/qna">Q&amp;A</Link>
        </Menu.Item>
      </Menu>
      <Button onClick={onLogOutClick}>Logout</Button>
    </Nav>
  );
};

export default Navigation;

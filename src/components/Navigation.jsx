import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Button, Menu } from 'antd';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { showErrorMsg } from 'messages';
import { authService } from 'service/firebase/firebase';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledAvatar = styled(Avatar)`
  margin-right: 0.3rem;
`;
const LogoutBtn = styled(Button)`
  margin-left: 1rem;
`;

const Navigation = ({ userObj }) => {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    setCurrent(document.location.pathname);
  }, []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const history = useHistory();

  const onLogOutClick = async () => {
    try {
      authService.signOut();
    } catch (error) {
      showErrorMsg(error.message);
    }
    history.push('/');
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

      <div>
        <StyledAvatar src={userObj.photoURL} />
        <span>{userObj.displayName}</span>
        <LogoutBtn onClick={onLogOutClick}>Logout</LogoutBtn>
      </div>
    </Nav>
  );
};

export default Navigation;

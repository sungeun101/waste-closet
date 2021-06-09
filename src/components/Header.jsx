import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Button, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
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
const StyledButton = styled(Button)`
  margin-left: 1rem;
`;

const Header = ({ isLoggedIn, userObj }) => {
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
    // history.push('/');
  };

  const onSignUpClick = async () => {
    history.push('/auth');
  };

  return (
    <Nav>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="/qna" icon={<QuestionCircleOutlined />}>
          <Link to="/qna">Q&amp;A</Link>
        </Menu.Item>
      </Menu>

      <div>
        {isLoggedIn ? (
          <>
            <StyledAvatar src={userObj.photoURL} />
            <span>{userObj.displayName}</span>
            <StyledButton onClick={onLogOutClick}>Logout</StyledButton>
          </>
        ) : (
          <>
            <StyledAvatar />
            <span>Welcome!</span>
            <StyledButton onClick={onSignUpClick}>Sign Up</StyledButton>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Header;

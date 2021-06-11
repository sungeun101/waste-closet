import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Breadcrumb, Button } from 'antd';
import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { showErrorMsg } from 'messages';
import { authService } from 'service/firebase/firebase';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
const StyledAvatar = styled(Avatar)`
  margin-right: 0.3rem;
`;
const StyledButton = styled(Button)`
  margin-left: 1rem;
`;

const Header = ({ isLoggedIn, userObj }) => {
  const history = useHistory();

  const onLogOutClick = async () => {
    try {
      authService.signOut();
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  const onSignUpClick = async () => {
    history.push('/auth');
  };

  return (
    <Nav>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <QuestionCircleOutlined />
          <span>Q&amp;A</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {isLoggedIn ? (
          <>
            <StyledAvatar src={userObj.photoURL} />
            <span>{userObj.displayName}</span>
            <StyledButton onClick={onLogOutClick}>Logout</StyledButton>
          </>
        ) : (
          <>
            <StyledAvatar icon={<UserOutlined />} />
            <span>Welcome!</span>
            <StyledButton onClick={onSignUpClick}>Sign Up</StyledButton>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Header;

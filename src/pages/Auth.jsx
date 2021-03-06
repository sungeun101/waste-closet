import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { showErrorMsg, showSuccessMsg } from 'messages';
import { authService, firebaseInstance } from 'service/firebase/firebase';
import {
  Section,
  ImgBox,
  ContentBox,
  Contents,
  Image,
  Title,
  SocialBtns,
  SignUp,
  AdminBtn,
} from './Auth.elements';
import { StyledButton } from './Auth.elements';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const history = useHistory();

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    name === 'email' && setEmail(value);
    name === 'password' && setPassword(value);
  };

  const onFinish = async () => {
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      // console.log(data);
      history.push('/');
      if (newAccount) {
        showSuccessMsg('가입되었습니다.');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showErrorMsg('이미 존재하는 이메일입니다.');
      } else {
        showErrorMsg('가입되지 않은 이메일입니다.');
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const handleSocialLogin = async (name) => {
    let provider;
    try {
      if (name === 'google') {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === 'github') {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      // console.log(data.user);
      history.push('/');
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        if (error.credential.providerId === 'github.com') {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
          await authService.signInWithPopup(provider);
          showSuccessMsg(
            '동일한 이메일로 가입되어있어 Google 로그인 되었습니다.'
          );
        } else {
          showErrorMsg(error.message);
        }
      }
    }
  };

  const handleAdminLogin = async () => {
    const email = 'admin-waste-closet@gmail.com';
    const password = 'admin-waste-closet';
    try {
      await authService.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  return (
    <Section>
      <ImgBox>
        <Image src="../../public/img/bg.jpg" alt="waste-background" />
      </ImgBox>

      <ContentBox>
        <Contents>
          <Title>{newAccount ? 'Sign Up' : 'Login'}</Title>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item>
              <SocialBtns>
                <StyledButton
                  shape="round"
                  size="large"
                  onClick={() => handleSocialLogin('google')}
                >
                  <img
                    src="https://proofmart.com/wp-content/uploads/2021/01/google-g-logo-web.png"
                    alt="google"
                    style={{
                      width: '1.6rem',
                      marginRight: '0.3rem',
                    }}
                  />
                  <span style={{ color: '#000' }}>Continue with Google</span>
                </StyledButton>
                <StyledButton
                  shape="round"
                  size="large"
                  onClick={() => handleSocialLogin('github')}
                >
                  <i
                    className="fab fa-github"
                    style={{ marginRight: '0.5rem' }}
                  ></i>
                  <span>Continue with Github</span>
                </StyledButton>
              </SocialBtns>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: '이메일을 입력해주세요.',
                },
              ]}
            >
              <Input name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password name="password" onChange={handleChange} />
            </Form.Item>
            <Form.Item>
              <SignUp>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {newAccount ? 'Sign up' : 'Login'}
                </Button>
                <div>
                  {newAccount ? (
                    <>
                      가입하셨나요?
                      <Button type="link" onClick={toggleAccount}>
                        Login
                      </Button>
                    </>
                  ) : (
                    <>
                      처음이신가요?
                      <Button type="link" onClick={toggleAccount}>
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </SignUp>
            </Form.Item>
            <Form.Item>
              <AdminBtn>
                <Button danger shape="round" onClick={handleAdminLogin}>
                  관리자 로그인
                </Button>
              </AdminBtn>
            </Form.Item>
          </Form>
        </Contents>
      </ContentBox>
    </Section>
  );
};

export default Auth;

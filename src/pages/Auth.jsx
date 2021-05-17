import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { authService, firebaseInstance } from 'service/firebase';
import { showErrorMsg } from 'messages';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Auth = ({ setAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

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
      console.log(data);
    } catch (error) {
      showErrorMsg(error.message);
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
      console.log(data);
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  const handleAdminLogin = async () => {
    const email = 'admin-waste-closet@gmail.com';
    const password = 'admin1019';
    try {
      const data = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(data);
    } catch (error) {
      showErrorMsg(error.message);
    }
    setAdminLogin(true);
  };

  return (
    <>
      <div>
        <Button onClick={toggleAccount}>
          {newAccount ? 'Sign In' : 'Create Account'}
        </Button>
      </div>

      <div>
        <Button onClick={() => handleSocialLogin('google')}>
          Continue with Google
        </Button>
        <Button onClick={() => handleSocialLogin('github')}>
          Continue with Github
        </Button>
      </div>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            // {
            //   type: 'email',
            //   message: 'The input is not valid E-mail!',
            // },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input name="email" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password name="password" onChange={handleChange} />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {newAccount ? 'Create Account' : 'Log In'}
          </Button>
        </Form.Item>
      </Form>

      <div>
        <Button onClick={handleAdminLogin}>관리자 로그인</Button>
      </div>
    </>
  );
};

export default Auth;

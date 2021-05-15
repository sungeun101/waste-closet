import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { authService } from 'service/firebase';
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

const Auth = () => {
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
      showErrorMsg();
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <div>
        <Button onClick={toggleAccount}>
          {newAccount ? 'Sign In' : 'Create Account'}
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
        <Button>Continue with Google</Button>
        <Button>Continue with Github</Button>
      </div>
    </>
  );
};

export default Auth;

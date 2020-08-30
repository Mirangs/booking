import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { login as loginMutation } from '../mutations/login';
import { setUser } from '../store/user/events';

export interface UserInput {
  email: string;
  password: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const Login = () => {
  const history = useHistory();
  const [login, { loading, error }] = useMutation(loginMutation);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
  }, []);

  const showError = (error: string) => {
    message.error(error);
  };

  const onFinish = async ({ email, password }: UserInput) => {
    try {
      const {
        data: {
          login: { data, error },
        },
      } = await login({ variables: { data: { email, password } } });
      if (error || !data) {
        showError(error.message);
      } else {
        localStorage.setItem('token', data.token);
        setUser({ email, role_name: data.role.name });
        history.push('/apartments');
      }
    } catch (err) {
      showError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Wrapper>
      <Form
        {...layout}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>

        <Form.Item style={{ display: 'grid', placeItems: 'center' }}>
          <Link to='/signUp'>Register</Link>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Login;

import React from 'react';
import { Form, Input, Button, Radio, message } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';

import { signUp as signUpMutation } from '../mutations/signUp';
import { getRoles as getRolesQuery } from '../queries/roles';
import { Role } from '../types';

export interface SignUpInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_role: string;
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

  const [signUp, { loading: signUpLoading, error: signUpError }] = useMutation(
    signUpMutation
  );
  const {
    data: { roles } = { roles: [] },
    loading: rolesLoading,
    error: rolesError,
  } = useQuery(getRolesQuery);

  const loading = signUpLoading || rolesLoading;
  const error = signUpError || rolesError;

  const showError = (error: string) => {
    message.error(error);
  };

  const onFinish = async ({
    email,
    password,
    first_name,
    last_name,
    user_role,
  }: SignUpInput) => {
    try {
      const {
        data: {
          signUp: { error },
        },
      } = await signUp({
        variables: {
          data: { email, password, first_name, last_name, role_id: user_role },
        },
      });

      if (error) {
        showError(error.message);
      } else {
        history.push('/login');
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

        <Form.Item
          label='First Name'
          name='first_name'
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Last Name'
          name='last_name'
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='user_role'
          label='Role'
          rules={[{ required: true, message: 'Please choose role!' }]}
        >
          <Radio.Group>
            {roles.map((role: Role) => (
              <Radio.Button value={role.id}>{role.name}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>

        <Form.Item style={{ display: 'grid', placeItems: 'center' }}>
          <Link to='/login'>Login</Link>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Login;

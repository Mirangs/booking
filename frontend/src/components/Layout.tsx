import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useStore } from 'effector-react';
import { useHistory, NavLink, useLocation } from 'react-router-dom';

import { $user } from '../store/user';

const { Header, Content, Footer } = Layout;

const DashboardLayout: React.FC = ({ children }) => {
  const { email } = useStore($user);
  const history = useHistory();
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState(
    location.pathname.replace('/', '')
  );

  const logout = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 1,
          width: '100%',
        }}
      >
        <Menu theme='dark' mode='horizontal' selectedKeys={[currentNav]}>
          <Menu.Item key='apartments'>
            <NavLink
              to='/apartments'
              onClick={() => setCurrentNav('apartments')}
            >
              Apartments
            </NavLink>
          </Menu.Item>
          <Menu.Item key='vouchers'>
            <NavLink to='/vouchers' onClick={() => setCurrentNav('vouchers')}>
              Vouchers
            </NavLink>
          </Menu.Item>
        </Menu>

        <section style={{ display: 'flex' }}>
          <span style={{ color: '#fff', marginRight: '20px' }}>
            You are signed as {email}
          </span>
          <a href='/logout' onClick={logout}>
            Log out
          </a>
        </section>
      </Header>
      <Content
        className='site-layout'
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className='site-layout-background'
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default DashboardLayout;

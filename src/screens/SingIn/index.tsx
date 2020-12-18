import React, { useEffect, useState } from 'react';

import { Input, Button, Layout, Notification } from 'element-react';

import Api from './../../services/api';
import { login } from './../../services/auth';

import './index.css';
import logo from './../../assets/Logo-dark.png';

const SingIn: React.FC = (props) => {
  const [username, setUsername] = useState<
    React.SyntheticEvent<HTMLInputElement>
  >();
  const [password, setPassword] = useState<
    React.SyntheticEvent<HTMLInputElement>
  >();

  const [loading, setLoading] = useState(false);

  const loginAuth = async () => {
    setLoading(true);
    try {
      const credentials = {
        email: username,
        password: password,
      };
      const { data } = await Api.post('login', credentials);
      login(data.token);
    } catch (error) {
      Notification.warning({
        title: 'Atenção',
        message: error.response.data.errors[0].message,
      });
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <Layout.Row gutter="10">
        <Layout.Col
          span="12"
          xs="24"
          sm="12"
          md="12"
          lg="12"
          className="center"
        >
          <img src={logo} alt="" className="form-image" />
        </Layout.Col>
        <Layout.Col
          span="12"
          xs="24"
          sm="12"
          md="12"
          lg="12"
          className="center"
        >
          <form className="form-body">
            <Input
              className="form-input"
              placeholder="Usuário"
              value={username}
              onChange={setUsername}
            />
            <Input
              className="form-input"
              placeholder="Senha"
              value={password}
              onChange={setPassword}
            />
            <Button
              className="form-button"
              style={{ marginTop: 20 }}
              loading={loading}
              type="success"
              onClick={loginAuth}
            >
              Login
            </Button>
          </form>
        </Layout.Col>
      </Layout.Row>
    </div>
  );
};

export default SingIn;

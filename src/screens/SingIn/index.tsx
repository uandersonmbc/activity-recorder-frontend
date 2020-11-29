import React, { useEffect, useState } from 'react';

import { Input, Button, Layout } from 'element-react';

import './index.css';
import logo from './../../assets/Logo-dark.png';

const SingIn: React.FC = () => {
  const [username, setUsername] = useState<
    React.SyntheticEvent<HTMLInputElement>
  >();
  const [password, setPassword] = useState<
    React.SyntheticEvent<HTMLInputElement>
  >();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(username, password);
  }, [password, username]);

  const login = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
              onClick={login}
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

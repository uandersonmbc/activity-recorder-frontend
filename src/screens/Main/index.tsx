import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { PDFViewer } from '@react-pdf/renderer';
import { Card, Layout, Loading, Menu } from 'element-react';

import Dashboard from '../Dashboard';
import PDF from '../PDF';
import Reports from '../Reports';
import Api from './../../services/api';

interface userState {
  username: string;
  name: string;
  email: string;
  id: string;
  created_at: string;
  remember_me_token: string;
  updated_at: string;
}

const Main: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userState>();

  async function getUser() {
    try {
      setLoading(true);
      const { data } = await Api.get('user');
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    history.push('dashboard');
  }, []);
  return (
    <Loading loading={loading} style={{ height: '100vh' }}>
      <Menu
        theme="dark"
        defaultActive="dashboard"
        className="el-menu-demo"
        mode="horizontal"
        onSelect={(e) => e && history.push(e)}
      >
        <Menu.Item index="dashboard">Dashboard</Menu.Item>
        <Menu.Item index="report">Relatório</Menu.Item>
        <Menu.Item index="pdf">PDF</Menu.Item>
      </Menu>
      <div style={{ padding: 20 }}>
        <Layout.Row gutter="10">
          <Layout.Col span="4" xs="24" sm="4" md="4" lg="4">
            <Card bodyStyle={{ padding: 0, width: '100%' }}>
              <img
                src={`https://chat.criainovacao.com.br/avatar/${user?.username}`}
                style={{ width: '100%' }}
                alt=""
              />
              <div style={{ padding: 10 }}>
                <span>{user?.name}</span>
                <p>{user?.email}</p>
              </div>
            </Card>
          </Layout.Col>
          <Layout.Col span="20" xs="24" sm="20" md="20" lg="20">
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>

              <Route path="/report">
                <Reports />
              </Route>

              <Route path="/pdf">
                <PDFViewer style={{ width: '100%', height: '550px' }}>
                  <PDF />
                </PDFViewer>
              </Route>
            </Switch>
          </Layout.Col>
        </Layout.Row>
      </div>
    </Loading>
  );
};

export default Main;

import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import {
  Layout,
  Menu,
  Table,
  Dialog,
  Button,
  Card,
  TimePicker,
  Select,
} from 'element-react';
import moment from 'moment';

import Api from './../../services/api';

const columns = [
  {
    label: 'Dia',
    prop: 'week',
    width: 150,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <Moment locale="pt-br" format="ddd DD/MMM/YYYY">
        {row.week}
      </Moment>
    ),
  },
  {
    label: 'Hora de entrada',
    prop: 'start_date_timestamp',
    width: 150,
  },
  {
    label: 'Hora de saída',
    prop: 'end_date_timestamp',
    width: 150,
  },

  {
    label: 'Pausas',
    prop: 'pause',
  },
  {
    label: 'Total trabalhado',
    prop: 'total',
    align: 'right',
    width: 150,
  },
  {
    label: '',
    prop: '',
    width: 60,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <Button
        type="info"
        size="small"
        icon="view"
        onClick={() => row.modal()}
      ></Button>
    ),
  },
];

const columnsModal = [
  {
    label: 'Início',
    prop: '',
    width: 220,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <TimePicker
        style={{ width: '100%' }}
        onChange={(e) => console.log(moment(e).toISOString())}
        placeholder="Hora de iníco"
        value={''}
      />
    ),
  },
  {
    label: 'Fim',
    prop: '',
    width: 220,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <TimePicker
        style={{ width: '100%' }}
        onChange={(e) => console.log(moment(e).toISOString())}
        placeholder="Hora de fim"
        value={''}
      />
    ),
  },

  {
    label: 'Tipo',
    prop: '',
    width: 210,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <Select value={''}>
        {[].map((el) => {
          return <Select.Option key={el} label={el} value={el} />;
        })}
      </Select>
    ),
  },
  {
    label: 'Projeto',
    prop: '',
    width: 210,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <Select value={''}>
        {[].map((el) => {
          return <Select.Option key={el} label={el} value={el} />;
        })}
      </Select>
    ),
  },
  {
    label: 'Horas',
    prop: '',
  },
  {
    label: '',
    prop: '',
    width: 150,
    // eslint-disable-next-line react/display-name
    render: (row: any) => (
      <>
        <Button plain={true} type="info" size="small">
          Edit
        </Button>
        <Button type="danger" size="small">
          Delete
        </Button>
      </>
    ),
  },
];

const propsTable = {
  emptyText: 'Sem dados para mostar',
};

interface Week {
  week?: string;
  modal?: () => void;
  pause?: string;
  total?: string;
  start_date_timestamp?: string;
  end_date_timestamp?: string;
}

const Dashboard: React.FC = () => {
  // const [user, setUser] = useState<{ name: string; email: string }>();
  const [modal, setModal] = useState(false);
  const [data, setDados] = useState<Week[]>([]);
  const [edit, setEdit] = useState('');

  async function getUser() {
    const { data } = await Api.get('user');
    // setUser(data);
  }

  function createWeeks() {
    const week: Week[] = [];
    for (let index = 0; index < 6; index++) {
      week.push({
        week: moment().day(6).format('YYYY-MM-DD'),
        modal: () => setModal(!modal),
        pause: '',
        total: '',
        start_date_timestamp: '',
        end_date_timestamp: '',
      });
    }

    setDados(week);
  }

  useEffect(() => {
    // getUser();
    createWeeks();
  }, []);

  return (
    <>
      <Menu
        theme="dark"
        defaultActive="1"
        className="el-menu-demo"
        mode="horizontal"
        onSelect={(e) => console.log(e)}
      >
        <Menu.Item index="dashboard">Dashboard</Menu.Item>
        <Menu.Item index="report">Relatórios</Menu.Item>
      </Menu>
      <div style={{ padding: 20 }}>
        <Layout.Row gutter="10">
          <Layout.Col span="4" xs="24" sm="4" md="4" lg="4" className="center">
            <Card bodyStyle={{ padding: 0 }}>
              <img
                src="https://chat.criainovacao.com.br/avatar/uanderson.lima"
                style={{ width: '100%' }}
                alt=""
              />
              <div style={{ padding: 10 }}>
                <span>Uanderson Nunes</span>
                <p>uandersonmbc@gmail.com</p>
              </div>
            </Card>
          </Layout.Col>
          <Layout.Col
            span="20"
            xs="24"
            sm="20"
            md="20"
            lg="20"
            className="center"
          >
            <Table
              style={{ width: '100%' }}
              columns={columns}
              data={data}
              {...propsTable}
            />
          </Layout.Col>
        </Layout.Row>
      </div>
      <Dialog
        title="Quadro de horas"
        visible={modal}
        onCancel={() => setModal(!modal)}
        size="full"
      >
        <Dialog.Body>
          <Table columns={columnsModal} data={data} />
        </Dialog.Body>
      </Dialog>
    </>
  );
};

export default Dashboard;

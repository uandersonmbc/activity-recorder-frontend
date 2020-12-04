import React, { useEffect, useState } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { RiRestTimeLine } from 'react-icons/ri';
import Moment from 'react-moment';

import { Layout, Menu, Table, Card, Loading, Tag } from 'element-react';
import moment from 'moment';

import Api from './../../services/api';
import { hour } from './../../utils/dates';
interface Week {
  dayWeek: string;
  pause: string | any;
  coffee: string | any;
  lunch: string | any;
  total: string | any;
  absent: string | any;
  start_date_timestamp: string;
  end_date_timestamp: string;
}

import DaysWeek from './daysWeek';

const propsTable = {
  emptyText: 'Sem dados para mostar',
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string }>();
  const [dataWeek, setDataWeek] = useState<Week[]>([]);
  const [weekTotal, setWeekTotal] = useState('00:00');
  const [loading, setLoading] = useState(false);

  async function getUser() {
    const { data } = await Api.get('user');
    setUser(data);
  }

  const columns = [
    {
      type: 'expand',
      // eslint-disable-next-line react/display-name
      expandPannel: function (date: Week) {
        return <DaysWeek date={date.dayWeek} />;
      },
    },
    {
      label: 'Dia',
      prop: '',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (row: any) => (
        <Moment locale="pt-br" format="ddd DD/MMM/YYYY">
          {row.dayWeek}
        </Moment>
      ),
    },
    {
      label: 'Hora de entrada',
      prop: '',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (row: any) =>
        row.start_date_timestamp && (
          <Tag>
            <Moment locale="pt-br" format="HH:MM">
              {row.start_date_timestamp}
            </Moment>
          </Tag>
        ),
    },
    {
      label: 'Hora de saída',
      prop: '',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (row: any) =>
        row.end_date_timestamp && (
          <Tag>
            <Moment locale="pt-br" format="HH:MM">
              {row.end_date_timestamp}
            </Moment>
          </Tag>
        ),
    },

    {
      label: 'Pausas',
      prop: '',
      // eslint-disable-next-line react/display-name
      render: (row: any) => {
        return (
          <>
            {row.coffee !== '' && row.coffee !== '00:00' && (
              <Tag style={{ marginRight: 5 }}>
                <BiCoffeeTogo style={{ marginTop: 5, marginRight: 5 }} />
                {row.coffee}
              </Tag>
            )}
            {row.lunch !== '' && row.lunch !== '00:00' && (
              <Tag style={{ marginRight: 5 }}>
                <IoFastFoodOutline style={{ marginTop: 5, marginRight: 5 }} />
                {row.lunch}
              </Tag>
            )}
            {row.absent !== '' && row.absent !== '00:00' && (
              <Tag style={{ marginRight: 5 }}>
                <RiRestTimeLine style={{ marginTop: 5, marginRight: 5 }} />
                {row.absent}
              </Tag>
            )}
          </>
        );
      },
    },
    {
      label: 'Total trabalhado ' + weekTotal,
      align: 'right',
      prop: '',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (row: any) => {
        return row.total && <Tag>{row.total}</Tag>;
      },
    },
  ];

  async function createWeeks() {
    setLoading(true);
    try {
      const params = {
        start: moment().day(0).format('YYYY-MM-DD'),
        end: moment().day(6).format('YYYY-MM-DD'),
      };
      const { data } = await Api.get('workedhours', { params });
      const week: Week[] = [1, 2, 3, 4, 5, 6, 0].map((e) => {
        const date = moment().day(e).format('YYYY-MM-DD');
        const w = data.find(
          (w: Week) =>
            moment(w.start_date_timestamp).format('YYYY-MM-DD') === date,
        );
        return {
          dayWeek: date,
          pause: w ? hour(w.pause) : '',
          coffee: w ? hour(w.coffee) : '',
          lunch: w ? hour(w.lunch) : '',
          absent: w ? hour(w.absent) : '',
          total: w ? hour(w.total) : '',
          start_date_timestamp: w ? w.start_date_timestamp : '',
          end_date_timestamp: w ? w.end_date_timestamp : '',
        };
      });
      setDataWeek(week);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function searchWeekTotal() {
    try {
      const params = {
        start: moment().day(0).format('YYYY-MM-DD'),
        end: moment().day(6).format('YYYY-MM-DD'),
        weekTotal: true,
      };
      const { data } = await Api.get('workedhours', { params });
      setWeekTotal(hour(data[0].total));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    createWeeks();
    searchWeekTotal();
  }, []);

  return (
    <Loading loading={loading}>
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
                <p>{user?.email}</p>
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
              data={dataWeek}
              {...propsTable}
            />
          </Layout.Col>
        </Layout.Row>
      </div>
    </Loading>
  );
};

export default Dashboard;

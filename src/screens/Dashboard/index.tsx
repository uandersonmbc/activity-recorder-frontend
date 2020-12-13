import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { Table, Loading, Tag, DatePicker } from 'element-react';
import moment from 'moment';

import { Week } from '../../models/types';
import { toHourString, typesHours } from '../../utils/time';
import Api from './../../services/api';
import DaysWeek from './daysWeek';

import './index.css';

const propsTable = {
  emptyText: 'Sem dados para mostar',
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string }>();
  const [dataWeek, setDataWeek] = useState<Week[]>([]);
  const [weekTotal, setWeekTotal] = useState('00:00');
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(moment().toISOString());

  async function createWeeks() {
    setLoading(true);
    try {
      const init = moment(currentWeek);
      const params = {
        start: init.day(0).format('YYYY-MM-DD'),
        end: init.day(6).format('YYYY-MM-DD'),
      };
      const { data } = await Api.get('workedhours', { params });
      const week: Week[] = [0, 1, 2, 3, 4, 5, 6].map((e) => {
        const date = init.day(e).format('YYYY-MM-DD');
        const w = data.find(
          (w: Week) =>
            moment(w.start_date_timestamp).format('YYYY-MM-DD') === date,
        );
        const hour = { hours: 0, minutes: 0, seconds: 0 };
        return {
          dayWeek: date,
          pause: w ? w.pause : hour,
          coffee: w ? w.coffee : hour,
          lunch: w ? w.lunch : hour,
          absent: w ? w.absent : hour,
          total: w ? w.total : hour,
          start_date_timestamp: w ? w.start_date_timestamp : '',
          end_date_timestamp: w ? w.end_date_timestamp : '',
        };
      });
      console.log(week);
      setDataWeek(week);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeekTotal() {
    try {
      const params = {
        start: moment(currentWeek).day(0).format('YYYY-MM-DD'),
        end: moment(currentWeek).day(6).format('YYYY-MM-DD'),
        weekTotal: true,
      };
      const { data } = await Api.get('workedhours', { params });
      setWeekTotal(toHourString(data[0].total));
    } catch (error) {
      console.log(error);
    }
  }

  function updateDad() {
    fetchWeekTotal();
    createWeeks();
  }

  const columns = [
    {
      type: 'expand',
      // eslint-disable-next-line
      expandPannel: function (date: Week) {
        return <DaysWeek date={date.dayWeek} updateDad={() => updateDad()} />;
      },
    },
    {
      label: 'Dia',
      prop: '',
      width: 150,
      // eslint-disable-next-line
      render: (row: any) => (
        <Moment locale="pt-br" format="ddd DD/MMM/YYYY">
          {row.dayWeek}
        </Moment>
      ),
    },
    {
      label: 'Entrada',
      prop: 'start_date_timestamp',
      width: 90,
      // eslint-disable-next-line
      render: (row: any) =>
        row.start_date_timestamp && (
          <Tag type="success">
            <Moment format="HH:mm">{row.start_date_timestamp}</Moment>
          </Tag>
        ),
    },
    {
      label: 'Saída',
      prop: 'end_date_timestamp',
      width: 90,
      // eslint-disable-next-line
      render: (row: any) =>
        row.end_date_timestamp && (
          <Tag type="danger">
            <Moment format="HH:mm">{row.end_date_timestamp}</Moment>
          </Tag>
        ),
    },

    {
      label: 'Pausas',
      prop: '',
      // eslint-disable-next-line
      render: (row: any) => {
        return (
          <>
            {typesHours('coffee', row.coffee)}
            {typesHours('lunch', row.lunch)}
            {typesHours('absent', row.absent)}
          </>
        );
      },
    },
    {
      label: 'Total trabalhado ',
      align: 'right',
      prop: '',
      width: 150,
      // eslint-disable-next-line
      render: (row: any) => {
        return row.total && <Tag>{toHourString(row.total)}</Tag>;
      },
    },
  ];

  useEffect(() => {
    createWeeks();
    fetchWeekTotal();
  }, [currentWeek]);

  return (
    <Loading loading={loading}>
      <div className="center">
        <DatePicker
          value={currentWeek}
          placeholder="Escolha a semana"
          onChange={(date) => {
            setCurrentWeek(date);
            console.debug(date);
          }}
          format="dd/MM/yyyy"
          selectionMode="week"
        />
      </div>
      <Table
        className="table-week"
        columns={columns}
        data={dataWeek}
        {...propsTable}
      />
      <div className="total-week">
        <span>Total da semana: {weekTotal}</span>
      </div>
    </Loading>
  );
};

export default Dashboard;

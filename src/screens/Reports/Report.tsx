import React, { useEffect, useState } from 'react';

import { DatePicker, Loading, Radio } from 'element-react';
import moment from 'moment';
import { stringify } from 'querystring';

import ColumnCharts from '../../components/ColumnCharts';
import PieCharts from '../../components/PieCharts';

import {
  ReportsProject,
  ReportsYear,
  ReportsActivity,
} from '../../models/types';
import Api from './../../services/api';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('year');
  const [dataYearOrMonth, setDataYearOrMonth] = useState<ReportsYear[]>([]);
  const [dataProjects, setDataProjects] = useState<ReportsProject[]>([]);
  const [dataActivities, setDataActivities] = useState<ReportsActivity[]>([]);
  const [barData, setBarData] = useState<{ day: string; value: number }[]>([]);

  async function getData() {
    try {
      setLoading(true);
      const data = await Promise.all([
        Api.get('reports', { params: { year: 2020 } }),
        Api.get('reports', { params: { year: 2020, info: 'projects' } }),
        Api.get('reports', { params: { year: 2020, info: 'activities' } }),
      ]);
      setDataYearOrMonth(data[0].data);
      setDataProjects(data[1].data);
      setDataActivities(data[2].data);
    } catch (error) {
      // alguma alguma coisa
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const dias: { day: string; value: number }[] = [];
    const d =
      info === 'month' ? parseInt(moment().endOf('month').format('DD')) : 12;

    for (let i = 1; i <= d; i++) {
      dias.push({
        day: i < 10 ? '0' + i : '' + i,
        value: 0,
      });
    }
    setBarData(dias);
    getData();
  }, [info]);

  useEffect(() => {
    const diasMonth = barData.map((e) => {
      const dia = dataYearOrMonth.find((d) => d.month === e.day);
      if (dia) {
        e.value = dia.total.hours;
        return e;
      } else {
        return e;
      }
    });

    setBarData(diasMonth);
  }, [dataYearOrMonth]);

  return (
    <div>
      <div>
        <Radio.Group
          value={info}
          onChange={(e: string) => setInfo(e)}
          style={{ marginRight: 20 }}
        >
          <Radio.Button value="month">Mês</Radio.Button>
          <Radio.Button value="year">Ano</Radio.Button>
        </Radio.Group>
        <DatePicker
          value={new Date()}
          placeholder="Pick a month"
          onChange={(date) => {
            console.debug('month DatePicker changed: ', date);
          }}
          selectionMode="month"
        />
      </div>
      <Loading loading={loading}>
        <ColumnCharts
          data={barData.map((m) => m.value)}
          labels={
            info === 'month'
              ? barData.map((m) => m.day)
              : [
                  'jan',
                  'fev',
                  'mar',
                  'abr',
                  'mai',
                  'jun',
                  'jul',
                  'ago',
                  'set',
                  'out',
                  'nov',
                  'dez',
                ]
          }
          potential={[]}
        />
        <PieCharts
          data={dataProjects.map((m) => m.total.hours)}
          labels={dataProjects.map((m) => m.name)}
        />
        <PieCharts
          data={dataActivities.map((m) => m.total.hours)}
          labels={dataActivities.map((m) => m.name)}
        />
      </Loading>
    </div>
  );
};

export default Reports;

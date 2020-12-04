import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { Loading, Button } from 'element-react';

import Api from './../../services/api';
import { hour } from './../../utils/dates';

interface DaysWeekProps {
  date: string;
}

const DaysWeek: React.FC<DaysWeekProps> = ({ date }) => {
  const [dataDays, setDataDays] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  const searchWorkeds = async (date: string) => {
    setLoadingModal(true);
    const params = {
      start: date,
    };

    try {
      const { data } = await Api.get('workedhours', { params });
      setDataDays(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingModal(false);
    }
  };

  useEffect(() => {
    searchWorkeds(date);
    return () => {
      console.log('desmontado');
    };
  }, []);

  return (
    <Loading loading={loadingModal}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <b>
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </b>
        <Button size="mini" type="success" icon="plus">
          Registrar Horas
        </Button>
      </div>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Atividade</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Projeto</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataDays.map((d: any) => (
            <tr key={d}>
              <td>{d.activity}</td>
              <td>
                <Moment locale="pt-br" format="HH:MM">
                  {d.start}
                </Moment>
              </td>
              <td>
                <Moment locale="pt-br" format="HH:MM">
                  {d.start}
                </Moment>
              </td>
              <td>{d.project}</td>
              <td>{hour(d.hours)}</td>
              <td align="center" width="150">
                <Button type="primary" icon="edit" size="mini">
                  editar
                </Button>
                <Button type="danger" icon="delete" size="mini">
                  deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Loading>
  );
};

export default DaysWeek;

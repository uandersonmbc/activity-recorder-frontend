import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { Loading, Button, Dialog } from 'element-react';

import { toHourString } from '../../utils/time';
import Api from './../../services/api';
import { DayWeek } from './types';
interface DaysWeekProps {
  date: string;
}

const DaysWeek: React.FC<DaysWeekProps> = ({ date }) => {
  const [dataDays, setDataDays] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modal, setModal] = useState<string>('');

  const fetchWorkeds = async (date: string) => {
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
    fetchWorkeds(date);
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
          {dataDays.map((d: DayWeek) => (
            <tr key={d.id}>
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
              <td>{toHourString(d.hours)}</td>
              <td align="center" width="150">
                <Button
                  type="primary"
                  icon="edit"
                  size="mini"
                  onClick={() => setModal(d.id)}
                >
                  editar
                </Button>
                <Button
                  type="danger"
                  icon="delete"
                  size="mini"
                  onClick={() => console.log(d.id)}
                >
                  deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog visible={modal !== ''}>
        <Dialog.Body></Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={() => console.log('ok')}>Cancel</Button>
          <Button type="primary" onClick={() => console.log('ok')}>
            Confirm
          </Button>
        </Dialog.Footer>
        s
      </Dialog>
    </Loading>
  );
};

export default DaysWeek;

import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import {
  Loading,
  Button,
  Dialog,
  TimeRangePicker,
  Select,
  Notification,
  Popover,
} from 'element-react';

import { DayWeek, Activity, Project } from '../../models/types';
import { toHourString } from '../../utils/time';
import Api from './../../services/api';
interface DaysWeekProps {
  date: string;
  updateDad: () => void;
}

const DaysWeek: React.FC<DaysWeekProps> = ({ date, updateDad }) => {
  const [dataDays, setDataDays] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [popover, setPopover] = useState<boolean>(false);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [editDay, setEditDay] = useState('');
  const [initEnd, setInitEnd] = useState<Date[]>([]);
  const [activitySelect, setActivitySelect] = useState<number | null>();
  const [projectSelect, setProjectSelect] = useState<number | null>();

  async function fetchWorkeds(date: string) {
    setLoadingModal(true);
    const params = {
      start: date,
    };

    try {
      const { data } = await Api.get('workedhours', { params });
      setDataDays(data);
    } catch (error) {
      Notification.error({
        title: '',
        message: '',
      });
      console.log(error);
    } finally {
      setLoadingModal(false);
    }
  }

  async function fetchProjects() {
    setLoadingModal(true);

    try {
      const { data } = await Api.get('projects');
      setProjects(data);
    } catch (error) {
      Notification.error({
        title: '',
        message: '',
      });
      console.log(error);
    } finally {
      setLoadingModal(false);
    }
  }
  async function fetchActivities() {
    setLoadingModal(true);

    try {
      const { data } = await Api.get('activities');
      setActivities(data);
    } catch (error) {
      Notification.error({
        title: '',
        message: '',
      });
      console.log(error);
    } finally {
      setLoadingModal(false);
    }
  }

  const edit = (id: string) => {
    setEditDay(id);
    const schedule: DayWeek[] = dataDays.filter((d: DayWeek) => d.id === id);
    if (schedule) {
      const ini = new Date(schedule[0].start);
      const end = new Date(schedule[0].end);
      setModal(true);
      setActivitySelect(schedule[0].activity_id);
      setProjectSelect(schedule[0].project_id);
      setInitEnd([ini, end]);
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      const { data } = await Api.delete('workedhours/' + id);
      Notification.success({
        title: 'Uhuuuuu',
        message: data.message,
      });
      updateDad();
    } catch (error) {
      Notification.error({
        title: 'Houve um erro',
        message: 'Não foi possível apagar',
      });
      console.log(error);
    }
  };

  const cancel = () => {
    setModal(false);
    setActivitySelect(null);
    setProjectSelect(null);
    setInitEnd([]);
  };

  const save = async () => {
    const time = {
      project_id: projectSelect,
      activity_id: activitySelect,
      start: date + 'T' + initEnd[0].toISOString().split('T')[1],
      end: date + 'T' + initEnd[1].toISOString().split('T')[1],
    };
    try {
      if (editDay !== '') {
        await Api.put('workedhours/' + editDay, time);
      } else {
        await Api.post('workedhours', time);
      }
      Notification.success({
        title: 'Uhuuuu',
        message: 'Suas horas foram salvas',
      });
      fetchWorkeds(date);
      updateDad();
    } catch (error) {
      console.log(error.response.data.errors);
      Notification.error({
        title: 'Erro ao salvar os dados',
        message: 'Os campos não foram preenchidos corretamente',
      });
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchProjects();
    fetchWorkeds(date);
  }, []);

  useEffect(() => {
    console.log(initEnd);
  }, [initEnd, activitySelect, projects]);

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
        <Button
          size="mini"
          type="success"
          icon="plus"
          onClick={() => setModal(true)}
        >
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
                <Moment locale="pt-br" format="HH:mm">
                  {d.start}
                </Moment>
              </td>
              <td>
                <Moment locale="pt-br" format="HH:mm">
                  {d.end}
                </Moment>
              </td>
              <td>{d.project}</td>
              <td>{toHourString(d.hours)}</td>
              <td align="center" width="150">
                <Button
                  type="primary"
                  icon="edit"
                  size="mini"
                  onClick={() => edit(d.id)}
                >
                  editar
                </Button>

                <Popover
                  placement="top"
                  width="160"
                  trigger="click"
                  content={
                    <div>
                      <p>Deseja apagar mesmo?</p>
                      <div style={{ textAlign: 'right', margin: 0 }}>
                        <Button
                          type="primary"
                          size="mini"
                          onClick={() => deleteActivity(d.id)}
                        >
                          Sim
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Button
                    type="danger"
                    icon="delete"
                    size="mini"
                    onClick={() => console.log(d.id)}
                  >
                    deletar
                  </Button>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog visible={modal} onCancel={cancel}>
        <Dialog.Body>
          <TimeRangePicker
            onChange={(e) => {
              setInitEnd(e);
              console.log(e);
            }}
            placeholder="Início - Fim"
            value={initEnd}
          />
          <Select value={activitySelect} onChange={setActivitySelect}>
            {activities.map((el: Activity) => {
              return (
                <Select.Option key={el.id} label={el.name} value={el.id} />
              );
            })}
          </Select>
          <Select value={projectSelect} onChange={setProjectSelect}>
            {projects.map((el: Project) => {
              return (
                <Select.Option key={el.id} label={el.name} value={el.id} />
              );
            })}
          </Select>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={cancel}>Cancelar</Button>
          <Button type="primary" onClick={save}>
            Salvar
          </Button>
        </Dialog.Footer>
      </Dialog>
    </Loading>
  );
};

export default DaysWeek;

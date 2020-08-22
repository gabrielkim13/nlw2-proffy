import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '' }]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  };

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) return { ...scheduleItem, [field]: value };

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  };

  const handleCreateClass = (event: FormEvent) => {
    event.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('Cadastro realizado com sucesso!');
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Erro no cadastro!');
      });

    history.push('/');
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário de inscrição"
      />

      <form onSubmit={handleCreateClass}>
        <main>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" value={name} onChange={(event) => setName(event.target.value)} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)} />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
            />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(event) => setBio(event.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
              ]}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              <div>Horários disponíveis</div>

              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                  value={scheduleItem.week_day}
                  onChange={(event) => setScheduleItemValue(index, 'week_day', event.target.value)}
                />
                <Input
                  type="time"
                  name="from"
                  label="Das"
                  value={scheduleItem.from}
                  onChange={(event) => setScheduleItemValue(index, 'from', event.target.value)}
                />
                <Input
                  type="time"
                  name="to"
                  label="Até"
                  value={scheduleItem.to}
                  onChange={(event) => setScheduleItemValue(index, 'to', event.target.value)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso" />
              Importante!
              <br />
              Preencha todos os dados!
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </main>
      </form>
    </div>
  );
};

export default TeacherForm;

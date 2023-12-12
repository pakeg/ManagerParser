import { LiaUserPlusSolid, LiaUserCogSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import { useFetcher, useLocation } from 'react-router-dom';

import Modal from './Modal.jsx';
import useErrors from '../../hooks/useErrors.jsx';
import InputTrans from '../InputTrans.jsx';

const ModalAdmin = ({ isOpen, setIsOpen, editAbleUser, setUsers }) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const [dataUsers, setDataUsers] = useState({
    nickname: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const { getError, cleanError, isErrors } = useErrors();

  useEffect(() => {
    if (editAbleUser) {
      setDataUsers({ ...editAbleUser, password: '' });
    }
  }, [editAbleUser]);

  useEffect(() => {
    if (typeof fetcher.data !== 'undefined' && fetcher.data !== null) {
      const [user, action] = fetcher.data;
      if (action == 'createUser') {
        setUsers((state) => [...state, user]);
      }
      if (action == 'updateUser') {
        setUsers((state) =>
          state.map((item) => {
            if (item.id == user.id) return user;
            return item;
          })
        );
      }
      setIsOpen(!isOpen);
      setDataUsers({
        nickname: '',
        name: '',
        surname: '',
        email: '',
        password: '',
      });
    }
  }, [fetcher.data]);

  const createUser = async () => {
    const disabled = isErrors(dataUsers);
    if (disabled) {
      cleanError();

      fetcher.submit(dataUsers, {
        method: 'post',
        action: location.pathname + '/create-new-user',
      });
    }
  };

  const changeUser = async () => {
    const disabled = isErrors(dataUsers);
    if (disabled) {
      cleanError();

      fetcher.submit(dataUsers, {
        method: 'post',
        action: location.pathname + '/update-user',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-96 bg-white rounded-b-md rounded-t-md pb-3">
        <div className="space-y-3">
          <div className="flex items-center bg-black text-white px-4 rounded-t-md py-1.5">
            {editAbleUser ? (
              <>
                <LiaUserCogSolid size={25} className="mr-4" />
                <p>Редактирование пользователя</p>
              </>
            ) : (
              <>
                <LiaUserPlusSolid size={25} className="mr-4" />
                <p>Добавление нового пользователя</p>
              </>
            )}
            <p
              className="grow text-end cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              X
            </p>
          </div>
          <InputTrans
            label={'Имя пользователя'}
            type={'text'}
            name={'nickname'}
            value={dataUsers.nickname}
            setDataUsers={setDataUsers}
            errors={getError()}
          />
          <InputTrans
            label={'Имя'}
            type={'text'}
            name={'name'}
            value={dataUsers.name}
            setDataUsers={setDataUsers}
            errors={getError()}
          />
          <InputTrans
            label={'Фамилия'}
            type={'text'}
            name={'surname'}
            value={dataUsers.surname}
            setDataUsers={setDataUsers}
            errors={getError()}
          />
          <InputTrans
            label={'Електронная почта'}
            type={'email'}
            name={'email'}
            value={dataUsers.email}
            setDataUsers={setDataUsers}
            errors={getError()}
          />
          <InputTrans
            label={'Пароль'}
            type={'password'}
            name={'password'}
            value={dataUsers.password}
            setDataUsers={setDataUsers}
            errors={getError()}
          />
          {editAbleUser ? (
            <div onClick={changeUser}>
              <button>Готово!</button>
            </div>
          ) : (
            <div onClick={createUser}>
              <button>Готово!</button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAdmin;

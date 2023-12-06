import Modal from './Modal.jsx';
import { LiaUserPlusSolid, LiaUserCogSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import createNewUser from '../../actions/createNewUser.js';
import updateUser from '../../actions/updateUser.js';
import useErrors from '../../hooks/useErrors.jsx';
import InputTrans from '../InputTrans.jsx';

const ModalAdmin = ({ isOpen, setIsOpen, user, setUsers }) => {
  const [dataUsers, setDataUsers] = useState({
    nickname: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const { getError, cleanError, isErrors } = useErrors();

  useEffect(() => {
    if (user) {
      setDataUsers({ ...user, password: '' });
    }
  }, [user]);

  const createUser = async () => {
    const disabled = isErrors(dataUsers);
    if (disabled) {
      cleanError();
      const req = await createNewUser(dataUsers);

      if (req.ok) {
        const [res] = await req.json();
        setIsOpen(!isOpen);
        setUsers((state) => [...state, res]);
        setDataUsers({
          nickname: '',
          name: '',
          surname: '',
          email: '',
          password: '',
        });
      } else {
        console.log('Ошибка ' + req.status);
      }
    }
  };

  const changeUser = async () => {
    const req = await updateUser(dataUsers);

    if (req.ok) {
      const [res] = await req.json();
      setIsOpen(!isOpen);
      setUsers((state) =>
        state.map((item) => {
          if (item.id == res.id) return res;
          return item;
        })
      );
      setDataUsers({
        nickname: '',
        name: '',
        surname: '',
        email: '',
        password: '',
      });
    } else {
      console.log('Ошибка ' + req.status);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-96 bg-white rounded-b-md rounded-t-md pb-3">
        <div className="space-y-3">
          <div className="flex items-center bg-black text-white px-4 rounded-t-md py-1.5">
            {user ? (
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
          {user ? (
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

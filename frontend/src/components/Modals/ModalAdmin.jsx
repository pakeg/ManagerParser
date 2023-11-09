import Modal from './Modal.jsx';
import { LiaUserPlusSolid, LiaUserCogSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';

const ModalAdmin = ({ isOpen, setIsOpen, user, setUsers }) => {
  const [dataUsers, setDataUsers] = useState({
    nickname: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setDataUsers({ ...user, password: '' });
    }
  }, [user]);

  const createUser = () => {
    console.log(dataUsers, 'create');
    const req = { id: Math.random(), ...dataUsers };
    if (true) {
      setIsOpen(!isOpen);
      setUsers((state) => [...state, req]);
    }
  };

  const changeUser = () => {
    console.log(dataUsers, 'changeUser');
    setIsOpen(!isOpen);
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
          <div className="relative text-black px-8">
            <input
              id="nickname"
              className="focus:outline-none border bg-white w-full py-2 pl-4 peer placeholder-transparent"
              type="text"
              name="nickname"
              placeholder={dataUsers.nickname}
              value={dataUsers.nickname}
              onChange={(e) =>
                setDataUsers((state) => ({
                  ...state,
                  nickname: e.target.value,
                }))
              }
            />
            <label
              className="absolute text-[#e1e1e1] text-xs transition-all left-12 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#e6e6e6]
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
              htmlFor="nickname"
            >
              Имя пользователя
            </label>
          </div>
          <div className="relative text-black px-8">
            <input
              id="name"
              className="focus:outline-none border bg-white w-full py-2 pl-4 peer placeholder-transparent"
              type="text"
              name="name"
              placeholder={dataUsers.nickname}
              value={dataUsers.name}
              onChange={(e) =>
                setDataUsers((state) => ({
                  ...state,
                  name: e.target.value,
                }))
              }
            />
            <label
              className="absolute text-[#e1e1e1] text-xs transition-all left-12 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#e6e6e6]
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
              htmlFor="name"
            >
              Имя
            </label>
          </div>
          <div className="relative text-black px-8">
            <input
              id="surname"
              className="focus:outline-none border bg-white w-full py-2 pl-4 peer placeholder-transparent"
              type="text"
              name="surname"
              placeholder={dataUsers.nickname}
              value={dataUsers.surname}
              onChange={(e) =>
                setDataUsers((state) => ({
                  ...state,
                  surname: e.target.value,
                }))
              }
            />
            <label
              className="absolute text-[#e1e1e1] text-xs transition-all left-12 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#e6e6e6]
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
              htmlFor="surname"
            >
              Фамилия
            </label>
          </div>
          <div className="relative text-black px-8">
            <input
              id="email"
              className="focus:outline-none border bg-white w-full py-2 pl-4 peer placeholder-transparent"
              type="email"
              name="email"
              placeholder={dataUsers.nickname}
              value={dataUsers.email}
              onChange={(e) =>
                setDataUsers((state) => ({
                  ...state,
                  email: e.target.value,
                }))
              }
            />
            <label
              className="absolute text-[#e1e1e1] text-xs transition-all left-12 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#e6e6e6]
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
              htmlFor="email"
            >
              Електронная почта
            </label>
          </div>
          <div className="relative text-black px-8">
            <input
              id="password"
              className="focus:outline-none border bg-white w-full py-2 pl-4 peer placeholder-transparent"
              type="text"
              name="password"
              placeholder={dataUsers.nickname}
              value={dataUsers.password}
              onChange={(e) =>
                setDataUsers((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
            />
            <label
              className="absolute text-[#e1e1e1] text-xs transition-all left-12 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[#e6e6e6]
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
              htmlFor="password"
            >
              Пароль
            </label>
          </div>
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

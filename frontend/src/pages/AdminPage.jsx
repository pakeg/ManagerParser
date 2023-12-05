import MenuItem from './components/MenuItem.jsx';
import User from './components/User.jsx';
import ModalAdmin from './components/Modals/ModalAdmin.jsx';

import { BiSortDown } from 'react-icons/bi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import updateUser from './actions/updateUser.js';

const AdminPanel = () => {
  const [users, setUsers] = useState(null);
  const [editAbleUser, setEditAbleUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const setEditUser = (user) => {
    setEditAbleUser(user);
    setIsOpen(!isOpen);
  };

  const changeActiveStatus = async (data) => {
    const status = [1, 0];
    data.active_status = status[data.active_status];
    const req = await updateUser(data);

    if (req.ok) {
      const [res] = await req.json();
      console.log(res, 'status-changed');
      setUsers((state) =>
        state.map((item) => {
          if (item.id == res.id) return res;
          return item;
        })
      );
    } else {
      console.log('Ошибка ' + req.status);
    }
  };

  useEffect(() => {
    const data = Array(10)
      .fill(0)
      .map((a, b) => ({
        id: b,
        nickname: 'asdf---' + b,
        name: 'Adfasdf',
        surname: 'Dbsfddfg',
        email: 'gmail@gmail.com',
        active_status: Math.round(Math.random()),
      }));
    setUsers(data);
  }, []);

  return (
    <div>
      <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
        <thead>
          <tr className="bg-[#c1c1c1]">
            <td className="p-2">
              <AiOutlineFieldNumber size={20} />
            </td>
            <MenuItem title={'Имя пользователя'} sort={BiSortDown} />
            <MenuItem title={'Имя'} />
            <MenuItem title={'Фамилия'} />
            <MenuItem title={'Электронная почта (email)'} />
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <User
                key={user.id}
                user={user}
                setEditUser={setEditUser}
                changeActiveStatus={changeActiveStatus}
              />
            ))}
        </tbody>
      </table>
      <ModalAdmin
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={editAbleUser}
        setUsers={setUsers}
      />
    </div>
  );
};

export default AdminPanel;

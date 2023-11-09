import MenuItem from './components/MenuItem.jsx';
import User from './components/User.jsx';
import ModalAdmin from './components/Modals/ModalAdmin.jsx';

import { BiSortDown } from 'react-icons/bi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState(null);
  const [editAbleUser, setEditAbleUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const setEditUser = (user) => {
    setEditAbleUser(user);
    setIsOpen(!isOpen);
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
        active: Math.round(Math.random()),
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
              <User key={user.id} user={user} setEditUser={setEditUser} />
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

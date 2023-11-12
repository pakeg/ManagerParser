import { useState } from 'react';

import { TiEdit } from 'react-icons/ti';
import { ImSwitch } from 'react-icons/im';

const User = ({ user, setEditUser }) => {
  const changeActiveStatus = (user) => {
    console.log(user, 'status');
  };

  return (
    <tr className="bg-[#dfdfdf]">
      <td>
        <span>{user.id}</span>
      </td>
      <td className="w-52">
        <div className="flex items-center justify-between">
          <span className="ml-2.5">{user.nickname}</span>
          <div className="flex items-center mr-2.5 cursor-pointer space-x-2">
            <div onClick={() => setEditUser(user)}>
              <TiEdit size={25} className="text-[#a1a1a1]" />
            </div>
            <div
              className={`${
                user.active ? 'bg-green-500' : 'bg-red-500'
              } text-white rounded-md`}
              onClick={() => changeActiveStatus(user.id)}
            >
              <ImSwitch
                size={11}
                color="white"
                className="text-[#a1a1a1] m-1"
              />
            </div>
          </div>
        </div>
      </td>
      <td className="w-52">
        <span>{user.name}</span>
      </td>
      <td className="w-52">
        <span>{user.surname}</span>
      </td>
      <td className="w-80">
        <span>{user.email}</span>
      </td>
    </tr>
  );
};

export default User;

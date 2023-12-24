import { BiSortDown } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { useEffect, useState } from "react";

import MenuItem from "../components/Menu/MenuItem.jsx";
import User from "../components/User.jsx";
import ModalAdmin from "../components/Modals/ModalAdmin.jsx";

import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, updateUser } from "../store/reducers/adminSlice.js";
import { Navigate } from "react-router-dom";
const session =
  sessionStorage.getItem("authorized")?.match("admin|user|manager")[0] ?? "";

export const AdminPage = () => {
  const { loading, errors, users } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editAbleUser, setEditAbleUser] = useState(null);

  if (session !== "admin") return <Navigate to="/" replace={true} />;

  useEffect(() => {
    if (users.length == 0) dispatch(fetchUsers());
  }, []);

  const setEditUser = (user) => {
    setEditAbleUser(user);
    setIsOpen(!isOpen);
  };

  const changeActiveStatus = async (data) => {
    dispatch(updateUser({ data, action: "updateActiveStatus" }));
  };

  return (
    <div>
      <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
        <thead>
          <tr className="bg-[#c1c1c1]">
            <td className="p-2">
              <AiOutlineFieldNumber size={20} />
            </td>
            <MenuItem title={"Имя пользователя"} sort={BiSortDown} />
            <MenuItem title={"Имя"} />
            <MenuItem title={"Фамилия"} />
            <MenuItem title={"Электронная почта (email)"} />
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
        editAbleUser={editAbleUser}
        dispatch={dispatch}
        loading={loading}
      />
    </div>
  );
};

import { BiSortDown } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { memoize } from "proxy-memoize";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import MenuItem from "../components/Menu/MenuItem.jsx";
import User from "../components/User.jsx";
import ModalAdmin from "../components/Modals/ModalAdmin.jsx";
import Button from "../components/Button.jsx";

import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, updateUser } from "../store/reducers/adminSlice.js";
import { getSortedDataSelector } from "../store/actions/createdActions.js";

const session =
  sessionStorage.getItem("authorized")?.match("admin|user|manager")[0] ?? "";

export const AdminPage = () => {
  const { loading, errors, data } = useSelector(
    memoize((state) => ({
      ...state.adminReducer,
      data: {
        ...getSortedDataSelector(state.adminReducer, "users"),
      },
    })),
  );

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editAbleUser, setEditAbleUser] = useState(null);

  if (session !== "admin" && session !== "manager")
    return <Navigate to="/" replace={true} />;

  useEffect(() => {
    if (typeof data.users === "undefined") dispatch(fetchUsers());
  }, []);

  const setEditUser = (user) => {
    setEditAbleUser(user);
    setIsOpen(!isOpen);
  };

  const changeActiveStatus = async (data) => {
    dispatch(updateUser({ data, action: "updateActiveStatus" }));
  };

  const registerNewUser = () => {
    if (editAbleUser !== null) {
      setEditAbleUser(null);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-auto">
      <div className="flex">
        <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
          <thead>
            <tr className="bg-[#c1c1c1]">
              <td className="p-2">
                <AiOutlineFieldNumber size={20} />
              </td>
              <MenuItem
                title={"Имя пользователя"}
                sort={BiSortDown}
                properties={"nickname"}
                actionType={"users/setSort"}
              />
              <MenuItem
                title={"Имя"}
                sort={BiSortDown}
                properties={"name"}
                actionType={"users/setSort"}
              />
              <MenuItem
                title={"Фамилия"}
                sort={BiSortDown}
                properties={"surname"}
                actionType={"users/setSort"}
              />
              <MenuItem
                title={"Электронная почта (email)"}
                sort={BiSortDown}
                properties={"email"}
                actionType={"users/setSort"}
              />
            </tr>
          </thead>
          <tbody>
            {data.users &&
              data.users.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  setEditUser={setEditUser}
                  changeActiveStatus={changeActiveStatus}
                />
              ))}
          </tbody>
        </table>
        <Button
          text="Добавить пользователя"
          className="mt-1"
          actionButton={registerNewUser}
        />
      </div>
      {isOpen && (
        <ModalAdmin
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editAbleUser={editAbleUser}
          dispatch={dispatch}
          loading={loading}
        />
      )}
    </div>
  );
};

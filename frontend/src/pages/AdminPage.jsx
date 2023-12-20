import MenuItem from "../components/Menu/MenuItem.jsx";
import User from "../components/User.jsx";
import ModalAdmin from "../components/Modals/ModalAdmin.jsx";

import { BiSortDown } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  useFetcher,
  useLocation,
  Navigate,
} from "react-router-dom";

const session =
  sessionStorage.getItem("authorized")?.match("admin|user|manager") ?? "";

export const AdminPage = () => {
  const [users, setUsers] = useState(useLoaderData());
  const [isOpen, setIsOpen] = useState(true);
  const [editAbleUser, setEditAbleUser] = useState(null);
  const fetcher = useFetcher();
  const location = useLocation();

  if (session !== "admin") return <Navigate to="/" replace={true} />;

  useEffect(() => {
    if (typeof fetcher.data !== "undefined" && fetcher.data !== null) {
      const [user] = fetcher.data;
      setUsers((state) =>
        state.map((item) => {
          if (item.id == user.id) return user;
          return item;
        }),
      );
    }
  }, [fetcher.data]);

  const setEditUser = (user) => {
    setEditAbleUser(user);
    setIsOpen(!isOpen);
  };

  const changeActiveStatus = async (data) => {
    fetcher.submit(data, {
      method: "post",
      action: location.pathname + "/update-activestatus-user",
    });
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
        setUsers={setUsers}
      />
    </div>
  );
};

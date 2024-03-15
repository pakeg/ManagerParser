import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { LuCross } from "react-icons/lu";

function Field({
  id,
  index,
  value,
  newItem,
  fetchCreateNewItemCategory,
  fetchUpdateItemCategory,
  fetchDeleteItemCategory,
  dispatch,
}) {
  const [title, setTitle] = useState(value);
  const [visible, setVisible] = useState(false);

  const cancelChange = () => {
    setTitle(value);
  };

  const createProject = () => {
    if (title !== value)
      dispatch(
        fetchCreateNewItemCategory({ choosedElement: "projects", title }),
      );
    setTitle("");
  };

  const updateProject = () => {
    if (title !== value)
      dispatch(
        fetchUpdateItemCategory({
          choosedElement: "projects",
          title,
          id,
          index,
        }),
      );
  };

  const deleteProject = () => {
    dispatch(
      fetchDeleteItemCategory({ choosedElement: "projects", id, index }),
    );
  };

  return (
    <div className="flex justify-between bg-[#ebebeb] rounded-md py-1.5 pl-4">
      <div className="text-black pr-1">
        {visible ? (
          <input
            type="text"
            className="focus:outline-none focus:cursor-default bg-[#ebebeb] w-full cursor-pointer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setVisible(!visible)}
          />
        ) : (
          <input
            type="text"
            className="focus:outline-none focus:cursor-default bg-[#ebebeb] w-full cursor-pointer"
            value={value}
            readOnly
            onFocus={() => setVisible(!visible)}
          />
        )}
      </div>
      <div className="flex items-center">
        <div className="mr-2 w-5 h-5">
          {title !== value && newItem && (
            <div className="hover:bg-green-500 bg-[#a1a1a1] rounded-sm cursor-pointer">
              <BsCheck
                size={20}
                strokeWidth="2"
                fill="white"
                title="create"
                onClick={createProject}
              />
            </div>
          )}
          {title !== value && !newItem && (
            <div className="hover:bg-green-500 bg-[#a1a1a1] rounded-sm cursor-pointer">
              <BsCheck
                size={20}
                strokeWidth="2"
                fill="white"
                title="update"
                onClick={updateProject}
              />
            </div>
          )}
        </div>
        <div className="mr-2 w-5 h-5">
          {title !== value ? (
            <div className="hover:bg-red-500 bg-[#a1a1a1] rounded-sm cursor-pointer">
              <LuCross
                size={20}
                strokeWidth="1"
                fill="white"
                style={{
                  transform: "rotateZ(45deg)",
                }}
                title="cancel"
                onClick={cancelChange}
              />
            </div>
          ) : (
            <div className="hover:bg-red-500 bg-[#a1a1a1] rounded-sm cursor-pointer">
              <LuCross
                size={20}
                strokeWidth="1"
                fill="white"
                style={{
                  transform: "rotateZ(45deg)",
                }}
                title="delete"
                onClick={deleteProject}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Field;

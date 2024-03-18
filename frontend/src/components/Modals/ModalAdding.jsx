import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import useScroll from "../../hooks/useScroll.jsx";

import Modal from "./Modal.jsx";

const ModalAdding = ({ isOpen, setIsOpen, caption, items, action, invert }) => {
  const [itemsForChangeStatus, setItemsForChangeStatus] = useState(items);
  const { isScroll, boxScroll, buttonScroll } = useScroll(true);

  const switchingStatus = (id) => {
    setItemsForChangeStatus(
      itemsForChangeStatus.map((el) =>
        id === el.id
          ? { ...el, active_status: Number(!+el.active_status) }
          : el,
      ),
    );
  };

  const changeStatus = () => {
    const diff = itemsForChangeStatus.filter(
      (el, i) => items[i].active_status != el.active_status,
    );
    if (diff.length > 0) action(diff);
    setIsOpen(!isOpen);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-80 bg-white pb-5 rounded-b-md rounded-t-md">
        <div className="bg-black text-white px-4 rounded-t-md py-1.5">
          <p>{caption}</p>
        </div>
        <div className="min-h-[300px] p-4 pr-1 flex">
          <div className="grow overflow-hidden">
            <div
              className={`max-h-[300px] overflow-auto ${
                isScroll && "-mr-[17px]"
              }`}
              ref={boxScroll}
            >
              <div className="text-black pr-2 space-y-1">
                {itemsForChangeStatus.length > 0 &&
                  itemsForChangeStatus.map((shop, i) => (
                    <div
                      key={shop.id}
                      className="flex items-center justify-between"
                    >
                      <p className="pb-2 border-b w-full">{shop.title}</p>
                      <label
                        className="hover:bg-green-500 bg-[#a1a1a1] rounded-sm cursor-pointer"
                        htmlFor={`${shop.title}_${shop.id}`}
                      >
                        <input
                          id={`${shop.title}_${shop.id}`}
                          type="checkbox"
                          onChange={() => switchingStatus(shop.id)}
                          checked={
                            !invert
                              ? Boolean(+shop.active_status)
                              : !Boolean(+shop.active_status)
                          }
                          className="opacity-0 select-none peer hidden"
                        />
                        <BsCheck
                          color="white"
                          className="peer-checked:bg-green-500 rounded-sm"
                          size={20}
                          strokeWidth="2"
                          title="confirm"
                        />
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-[#c1c1c1] rounded-3xl shadow-[inset_0px_0px_1px_0px_black]">
            <div
              className={` bg-[#e1e1e1] rounded-3xl cursor-grabbing ${
                !isScroll ? "opacity-0 invisible" : "w-3.5 opacity-100 visible"
              }`}
              ref={buttonScroll}
            ></div>
          </div>
        </div>
        <div className="flex justify-evenly">
          <button
            className="text-black border text-xs px-3 py-1 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            Отмена
          </button>
          <div className="flex items-center bg-[#4bc1b5] font-bold text-sm px-3 py-1 rounded">
            <button onClick={changeStatus}>Готово</button>
            <MdOutlineDone size="20" strokeLinecap="round" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalAdding;

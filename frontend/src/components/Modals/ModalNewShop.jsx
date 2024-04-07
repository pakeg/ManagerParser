import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";

import { GoAlertFill } from "react-icons/go";

const ModalNewShop = ({ isOpen, setIsOpen, done, setDone, addShop }) => {
  const [title, setTitle] = useState("");

  const closeModal = () => {
    setTitle("");
    setIsOpen(!isOpen);
    setDone(null);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="min-h-[150px] w-96 bg-[#ebebeb] rounded-md pb-3">
        <div className="flex items-center bg-black text-white px-4 rounded-t-md py-1.5">
          <GoAlertFill size={25} className="mr-4 text-red-500" />
          {!done ? (
            <p>Parcermann ask you...</p>
          ) : (
            <p>Parcermann tells you...</p>
          )}
          <p
            className="grow text-end cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            X
          </p>
        </div>
        <div className="bg-[#ebebeb] p-5 text-black">
          {!done ? (
            <>
              <input
                type="text"
                name="title"
                className="w-full bg-white pl-5 py-2.5 rounded-md"
                placeholder={`Введите название ...`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={`${!done ? "text-center" : "text-end"}`}>
                <button
                  className="px-10 mt-5 bg-[#cccccc] rounded shadow-xl"
                  onClick={addShop.bind(null, title)}
                >
                  OK
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center">{`Магазин "${done.title}" добавлен.`}</p>
              <div className={`${!done ? "text-center" : "text-end"}`}>
                <button
                  className="px-10 mt-5 bg-[#cccccc] rounded shadow-xl"
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalNewShop;

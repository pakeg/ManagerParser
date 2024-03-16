import { GoAlertFill } from "react-icons/go";

import Modal from "./Modal.jsx";

const ModalDelete = ({
  item,
  isOpen,
  setIsOpen,
  actionAccept,
  actionDecline,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-96 h-48">
        <div className="bg-white rounded-t-md flex items-center px-4 py-1">
          <GoAlertFill size={20} color="red" />
          <span className="text-black ml-3">Parcermann asking ...</span>
        </div>
        <div className="bg-[#ebebeb] p-6 rounded-b-md text-center">
          <span className="font-extrabold text-black text-sm">
            Вы уверенны, что хотите удалить "{item}"?
          </span>
          <div className="flex justify-evenly mt-2">
            <button
              className="bg-green-500 rounded py-0.5 px-5 font-extrabold"
              onClick={actionAccept}
            >
              Дааа!
            </button>
            <button
              className="bg-red-500 rounded py-0.5 px-5"
              onClick={() => setIsOpen(!isOpen)}
            >
              О, нет!
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalDelete;

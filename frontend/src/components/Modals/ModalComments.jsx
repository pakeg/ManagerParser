import { useEffect } from "react";
import { LuCross } from "react-icons/lu";

import useScroll from "../../hooks/useScroll";
import { formatDate } from "../../utils/utilsFun";

import Modal from "./Modal.jsx";
import ModalCommentsScrollCell from "./ModalComments/ModalCommentsScrollCell.jsx";

const ModalComments = ({
  isOpen,
  setIsOpen,
  dispatch,
  fetchGetCommentsHistory,
  parsed_product_id,
  comments,
}) => {
  const { isScroll, boxScroll, buttonScroll } = useScroll(true);

  useEffect(() => {
    if (typeof comments === "undefined") {
      dispatch(fetchGetCommentsHistory(parsed_product_id));
    }
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="min-w-[550px] bg-white pb-5 rounded-md">
        <div className="text-black underline text-lg tracking-widest px-4 rounded-t-md py-1.5 flex items-center justify-between">
          <p>История комментариев</p>
          <div
            className="bg-[#4bc1b5] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <LuCross
              size={20}
              strokeWidth="1"
              fill="white"
              title="cancel"
              className="rotate-z-45"
            />
          </div>
        </div>
        <div className="min-h-[300px] p-4 pr-1 flex">
          {comments?.length ? (
            <>
              <div className="grow overflow-hidden">
                <div
                  className={`max-h-[300px] overflow-auto ${isScroll ? "-mr-5" : ""}`}
                  ref={boxScroll}
                >
                  <div>
                    <table className="border-separate text-center text-black border-spacing-1">
                      <thead>
                        <tr className="bg-[#e1e1e1]">
                          <th>Дата</th>
                          <th>Цена</th>
                          <th>Комментарий</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments.map((item) => (
                          <tr key={item.id} className="bg-[#e1e1e1]">
                            <td className="p-5">
                              {formatDate(item.created_on)}
                            </td>
                            <td className="p-5">{item.price}</td>
                            <ModalCommentsScrollCell text={item.text} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                className={`bg-[#c1c1c1] rounded-3xl shadow-[inset_0px_0px_1px_0px_black] ${
                  !isScroll
                    ? "opacity-0 invisible"
                    : "opacity-100 visible mx-2.5"
                }`}
              >
                <div
                  className="w-3.5 bg-[#e1e1e1] rounded-3xl cursor-grabbing"
                  ref={buttonScroll}
                ></div>
              </div>
            </>
          ) : (
            <p className="grow self-center text-center text-black">Пусто ...</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default ModalComments;

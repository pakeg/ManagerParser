import { useCallback, useRef, useState } from "react";
import { MdOutlineHistory } from "react-icons/md";

import ProductShop from "./Product/ProductShop.jsx";
import MenuItemShop from "./Menu/MenuItemShop.jsx";
import ModalComments from "./Modals/ModalComments.jsx";
import ModalAdding from "./Modals/ModalAdding.jsx";

import {
  fetchAddProductComment,
  fetchGetCommentsHistory,
  middlewareSort,
  fetchChangingShopFields,
} from "../store/reducers/mainPageSlice.js";

const PartMainTwo = ({
  shops,
  shopsTableRows,
  comments,
  sortTableTwo,
  dispatch,
  boxScrollHor,
}) => {
  const [comment, setComment] = useState({
    parsed_product_id: null,
    price: 0,
    text: "",
  });
  const commentPopUp = useRef(null);

  const [isOpenModalComments, setIsOpenModalComments] = useState(false);
  const [isModalAdding, setIsModalAdding] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const positionDivComment = useCallback((e, id, price) => {
    setComment({ parsed_product_id: id, price, text: "" });
    const coor = e.target.getBoundingClientRect();
    // 15 - width SVg element, 20 - position right ::after, 12.5 - width ::after
    commentPopUp.current.style.left =
      coor.x - commentPopUp.current.offsetWidth + 15 + 20 + 12.5 + "px";
    // 17.5 - height/2 ::after
    commentPopUp.current.style.top = coor.y + coor.height + 17.5 + "px";
    setIsPopUpOpen(!isPopUpOpen);
  }, []);

  const addNewProductComment = () => {
    if (comment.text.length > 0) {
      dispatch(
        fetchAddProductComment({ ...comment, text: comment.text.trim() })
      );
      setComment({ parsed_product_id: null, price: 0, text: "" });
      setIsPopUpOpen(!isPopUpOpen);
    }
    return;
  };

  const changingStatusShops = (diff) => {
    dispatch(fetchChangingShopFields(diff));
    return;
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="max-w-[416.1px] overflow-auto -mb-[17px]"
          ref={boxScrollHor}
        >
          <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
            <thead className="h-8">
              <tr className="bg-[#c1c1c1]">
                <td className="py-1.5 px-2.5">
                  <div
                    className="flex items-center cursor-pointer text-xl leading-[0.5px]"
                    onClick={() => setIsModalAdding(!isModalAdding)}
                  >
                    +
                  </div>
                </td>
                {shopsTableRows &&
                  shopsTableRows[0]
                    .filter((shop) => shop.active_status != "0")
                    .map((shop) => (
                      <MenuItemShop
                        key={shop.id}
                        shopInfo={shop}
                        action={fetchChangingShopFields}
                        dispatch={dispatch}
                      />
                    ))}
              </tr>
            </thead>
            <tbody>
              {shopsTableRows &&
                shopsTableRows[1].map((items, i) => (
                  <ProductShop
                    key={i}
                    colIndex={i}
                    rows={items}
                    middlewareSort={middlewareSort}
                    sortTableTwo={sortTableTwo}
                    dispatch={dispatch}
                    positionDivComment={positionDivComment}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* -----Comment Pop-up -----*/}

      <div
        ref={commentPopUp}
        className={`${
          isPopUpOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } w-min fixed z-20 rounded-lg border-2 border-solid border-white bg-[#d6d0cf] after:content-[''] after:absolute after:-top-[13px] after:right-[20px] after:w-[25px] after:h-[25px] after:bg-[#d7cdcc] after:border-2 after:border-b-transparent after:border-r-transparent after:-z-[1] after:rotate-z-45`}
      >
        <div className="p-2.5 rounded-lg">
          <div>
            <textarea
              cols="35"
              rows="10"
              value={comment.text}
              placeholder="write comment"
              className="resize-none bg-white rounded-lg text-black p-2.5 focus:outline-none"
              onChange={(e) => setComment({ ...comment, text: e.target.value })}
            />
            <button
              className="text-base bg-gradient-to-b from-yellow-300 to-yellow-500 py-1.5 px-5 rounded-md w-full"
              onClick={addNewProductComment}
            >
              Добавить комментарий
            </button>
          </div>
          <div
            className="flex items-center justify-center text-black"
            onClick={() => setIsOpenModalComments(!isOpenModalComments)}
          >
            <span className="hover:underline cursor-pointer">
              Посмотреть историю
            </span>
            <MdOutlineHistory size="30" />
          </div>
        </div>
        <div
          className="fixed w-full h-full top-0 left-0 z-[-1]"
          onClick={() => setIsPopUpOpen(!isPopUpOpen)}
        ></div>
      </div>

      {/* -----M History -----*/}
      {isOpenModalComments && (
        <ModalComments
          isOpen={isOpenModalComments}
          setIsOpen={setIsOpenModalComments}
          dispatch={dispatch}
          fetchGetCommentsHistory={fetchGetCommentsHistory}
          parsed_product_id={comment.parsed_product_id}
          comments={comments[comment.parsed_product_id]}
        />
      )}
      {/* -----M AddShop -----*/}
      {isModalAdding && (
        <ModalAdding
          isOpen={isModalAdding}
          setIsOpen={setIsModalAdding}
          caption={"Добавить мазазин"}
          items={shops}
          action={changingStatusShops}
        />
      )}
    </div>
  );
};

export default PartMainTwo;

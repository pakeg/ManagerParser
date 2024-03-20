import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memoize } from "proxy-memoize";

import {
  fetchGeneralData,
  fetchAddProductsToProjects,
} from "../store/reducers/mainPageSlice.js";
import { getSortedDataSelector } from "../store/actions/createdActions.js";

import PartMainOne from "../components/PartMainOne.jsx";
import PartMainTwo from "../components/PartMainTwo.jsx";
import PartMainThree from "../components/PartMainThree.jsx";
import Button from "../components/Button";
import ModalAdding from "../components/Modals/ModalAdding.jsx";

import useScroll from "../hooks/useScroll.jsx";
import useScrollHorizontal from "../hooks/useScrollHorizontal";

export const MainPage = () => {
  const { loading, errors, data, comments, sortTableTwo } = useSelector(
    memoize((state) => ({
      ...state.mainPageReducer,
      data: {
        ...getSortedDataSelector(state.mainPageReducer, "products"),
        ...state.newProductReducer.data,
      },
    })),
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState(null);
  const contentRef = useRef(null);
  const tBody = useRef(null);

  const { isScroll, boxScroll, buttonScroll } = useScroll(true);
  const {
    isScroll: isScrollHor,
    boxScroll: boxScrollHor,
    buttonScroll: buttonScrollHor,
  } = useScrollHorizontal();

  useEffect(() => {
    if (typeof data.products === "undefined") dispatch(fetchGeneralData());
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      // window height, header component, fixed bottom menu(height&bottom-margin)
      const availableHidth = window.innerHeight - 58.6 - 28 - 14;
      const heightEl =
        contentRef.current.firstChild.getElementsByTagName("thead")[0]
          .offsetHeight;
      const countedHeight = Math.floor(availableHidth / heightEl) * heightEl;
      boxScroll.current.style.maxHeight = `${countedHeight}px`;
    }
  }, [contentRef.current]);

  const openModalIfProductsChecked = () => {
    const products_id = Array.from(
      tBody.current.querySelectorAll('input[type="checkbox"]:checked'),
      (el) => el.value,
    );
    if (products_id.length) {
      setIsOpen(!isOpen);
      setCheckedProducts(products_id);
    } else {
      alert("Отметьте товары");
    }
  };

  const addProductsToProjects = (projects_id) => {
    dispatch(
      fetchAddProductsToProjects({ products_id: checkedProducts, projects_id }),
    );
  };

  return (
    <div className="mx-auto">
      <div className="flex">
        <div className="overflow-hidden">
          <div
            ref={boxScroll}
            className={`overflow-y-auto overflow-x-hidden ${
              isScroll ? "-mr-[17px]" : ""
            }`}
          >
            <div className="flex" ref={contentRef}>
              {/* -------Table N. 1--------- */}
              <PartMainOne
                tBody={tBody}
                products={data.products}
                categories={data.categories}
                manufactures={data.manufactures}
              />
              {/* -------Table N. 2--------- */}
              {data.shopsTableRows && (
                <PartMainTwo
                  shops={data.shops}
                  shopsTableRows={data.shopsTableRows}
                  comments={comments}
                  sortTableTwo={sortTableTwo}
                  dispatch={dispatch}
                  boxScrollHor={boxScrollHor}
                />
              )}
              {/* -------Table N. 2--------- */}
              <PartMainThree products={data.products} />
              {/*----------------------------*/}
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

        <div className="bg-[#c1c1c1] rounded-3xl shadow-[inset_0px_0px_1px_0px_black] absolute h-max">
          <div
            className={` bg-[#e1e1e1] rounded-3xl cursor-grabbing ${
              !isScrollHor ? "opacity-0 invisible" : "h-3.5 opacity-100 visible"
            }`}
            ref={buttonScrollHor}
          ></div>
        </div>
      </div>

      {/* bottom menu */}
      <div className="fixed bottom-3.5 w-full">
        <div className="flex">
          <div className="flex grow ml-20 text-sm space-x-4">
            <Button text="Обновить" />
            <Button text="Экспорт" />
            <Button
              text="Добавить в проэкт"
              actionButton={openModalIfProductsChecked}
            />
            <Button text="Удалить выбранные" />
          </div>
          <div className="grow-[2]">Пагинация...</div>
        </div>
      </div>

      {/* -----M AddShop -----*/}
      {isOpen && (
        <ModalAdding
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          caption={"Добавить в проэкт"}
          items={data.projects}
          action={addProductsToProjects}
          invert
        />
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memoize } from "proxy-memoize";
import { fetchGeneralData } from "../store/reducers/mainPageSlice.js";

import PartMainOne from "../components/PartMainOne.jsx";
import PartMainTwo from "../components/PartMainTwo.jsx";
import PartMainThree from "../components/PartMainThree.jsx";
import ModalDelete from "../components/Modals/ModalDelete.jsx";
import ModalAddShop from "../components/Modals/ModalAddShop.jsx";
import ModalComments from "../components/Modals/ModalComments.jsx";

import useScroll from "../hooks/useScroll.jsx";
import useScrollHorizontal from "../hooks/useScrollHorizontal";

export const MainPage = () => {
  const { isScroll, boxScroll, buttonScroll } = useScroll(true);
  const {
    isScroll: isScrollHor,
    boxScroll: boxScrollHor,
    buttonScroll: buttonScrollHor,
  } = useScrollHorizontal();
  const { loading, errors, data } = useSelector(
    memoize((state) => ({
      ...state.mainPageReducer,
      data: { ...state.mainPageReducer.data, ...state.newProductReducer.data },
    })),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof data.products === "undefined") dispatch(fetchGeneralData());
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="overflow-hidden">
          <div
            ref={boxScroll}
            className={`max-h-[300px] overflow-y-auto overflow-x-hidden ${
              isScroll && "-mr-[17px]"
            }`}
          >
            <div className="flex">
              {/* -------Table N. 1--------- */}
              <PartMainOne
                products={data.products}
                categories={data.categories}
                manufactures={data.manufactures}
              />
              {/* -------Table N. 2--------- */}
              <PartMainTwo
                shops={data.shops}
                shopsTableRows={data.shopsTableRows}
                boxScrollHor={boxScrollHor}
              />
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
      <ModalDelete />
      {/* <ModalAddShop stores={[...products.stores]} /> */}

      {/* {
            id: 0,
            date: 1698084416000,
            price: 134,
            comment:
              "Lorem Ipsum is simply dummy",
          }, */}
      <ModalComments productComments={null} />
    </div>
  );
};

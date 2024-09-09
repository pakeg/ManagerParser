import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuCross } from "react-icons/lu";

import useScroll from "../hooks/useScroll";
import { isValidUrl } from "../utils/utilsFun";

import {
  fetchGeneralData,
  fetchAddNewShop,
  fetchDeleteShop,
  fetchParsedProductsListByShopId,
  fetchChangingShopFields,
} from "../store/reducers/mainPageSlice.js";

import ModalNewShop from "../components/Modals/ModalNewShop.jsx";
import ModalDelete from "../components/Modals/ModalDelete.jsx";
import ShopInformation from "../components/ShopInformation.jsx";

export const SettingPage = () => {
  const {
    loading,
    data: { shops = [] },
    parsed_products_list,
  } = useSelector((state) => state.mainPageReducer);
  const dispatch = useDispatch();
  const [isOpenNewShop, setIsOpenNewShop] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [shopToDelete, setShopToDelete] = useState(null);
  const [shopSettings, setShopSettings] = useState(null);
  const [done, setDone] = useState(null);
  const { boxScroll, buttonScroll, isScroll } = useScroll(false);

  useEffect(() => {
    if (shops.length === 0) dispatch(fetchGeneralData());
  }, []);

  const addShopDeleteHandler = (item) => {
    setShopToDelete(item);
    setIsOpenDelete(!isOpenDelete);
  };

  const deleteShops = () => {
    dispatch(fetchDeleteShop({ id: shopToDelete.id }));
    setIsOpenDelete(!isOpenDelete);
    setShopToDelete(null);
  };

  const addShop = (title) => {
    if (title.length > 0) {
      if (isValidUrl(title)) {
        dispatch(fetchAddNewShop({ url: title }));
        setDone({
          title,
        });
      } else {
        alert("Некорректная ссылка");
      }
    } else setIsOpenNewShop(!isOpenNewShop);
  };

  const handlerShopSettings = (item) => {
    if (!parsed_products_list[item.id]) {
      dispatch(fetchParsedProductsListByShopId(item.id));
    }
    setShopSettings(item);
  };

  return (
    <div>
      <div className="mb-8 font-semibold">
        <h1>Настройки магазина</h1>
      </div>
      <div className="flex gap-x-2">
        <div>
          <div className="flex items-center">
            <p className="underline mr-5 font-semibold">Добавить магазин</p>
            <div
              className="hover:bg-[#a1a1a1] bg-black rounded-sm cursor-pointer border border-white p-0.5"
              onClick={() => setIsOpenNewShop(!isOpenNewShop)}
            >
              <LuCross size={10} strokeWidth="1" fill="white" title="cancel" />
            </div>
          </div>
          <div className="flex">
            <div className="grow overflow-hidden border-2 border-[#5e5e5e]">
              <div
                className={`h-[550px] text-[#a0a0a0] overflow-auto ${
                  isScroll && "-mr-[19px]"
                }`}
                ref={boxScroll}
              >
                {shops &&
                  shops.map((item) => (
                    <div
                      key={item.id}
                      className="hover:bg-[#959595] hover:text-white mt-1.5 pl-6 pr-3 flex items-center justify-between"
                    >
                      <p
                        className="cursor-pointer"
                        onClick={() => handlerShopSettings(item)}
                      >
                        {item.title}
                      </p>
                      <div
                        className="hover:bg-red-500 bg-[#a1a1a1] rounded-sm cursor-pointer border border-white p-0.5"
                        onClick={addShopDeleteHandler.bind(null, item)}
                      >
                        <LuCross
                          size={10}
                          strokeWidth="1"
                          fill="white"
                          style={{
                            transform: "rotateZ(45deg)",
                          }}
                          title="delete shop"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {isScroll && (
              <div className="bg-[#5e5e5e] px-0.5">
                <div
                  className="bg-[#e1e1e1] rounded-3xl cursor-grabbing w-2.5"
                  ref={buttonScroll}
                ></div>
              </div>
            )}
          </div>
        </div>
        {shopSettings && (
          <div>
            <ShopInformation
              shop={shopSettings}
              setShopSettings={setShopSettings}
              dispatch={dispatch}
              changeShopFields={fetchChangingShopFields}
            />
          </div>
        )}
      </div>

      {isOpenNewShop && (
        <ModalNewShop
          isOpen={isOpenNewShop}
          setIsOpen={setIsOpenNewShop}
          done={done}
          setDone={setDone}
          addShop={addShop}
        />
      )}
      {isOpenDelete && (
        <ModalDelete
          item={shopToDelete?.title}
          isOpen={isOpenDelete}
          setIsOpen={setIsOpenDelete}
          actionAccept={deleteShops}
        />
      )}
    </div>
  );
};

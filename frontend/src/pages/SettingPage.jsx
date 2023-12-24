import { useEffect, useState } from "react";
import { LuCross } from "react-icons/lu";

import useScroll from "../hooks/useScroll";
import ModalNewShop from "../components/Modals/ModalNewShop.jsx";

export const SettingPage = () => {
  const [shops, setShops] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [done, setDone] = useState(null);
  const { boxScroll, buttonScroll, isScroll } = useScroll(false);

  const deleteShops = (id) => {
    // if delete from server
    if (true) {
      setShops((state) => state.filter((shop) => shop.id != id));
      console.log("shop deleted");
    }
  };

  const addShop = (title) => {
    console.log(title, "create new Shop");
    if (title.length > 1) {
      const req = { id: Math.random(), title };
      setShops((state) => [...state, req]);
      setDone({
        is: true,
        title,
      });
    }
  };

  useEffect(() => {
    const data = [
      {
        id: 0,
        title: "allo.ua",
      },
      {
        id: 1,
        title: "rozetka.ua",
      },
      {
        id: 2,
        title: "eldorado.ua",
      },
      {
        id: 3,
        title: "foxtrot.ua",
      },
      {
        id: 4,
        title: "storgrom.ua",
      },
    ];

    setShops(data);
  }, []);

  return (
    <div>
      <div className="mb-8 font-semibold">
        <h1>Настройки магазина</h1>
      </div>
      <div className="flex gap-x-6">
        <div className="grow">
          <div className="pl-6 mb-2">
            <div className="flex items-center">
              <p className="underline mr-5 font-semibold">Добавить магазин</p>
              <div
                className="hover:bg-[#a1a1a1] bg-black rounded-sm cursor-pointer border border-white p-0.5"
                onClick={() => setIsOpen(!isOpen)}
              >
                <LuCross
                  size={10}
                  strokeWidth="1"
                  fill="white"
                  title="cancel"
                />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grow overflow-hidden border-2 border-[#5e5e5e] bg-[#dfdfdf]">
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
                      <p>{item.title}</p>
                      <div
                        className="hover:bg-red-500 bg-[#a1a1a1] rounded-sm cursor-pointer border border-white p-0.5"
                        onClick={deleteShops.bind(null, item.id)}
                      >
                        <LuCross
                          size={10}
                          strokeWidth="1"
                          fill="white"
                          style={{
                            transform: "rotateZ(45deg)",
                          }}
                          title="deleteShops"
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
        <div className="grow-[4]">
          <p className="font-semibold mb-2">Редактирование</p>
          <div className="border-2 border-[#5e5e5e] bg-[#dfdfdf] min-h-[550px]"></div>
        </div>
      </div>
      <ModalNewShop
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        done={done}
        setDone={setDone}
        addShop={addShop}
      />
    </div>
  );
};

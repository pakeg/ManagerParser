import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsCheck } from "react-icons/bs";
import { LuCross } from "react-icons/lu";
import { TiEdit } from "react-icons/ti";
import { formatDate } from "../utils/utilsFun";

const ShopInformation = ({ shop }) => {
  const parsed_products = useSelector(
    (state) => state.mainPageReducer.parsed_products_list[shop.id]
  );
  const [editable, setEditable] = useState({
    selector: { focus: false, value: "" },
    imgSrc: { focus: false, value: "" },
  });

  useEffect(() => {
    setEditable({
      selector: { focus: false, value: "" },
      imgSrc: { focus: false, value: "" },
    });
  }, [shop.id]);

  const handlerAddShopSelector = () => {
    if (editable.selector.value.length > 0) {
      setEditable((prev) => ({
        ...prev,
        selector: { focus: false, value: "" },
      }));
    } else alert("Некорректный селектор");
  };

  const handlerAddImgSrc = () => {
    if (editable.imgSrc.value) {
      setEditable((prev) => ({ ...prev, imgSrc: { focus: false, value: "" } }));
    } else alert("Выберите изображение");
  };

  return (
    <>
      <p className="font-semibold">Редактирование</p>
      <div className="border-2 border-[#5e5e5e]">
        <div>
          <table className="w-full border-separate text-black font-semibold text-sm border-spacing-1">
            <thead>
              <tr className="bg-[#c1c1c1]">
                <th>№</th>
                <th>Название</th>
                <th>Ссылка</th>
                <th>Иконка</th>
                <th>Селектор</th>
                <th>Дата добавления</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#dfdfdf]">
                <td>{shop.id}</td>
                <td>{shop.title}</td>
                <td title={shop.link}>
                  <a href={shop.link} target="_blank">
                    {shop.link}
                  </a>
                </td>
                <td className="w-60 relative group">
                  {!editable.imgSrc.focus ? (
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                      <span>{shop.img_src}</span>
                      <div
                        className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setEditable((prev) => ({
                            ...prev,
                            imgSrc: { ...prev.imgSrc, focus: true },
                          }))
                        }
                      >
                        <TiEdit size={20} className="text-[#a1a1a1]" />
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                      <label for="imgSrc">
                        <input
                          id="imgSrc"
                          type="file"
                          hidden
                          className="focus:outline-none rounded-sm peer w-full"
                          placeholder="select img"
                          onChange={(e) =>
                            setEditable((prev) => ({
                              ...prev,
                              imgSrc: {
                                ...prev.imgSrc,
                                value: e.target.files[0],
                              },
                            }))
                          }
                        />
                        <span className="cursor-pointer">
                          {editable.imgSrc.value?.name ??
                            "Выберите изображение"}
                        </span>
                      </label>
                      <div
                        className={`${
                          editable.imgSrc.value
                            ? "bg-green-500"
                            : "bg-[#a1a1a1] hover:bg-red-600"
                        } rounded-sm absolute bottom-0.5 right-1 cursor-pointer`}
                      >
                        <BsCheck
                          size={15}
                          strokeWidth="1"
                          fill="white"
                          title={`${
                            editable.imgSrc.value ? "confirm change" : "cancel"
                          }`}
                          onClick={handlerAddImgSrc}
                        />
                      </div>
                    </div>
                  )}
                </td>
                <td className="w-60 relative group">
                  {!editable.selector.focus ? (
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                      <span>{shop.selector}</span>
                      <div
                        className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          setEditable((prev) => ({
                            ...prev,
                            selector: { ...prev.selector, focus: true },
                          }))
                        }
                      >
                        <TiEdit size={20} className="text-[#a1a1a1]" />
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                      <input
                        type="text"
                        className="focus:outline-none rounded-sm peer w-full"
                        placeholder="put selector"
                        value={editable.selector.value}
                        onChange={(e) =>
                          setEditable((prev) => ({
                            ...prev,
                            selector: {
                              ...prev.selector,
                              value: e.target.value,
                            },
                          }))
                        }
                      />
                      <div className="peer-placeholder-shown:bg-[#a1a1a1] peer-placeholder-shown:hover:bg-red-500 bg-green-500 rounded-sm absolute bottom-0.5 right-1 cursor-pointer">
                        <BsCheck
                          size={15}
                          strokeWidth="1"
                          fill="white"
                          title={`${
                            editable.selector.value
                              ? "confirm change"
                              : "cancel"
                          }`}
                          onClick={handlerAddShopSelector}
                        />
                      </div>
                    </div>
                  )}
                </td>
                <td className="text-center">{formatDate(shop.created_on)}</td>
                <td>
                  <label
                    className="cursor-pointer"
                    htmlFor={`${shop.title}_${shop.id}`}
                  >
                    <input
                      id={`${shop.title}_${shop.id}`}
                      type="checkbox"
                      onChange={() => {}}
                      checked={Boolean(+shop.active_status)}
                      className="opacity-0 select-none peer hidden"
                    />
                    {+shop.active_status ? (
                      <div className="rounded-sm bg-green-500">
                        <BsCheck
                          color="white"
                          className="m-auto"
                          size={18}
                          strokeWidth="1"
                          title="active"
                        />
                      </div>
                    ) : (
                      <div className="rounded-sm bg-red-500">
                        <LuCross
                          color="white"
                          className="m-auto rotate-z-45"
                          size={18}
                          strokeWidth="1"
                          title="inactive"
                        />
                      </div>
                    )}
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {typeof parsed_products != "undefined" &&
          parsed_products?.length != 0 && (
            <div>
              <table className="text-black font-semibold text-sm border-separate border-spacing-1 border border-slate-600">
                <thead>
                  <tr className="bg-[#c1c1c1]">
                    <th>Товар</th>
                    <th>Ссылка</th>
                    <th>Цена</th>
                    <th>Дата добавления/обновления</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed_products.map((parsed) => (
                    <tr
                      key={parsed.id}
                      className="bg-[#dfdfdf]"
                      title={parsed.title}
                    >
                      <td>
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-80">
                          {parsed.title}
                        </p>
                      </td>
                      <td title={parsed.link}>
                        <a
                          href={parsed.link}
                          target="_blank"
                          className="block overflow-hidden whitespace-nowrap text-ellipsis w-[600px]"
                        >
                          {parsed.link}
                        </a>
                      </td>
                      <td className="text-center" title={parsed.parsed_price}>
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-14 mx-auto">
                          {parsed.parsed_price}
                        </p>
                      </td>
                      <td className="text-center">
                        {formatDate(parsed.created_on)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </>
  );
};
export default ShopInformation;

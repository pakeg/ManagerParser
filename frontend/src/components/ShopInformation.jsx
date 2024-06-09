import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/utilsFun";

const ShopInformation = ({ shop }) => {
  const parsed_products = useSelector(
    (state) => state.mainPageReducer.parsed_products_list[shop.id],
  );

  return (
    <>
      <p className="font-semibold">Редактирование</p>
      <div className="border-2 border-[#5e5e5e] bg-[#dfdfdf]">
        <div>
          <table>
            <thead>
              <tr>
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
              <tr>
                <td>{shop.id}</td>
                <td>{shop.title}</td>
                <td>{shop.link}</td>
                <td>
                  <img src={shop.img_src} />
                </td>
                <td>{shop.selector}</td>
                <td>{formatDate(shop.created_on)}</td>
                <td>{shop.active_status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {typeof parsed_products != "undefined" &&
          parsed_products?.length != 0 && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th>Ссылка</th>
                    <th>Цена</th>
                    <th>Дата добавления/обновления</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed_products.map((parsed) => (
                    <tr key={parsed.id}>
                      <td>{parsed.title}</td>
                      <td>{parsed.link}</td>
                      <td>{parsed.parsed_price}</td>
                      <td>{formatDate(parsed.created_on)}</td>
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

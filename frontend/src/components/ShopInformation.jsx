import { formatDate } from "../utils/utilsFun";

const ShopInformation = ({ shop }) => {
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
                <td>{formatDate(shop.created_on)}</td>
                <td>{shop.active_status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {parsed_products && (
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
                <tr>
                  <td>{parsed_products.title}</td>
                  <td>{parsed_products.link}</td>
                  <td>{parsed_products.parsed_price}</td>
                  <td>{parsed_products.created_on}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
export default ShopInformation;

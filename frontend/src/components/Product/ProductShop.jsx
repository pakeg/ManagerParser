import ProductShopCellEmpty from './ProductShopCellEmpty.jsx';
import ProductShopCellFull from './ProductShopCellFull.jsx';

const ProductShop = ({ prices }) => {
  return (
    <tr className="bg-[#dfdfdf]">
      <td>
        <div className="flex flex-col cursor-pointer bg-white">
          <span className="hover:bg-[#dfdfdf]">{'>'}</span>
          <span className="hover:bg-[#dfdfdf]">{'<'}</span>
        </div>
      </td>
      {prices &&
        prices.map((item, i) =>
          item ? (
            <ProductShopCellFull
              key={i}
              price={item.price}
              products_price={item.products_price}
              date={item.date}
            />
          ) : (
            <ProductShopCellEmpty key={i} />
          )
        )}
    </tr>
  );
};

export default ProductShop;

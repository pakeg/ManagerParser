import ProductShopCellEmpty from "./ProductShopCellEmpty.jsx";
import ProductShopCellFull from "./ProductShopCellFull.jsx";

const ProductShop = ({ rows, rowIndex, positionDivComment }) => {
  return (
    <tr className="bg-[#dfdfdf]">
      <td>
        <div className="flex flex-col cursor-pointer bg-white">
          <span className="hover:bg-[#dfdfdf]">{">"}</span>
          <span className="hover:bg-[#dfdfdf]">{"<"}</span>
        </div>
      </td>
      {rows.length > 0 &&
        rows.map((row, i) =>
          row.price ? (
            <ProductShopCellFull
              key={row.shop + "_" + i}
              price={row.parsed_price}
              products_price={row.price}
              id={i}
              date={row.date}
              positionDivComment={positionDivComment}
            />
          ) : (
            <ProductShopCellEmpty
              key={i}
              rowIndex={rowIndex}
              colIndex={i}
              productId={row.product_id}
              shopId={row.shop.id}
            />
          ),
        )}
    </tr>
  );
};

export default ProductShop;

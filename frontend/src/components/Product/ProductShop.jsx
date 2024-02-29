import { useState } from "react";
import ProductShopCellEmpty from "./ProductShopCellEmpty.jsx";
import ProductShopCellFull from "./ProductShopCellFull.jsx";

const ProductShop = ({
  rows,
  colIndex,
  setSortTableTwo,
  sortTableTwo,
  dispatch,
  positionDivComment,
}) => {
  const changingSort = (typeIndex) => {
    dispatch(setSortTableTwo({ colIndex, typeIndex }));
  };

  return (
    <tr className="bg-[#dfdfdf]">
      <td>
        <div className="flex flex-col cursor-pointer bg-white">
          <span
            className={`hover:bg-[#dfdfdf] ${sortTableTwo?.colIndex == colIndex && sortTableTwo?.typeIndex == 0 ? "bg-[#dfdfdf]" : ""}`}
            onClick={() => changingSort(0)}
          >
            {">"}
          </span>
          <span
            className={`hover:bg-[#dfdfdf] ${sortTableTwo?.colIndex == colIndex && sortTableTwo?.typeIndex == 1 ? "bg-[#dfdfdf]" : ""}`}
            onClick={() => changingSort(1)}
          >
            {"<"}
          </span>
        </div>
      </td>
      {rows.length > 0 &&
        rows.map((row, i) =>
          row.product_price ? (
            <ProductShopCellFull
              key={row.shop + "_" + i}
              id={row.id}
              parsed_price={row.parsed_price}
              product_price={row.product_price}
              date={row.date}
              link={row.link}
              positionDivComment={positionDivComment}
            />
          ) : (
            <ProductShopCellEmpty
              key={i}
              colIndex={colIndex}
              productId={row.product_id}
              shopData={row.shop}
            />
          ),
        )}
    </tr>
  );
};

export default ProductShop;

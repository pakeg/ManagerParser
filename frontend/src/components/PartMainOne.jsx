import { MdOutlineDone, MdKeyboardArrowDown } from "react-icons/md";
import { BiSortDown, BiSearchAlt2 } from "react-icons/bi";
import { BsSortNumericDown } from "react-icons/bs";

import Product from "./Product/Product.jsx";
import MenuItem from "./Menu/MenuItem.jsx";
import { useCallback, useRef } from "react";

const PartMainOne = ({ products, categories, manufactures }) => {
  const tBody = useRef(null);
  const mainCheckbox = useRef(null);

  const checkboxAll = useCallback(() => {
    tBody.current
      .querySelectorAll('input[type="checkbox"]')
      .forEach((element) => {
        element.checked =
          mainCheckbox.current.checked && !element.checked
            ? !element.checked
            : !mainCheckbox.current.checked
              ? !element.checked
              : element.checked;
      });
  }, [tBody, mainCheckbox]);

  const checkMainInput = useCallback(() => {
    mainCheckbox.current.checked = false;
  }, [mainCheckbox]);

  return (
    <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
      <thead>
        <tr className="bg-[#c1c1c1]">
          <td>
            <label
              htmlFor="mainCheckbox"
              className="block relative w-8 h-8 cursor-pointer"
            >
              <input
                id="mainCheckbox"
                className="opacity-0 select-none peer"
                type="checkbox"
                value="checkall"
                name="product"
                ref={mainCheckbox}
                onClick={() => checkboxAll()}
              />
              <MdOutlineDone
                size="30"
                strokeLinecap="round"
                className="absolute top-0 left-0.5 hidden peer-checked:block text-black"
              />
            </label>
          </td>

          <MenuItem
            title={"Категория"}
            sort={BiSortDown}
            properties={"category"}
            actionType={"mainPage/setSort"}
            filter={MdKeyboardArrowDown}
            data={categories}
          />
          <MenuItem
            title={"Произв."}
            sort={BiSortDown}
            properties={"manufacture"}
            actionType={"mainPage/setSort"}
            filter={MdKeyboardArrowDown}
            data={manufactures}
          />
          <MenuItem
            title={"Арт."}
            sort={BiSortDown}
            properties={"part_number"}
            actionType={"mainPage/setSort"}
            search={BiSearchAlt2}
          />
          <MenuItem
            title={"Товар"}
            sort={BiSortDown}
            properties={"title"}
            actionType={"mainPage/setSort"}
            search={BiSearchAlt2}
          />
          <MenuItem
            title={"Закупка"}
            sort={BsSortNumericDown}
            properties={"purchase"}
            actionType={"mainPage/setSort"}
          />
          <MenuItem
            title={"Цена"}
            sort={BsSortNumericDown}
            properties={"price"}
            actionType={"mainPage/setSort"}
          />
        </tr>
      </thead>
      <tbody ref={tBody}>
        {products &&
          products.map((item) => (
            <Product
              key={item.id}
              product={item}
              checkMainInput={checkMainInput}
            />
          ))}
      </tbody>
    </table>
  );
};

export default PartMainOne;

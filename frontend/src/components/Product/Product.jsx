import { useCallback, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";

import { percentageDifference } from "../../utils/utilsFun";

const Product = ({ product, checkMainInput }) => {
  const [editable, setEditable] = useState(false);
  const [price, setPrice] = useState("");

  const changePrice = useCallback(
    (price) => {
      if (price) {
        console.log(price, "change price");
      }

      setPrice("");
      setEditable(false);
      return;
    },
    [price],
  );

  return (
    <tr className="bg-[#dfdfdf]">
      <td>
        <label
          htmlFor={`checkbox${product.id}`}
          className="block relative w-8 h-8 cursor-pointer"
        >
          <input
            id={`checkbox${product.id}`}
            className="opacity-0 select-none peer"
            type="checkbox"
            value={product.id}
            name="checkedProduct[]"
            onClick={() => checkMainInput()}
          />
          <MdOutlineDone
            size="30"
            strokeLinecap="round"
            className="absolute top-0 left-0.5 hidden peer-checked:block text-black"
          />
        </label>
      </td>
      <td title={product.category}>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-32">
          {product.category}
        </p>
      </td>
      <td title={product.manufacture}>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-32">
          {product.manufacture}
        </p>
      </td>
      <td title={product.part_number}>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-32">
          {product.part_number}
        </p>
      </td>
      <td title={product.title}>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-32">
          {product.title}
        </p>
      </td>
      <td title={product.purchase}>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis w-20 mx-auto">
          {product.purchase}
        </p>
      </td>
      <td className="relative px-1.5 group" title={product.price}>
        {!editable ? (
          <div className="overflow-hidden whitespace-nowrap text-ellipsis w-20">
            <span>{product.price}</span>
            <span className="absolute top-0 text-[#4bc1b5] leading-none">
              {percentageDifference(product.purchase, product.price) + "%"}
            </span>
            <div
              className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center cursor-pointer"
              onClick={() => setEditable(!editable)}
            >
              <TiEdit size={30} className="text-[#a1a1a1]" />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden whitespace-nowrap text-ellipsis w-20">
            <input
              type="number"
              name="change-price"
              className="bg-white rounded-sm peer outline-slate-800 w-full"
              min="0"
              placeholder={product.price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="peer-placeholder-shown:bg-[#a1a1a1] peer-placeholder-shown:hover:bg-red-500 bg-green-500 rounded-sm absolute bottom-0.5 right-1 cursor-pointer">
              <BsCheck
                size={15}
                strokeWidth="2"
                fill="white"
                title={`${
                  price ? "confirm change" : "cancel or put the price"
                }`}
                onClick={() => changePrice(price)}
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Product;

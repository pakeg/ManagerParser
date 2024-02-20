import { useState } from "react";
import { useDispatch } from "react-redux";

import { TiEdit } from "react-icons/ti";

import { fetchAddParseLink } from "../../store/reducers/mainPageSlice.js";
import { isValidUrl } from "../../utils/utilsFun.js";

const ProductShopCellEmpty = ({ rowIndex, colIndex, productId, shopId }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [shopUrl, setShopUrl] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && shopUrl.length > 0 && isValidUrl(shopUrl)) {
      dispatch(
        fetchAddParseLink({ shopUrl, rowIndex, colIndex, productId, shopId }),
      );
      setShopUrl("");
      setEditable(!editable);
    }

    return;
  };

  return (
    <td className="relative py-2 px-12 group">
      {!editable ? (
        <div
          className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center cursor-pointer"
          onClick={() => setEditable(!editable)}
        >
          <TiEdit size={30} className="text-[#a1a1a1]" />
        </div>
      ) : (
        <div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-96 h-5">
            <input
              className="w-full h-full bg-white"
              type="text"
              name="shopUrl"
              value={shopUrl}
              placeholder="url"
              onChange={(e) => setShopUrl(e.target.value.trim())}
              onKeyUp={handleKeyPress}
            />
          </div>
          <div
            className="fixed w-full h-full top-0 left-0 z-10 bg-gray-500 opacity-70 cursor-pointer"
            onClick={() => setEditable(!editable)}
          ></div>
        </div>
      )}
    </td>
  );
};

export default ProductShopCellEmpty;

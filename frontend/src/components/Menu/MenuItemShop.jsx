import { useCallback } from "react";
import { BiRefresh } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";

const MenuItemShop = ({ shopInfo, dispatch, fetchChangeShopStatus }) => {
  const changeShopStatus = useCallback((id, active_status) => {
    dispatch(fetchChangeShopStatus({ id, active_status }));
  }, []);

  return (
    <td className="py-1.5 px-2.5 relative group">
      <span className="overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
        {shopInfo.title}
      </span>
      <div className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center">
        <BiRefresh
          size={30}
          className="cursor-pointer"
          color="green"
          title="refresh all product of shop"
        />
        <RxCrossCircled
          size={25}
          color="red"
          title="delete shop from table"
          className="cursor-pointer"
          onClick={() => changeShopStatus(shopInfo.id, shopInfo.active_status)}
        />
      </div>
    </td>
  );
};

export default MenuItemShop;

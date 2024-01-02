import { BiRefresh } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";

const MenuItemShop = ({ title }) => {
  return (
    <td className="py-1.5 px-2.5 relative group">
      <span className="overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
        {title}
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
        />
      </div>
    </td>
  );
};

export default MenuItemShop;

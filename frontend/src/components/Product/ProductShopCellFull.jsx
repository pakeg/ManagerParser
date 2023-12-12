import { useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { TbMessageCircle2Filled } from 'react-icons/tb';

import { formatDate, percentageDifference } from '../../utils/utilsFun';

const ProductShopCellFull = ({
  price,
  products_price,
  id,
  date,
  positionDivComment,
}) => {
  const [styleCell, setStyleCell] = useState('');

  useEffect(() => {
    let style = '';
    if (price > products_price) style += 'ist bg-green-500';
    if (price < products_price) style += 'ist bg-red-500';
    setStyleCell(style);
  }, []);

  return (
    <td
      className={`relative py-2 px-12 group text-white ${styleCell}
      }`}
    >
      <div>
        <span className="group-[.ist]:text-black">{price}</span>
        <span className="absolute top-0 leading-none ">
          {percentageDifference(price, products_price) + '%'}
        </span>
        <span className="group-[:not(.ist)]:text-[#acacac] absolute bottom-0 left-0 leading-none">
          {formatDate(date)}
        </span>
        <div className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center cursor-pointer">
          <BiRefresh size={30} color="green" title="refresh price" />
          <FaArrowRightFromBracket
            size={22}
            color="#51b2df"
            title="go to site"
          />
          <TbMessageCircle2Filled
            size={30}
            color="#f7c34a"
            className="rotate-y-180"
            title="add comment"
            onClick={(e) => positionDivComment(e, id)}
          />
        </div>
      </div>
    </td>
  );
};

export default ProductShopCellFull;

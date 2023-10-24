import { useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { MdOutlineHistory } from 'react-icons/md';

import { formatDate, percentageDifference } from '../../utils/utilsFun';

const ProductShopCellFull = ({ price, products_price, date }) => {
  const [styleCell, setStyleCell] = useState('');
  const [comment, setComment] = useState('');
  const [hideComment, setHideComment] = useState(false);

  useEffect(() => {
    let style = '';
    if (price > products_price) style += 'ist bg-green-500';
    if (price < products_price) style += 'ist bg-red-500';
    setStyleCell(style);
  }, []);

  return (
    <td
      className={`relative py-2 px-12 group text-white ${styleCell} ${
        hideComment ? 'z-[1]' : ''
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
        <div
          className="group-hover:opacity-90 absolute w-full h-full top-0 left-0 bg-[#f9f8f9] opacity-0 flex items-center justify-center cursor-pointer"
          onMouseLeave={() => setHideComment(false)}
        >
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
            onClick={() => setHideComment(!hideComment)}
          />
          {hideComment && (
            <div className="absolute top-9 right-0 z-20 rounded-lg border-2 border-solid border-white bg-[#d6d0cf] after:content-[''] after:absolute after:-top-[13px] after:right-[20px] after:w-[25px] after:h-[25px] after:bg-[#d7cdcc] after:border-2 after:border-b-transparent after:border-r-transparent after:-z-[1] after:rotate-z-45">
              <div className="p-2.5 rounded-lg relative">
                <div>
                  <textarea
                    cols="35"
                    rows="10"
                    value={comment}
                    placeholder="write comment"
                    className="resize-none bg-white rounded-lg text-black p-2.5 focus:outline-none"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className="text-base bg-gradient-to-b from-yellow-300 to-yellow-500 py-1.5 px-5 rounded-md w-full">
                    Добавить комментарий
                  </button>
                </div>
                <div className="flex items-center justify-center text-black">
                  <span className="hover:underline ">Посмотреть историю</span>
                  <MdOutlineHistory size="30" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </td>
  );
};

export default ProductShopCellFull;

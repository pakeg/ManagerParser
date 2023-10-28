import { useCallback, useRef, useState } from 'react';
import { MdOutlineHistory } from 'react-icons/md';

import ProductShop from './ProductShop.jsx';
import MenuItemShop from './MenuItemShop.jsx';

const PartMainTwo = ({ uniqueStores, storeTableRows, boxScrollHor }) => {
  const commentPopUp = useRef(null);

  const [comment, setComment] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const positionDivComment = useCallback((e) => {
    const coor = e.target.getBoundingClientRect();
    // 15 - width SVg element, 20 - position right ::after, 12.5 - width ::after
    commentPopUp.current.style.left =
      coor.x - commentPopUp.current.offsetWidth + 15 + 20 + 12.5 + 'px';
    // 17.5 - height/2 ::after
    commentPopUp.current.style.top = coor.y + coor.height + 17.5 + 'px';
    setIsPopUpOpen(!isPopUpOpen);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="max-w-[416.1px] overflow-auto -mb-[17px]"
          ref={boxScrollHor}
        >
          <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
            <thead>
              <tr className="bg-[#c1c1c1]">
                <td>
                  <div className="w-8 h-8 cursor-pointer flex items-center justify-center font-normal text-4xl">
                    <span>+</span>
                  </div>
                </td>
                {uniqueStores &&
                  uniqueStores.map((store) => (
                    <MenuItemShop key={store} title={store} />
                  ))}
              </tr>
            </thead>
            <tbody>
              {storeTableRows &&
                storeTableRows.map((items, i) => (
                  <ProductShop
                    key={i}
                    prices={items}
                    positionDivComment={positionDivComment}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* -----Comment Pop-up History */}

      <div
        ref={commentPopUp}
        className={`${
          isPopUpOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } w-min fixed z-20 rounded-lg border-2 border-solid border-white bg-[#d6d0cf] after:content-[''] after:absolute after:-top-[13px] after:right-[20px] after:w-[25px] after:h-[25px] after:bg-[#d7cdcc] after:border-2 after:border-b-transparent after:border-r-transparent after:-z-[1] after:rotate-z-45`}
      >
        <div className="p-2.5 rounded-lg">
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
            <span className="hover:underline cursor-pointer">
              Посмотреть историю
            </span>
            <MdOutlineHistory size="30" />
          </div>
        </div>
        <div
          className="fixed w-full h-full top-0 left-0 z-[-1]"
          onClick={() => setIsPopUpOpen(!isPopUpOpen)}
        ></div>
      </div>
    </div>
  );
};

export default PartMainTwo;

import ProductShop from './ProductShop.jsx';
import MenuItemShop from './MenuItemShop.jsx';

import useScrollHorizontal from '../hooks/useScrollHorizontal';

const PartMainTwo = ({ uniqueStores, storeTableRows }) => {
  const { isScroll, boxScroll, buttonScroll } = useScrollHorizontal();

  return (
    <div className="relative">
      <div className="overflow-hidden max-w-[542.8px]">
        <div className="overflow-auto -mb-[17px]" ref={boxScroll}>
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
                  <ProductShop key={i} prices={items} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-[#c1c1c1] rounded-3xl shadow-[inset_0px_0px_1px_0px_black] absolute -bottom-[17px] w-full">
        <div
          className={` bg-[#e1e1e1] rounded-3xl cursor-grabbing ${
            !isScroll ? 'opacity-0 invisible' : 'h-3.5 opacity-100 visible'
          }`}
          ref={buttonScroll}
        ></div>
      </div>
    </div>
  );
};

export default PartMainTwo;

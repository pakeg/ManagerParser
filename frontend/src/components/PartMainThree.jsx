import { BsSortNumericDown } from 'react-icons/bs';

import ProductShopAmountFounded from './Product/ProductShopAmountFounded';
import MenuItem from './Menu/MenuItem.jsx';

const PartMainThree = ({ products }) => {
  return (
    <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
      <thead>
        <tr className="bg-[#c1c1c1]">
          <MenuItem title={'Количество'} sort={BsSortNumericDown} left />
          <MenuItem title={'Min'} sort={BsSortNumericDown} left />
          <MenuItem title={'Max'} sort={BsSortNumericDown} left />
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          products.map((product) => (
            <ProductShopAmountFounded key={product.id} product={product} />
          ))}
      </tbody>
    </table>
  );
};

export default PartMainThree;

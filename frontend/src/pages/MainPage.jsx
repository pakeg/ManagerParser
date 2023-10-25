import { MdOutlineDone, MdKeyboardArrowDown } from 'react-icons/md';
import { BiSortDown, BiSearchAlt2 } from 'react-icons/bi';
import { BsSortNumericDown } from 'react-icons/bs';

import Product from './components/Product.jsx';
import PartMainTwo from './components/PartMainTwo.jsx';
import ProductShopAmountFounded from './components/ProductShopAmountFounded.jsx';
import MenuItem from './components/MenuItem.jsx';
import ModalShop from './components/Modals/ModalShop.jsx';
import ModalAddShop from './components/Modals/ModalAddShop.jsx';
import ModalComments from './components/Modals/ModalComments.jsx';

import { useCallback, useEffect, useRef, useState } from 'react';

const MainPage = () => {
  const [products, setProducts] = useState({
    products: [],
    uniqueStores: [],
    storeTableRows: [],
  });
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

  useEffect(() => {
    const data = {
      products: [
        {
          id: 0,
          category: 'Высшая',
          manufactory: 'ГуньЦи',
          code: 1234315,
          title: 'Шарики',
          purchase: 750,
          price: 1200,
          amount: 124,
          min: 3,
          max: 43,
        },
        {
          id: 1,
          category: 'Высшая1',
          manufactory: 'ГуньЦи1',
          code: 12334315,
          title: 'Шар',
          purchase: 550,
          price: 6200,
          amount: 124,
          min: 12,
          max: 40,
        },
        {
          id: 2,
          category: 'Высшая3',
          manufactory: 'ГуньЦи2',
          code: 12434315,
          title: 'Шарии',
          purchase: 750,
          price: 1200,
          amount: 124,
          min: 12,
          max: 40,
        },
        {
          id: 3,
          category: 'Высшая3',
          manufactory: 'ГуньЦи2',
          code: 1243434315,
          title: 'Шариик красный',
          purchase: 750,
          price: 800,
          amount: 124,
          min: 12,
          max: 40,
        },
      ],
      storePrices: [
        {
          productId: 0,
          store: 'Store C',
          price: 1200,
          date: 1637557941000,
        },
        {
          productId: 1,
          store: 'Store A',
          price: 1200,
          date: 1697736328000,
        },
        {
          productId: 1,
          store: 'Store B',
          price: 1400,
          date: 1697557941,
        },
        {
          productId: 1,
          store: 'Store C',
          price: 1000,
          date: 1697557941,
        },
        {
          productId: 2,
          store: 'Store D',
          price: 1000,
          date: 1697557941,
        },
        {
          productId: 2,
          store: 'Store A',
          price: 1000,
          date: 1697557941,
        },
        {
          productId: 0,
          store: 'Store D',
          price: 1000,
          date: 1697557941,
        },
        {
          productId: 3,
          store: 'Store A',
          price: 1000,
          date: 1697557941,
        },
        {
          productId: 3,
          store: 'Store B',
          price: 1000,
          date: 1697557941,
        },
        {
          productId: 3,
          store: 'Store Z',
          price: 2544,
          date: 1697557941,
        },
      ],
    };

    const uniqueStores = Array.from(
      new Set(data.storePrices.map((item) => item.store))
    );

    const storeTableRows = data.products.map((product) => {
      const productPrices = data.storePrices.filter(
        (item) => item.productId === product.id
      );
      const row = [];
      uniqueStores.forEach((store) => {
        const finded = productPrices.find((item) => item.store === store);
        row.push(finded ? { ...finded, products_price: product.price } : null);
      });
      return row;
    });
    setProducts({ products: data.products, uniqueStores, storeTableRows });
  }, []);

  return (
    <div className="pt-6">
      <div className="flex">
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
                title={'Категория'}
                sort={BiSortDown}
                category={MdKeyboardArrowDown}
              />
              <MenuItem
                title={'Произв.'}
                sort={BiSortDown}
                category={MdKeyboardArrowDown}
              />
              <MenuItem
                title={'Арт.'}
                sort={BiSortDown}
                search={BiSearchAlt2}
              />
              <MenuItem
                title={'Товар'}
                sort={BiSortDown}
                search={BiSearchAlt2}
              />
              <MenuItem title={'Закупка'} sort={BsSortNumericDown} />
              <MenuItem title={'Цена'} sort={BsSortNumericDown} />
            </tr>
          </thead>
          <tbody ref={tBody}>
            {products &&
              products.products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  checkMainInput={checkMainInput}
                />
              ))}
          </tbody>
        </table>

        {/* -------Table N. 2--------- */}
        <PartMainTwo
          uniqueStores={products.uniqueStores}
          storeTableRows={products.storeTableRows}
        />
        {/* --------------------- */}

        <table className="text-center border-separate text-black font-semibold text-xs border-spacing-1">
          <thead>
            <tr className="bg-[#c1c1c1]">
              <MenuItem title={'Количество'} sort={BsSortNumericDown} left />
              <MenuItem title={'Min'} sort={BsSortNumericDown} left />
              <MenuItem title={'Max'} sort={BsSortNumericDown} left />
            </tr>
          </thead>
          <tbody>
            {products &&
              products.products.map((product) => (
                <ProductShopAmountFounded key={product.id} product={product} />
              ))}
          </tbody>
        </table>
      </div>
      <ModalShop />
      <ModalAddShop
        uniqueStores={[
          ...products.uniqueStores,
          'asdasdf',
          'asdfasdf',
          'asdfasdgasdg',
          'asdfasdfd',
          'asdfa1e',
        ]}
      />

      {/* {
      id: 0,
      date: 1698084416000,
      price: 134,
      comment:
        "Lorem Ipsum is simply dummy",
    }, */}
      <ModalComments productComments={null} />
    </div>
  );
};

export default MainPage;

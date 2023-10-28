import PartMainOne from './components/PartMainOne.jsx';
import PartMainTwo from './components/PartMainTwo.jsx';
import PartMainThree from './components/PartMainThree.jsx';
import ModalShop from './components/Modals/ModalShop.jsx';
import ModalAddShop from './components/Modals/ModalAddShop.jsx';
import ModalComments from './components/Modals/ModalComments.jsx';

import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState({
    products: [],
    uniqueStores: [],
    storeTableRows: [],
  });

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
    <div>
      <div className="flex">
        {/* -------Table N. 1--------- */}
        <PartMainOne products={products.products} />
        {/* -------Table N. 2--------- */}
        <PartMainTwo
          uniqueStores={products.uniqueStores}
          storeTableRows={products.storeTableRows}
        />
        {/* -------Table N. 2--------- */}
        <PartMainThree products={products.products} />
        {/*----------------------------*/}
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

export default Home;

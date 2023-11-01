import { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';

import SelectBlock from '../components/NewProductPage/SelectBlock.jsx';
import InputBlock from '../components/NewProductPage/InputBlock.jsx';

const NewProductPage = () => {
  const [data, setData] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: null,
    manufacture: null,
    project: null,
    purchase_price: 0,
    price: 0,
    shopsUrl: '',
  });

  const addNewProduct = () => {
    const disabled = Object.entries(newProduct).every((element) => {
      if (element[0] == 'shopsUrl') return true;
      return element[1];
    });
    console.log(disabled, 'disabled');
    console.log(newProduct, 'addNewProduct');
  };

  useEffect(() => {
    const data = [
      {
        categories: Array(6).fill(0),
        manufacturers: Array(10).fill(0),
        projects: Array(13).fill(0),
      },
    ];

    setData(...data);
  }, []);

  return (
    <div>
      <div className="text-black w-80 text-lg space-y-4">
        <div>
          <h1 className="underline pl-4 font-bold">Добавление товара</h1>
        </div>
        <InputBlock
          placeholder="Наименование товара"
          type="text"
          value={newProduct.title}
          setNewProduct={setNewProduct}
          field="title"
        />

        <SelectBlock
          items={data?.categories}
          placeholder="Категория"
          setNewProduct={setNewProduct}
          field="category"
        />
        <SelectBlock
          items={data?.manufacturers}
          placeholder="Производитель"
          setNewProduct={setNewProduct}
          field="manufacture"
        />
        <SelectBlock
          items={data?.projects}
          placeholder="Проэкт"
          setNewProduct={setNewProduct}
          field="project"
        />

        <InputBlock
          placeholder="Закупочная цена"
          type="number"
          value={newProduct.purchase_price}
          setNewProduct={setNewProduct}
          field="purchase_price"
        />
        <InputBlock
          placeholder="Базовая цена"
          type="number"
          value={newProduct.price}
          setNewProduct={setNewProduct}
          field="price"
        />

        <div>
          <textarea
            name="shops"
            placeholder="Ссылки на товары в магазинах для мониторинга, через запятую"
            className="bg-[#dfdfdf] placeholder:text-[#b4b4b4] placeholder:text-sm pl-4 w-full"
            value={newProduct.shopsUrl}
            onChange={(e) =>
              setNewProduct((state) => ({ ...state, shopsUrl: e.target.value }))
            }
          />
        </div>

        <div className="flex justify-end text-white">
          // redirect
          <button
            className="border border-black text-xs px-3 py-1 rounded mr-4"
            onClick={() => {}}
          >
            Отмена
          </button>
          <div
            className="flex items-center bg-[#4bc1b5] font-bold text-sm px-3 py-1 rounded mr-4"
            onClick={addNewProduct}
          >
            <button>Готово</button>
            <MdOutlineDone size="20" strokeLinecap="round" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductPage;

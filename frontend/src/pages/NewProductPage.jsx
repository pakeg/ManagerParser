import { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';

import SelectBlock from './components/NewProductPage/SelectBlock.jsx';
import InputBlock from './components/NewProductPage/InputBlock.jsx';
import ModalNewProduct from './components/Modals/ModalNewProduct.jsx';
import createNewProduct from './actions/createNewProduct.js';

const NewProductPage = () => {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [choosedElement, setChoosedElement] = useState(null);
  const [done, setDone] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    categories: null,
    manufactures: null,
    projects: null,
    part_number: '',
    purchase_price: 0,
    price: 0,
    shopsUrl: '',
  });

  const addNewProduct = async () => {
    const disabled = Object.entries(newProduct).every((element) => {
      if (element[0] == 'shopsUrl') return true;
      return element[1];
    });

    if (disabled) {
      console.log(newProduct, 'addNewProduct');
      const req = await createNewProduct(newProduct);
      if (req.ok) {
        // set flag after adding new product for ModalNewProduct
        setDone({
          is: req.ok,
          title: newProduct.title,
          projects: data.projects.find(
            (project) => project.id == newProduct.projects
          ),
        });
        //open modal
        setIsOpen(!isOpen);
        //clear data of new product
        setNewProduct({
          title: '',
          categories: null,
          manufactures: null,
          projects: null,
          part_number: '',
          purchase_price: 0,
          price: 0,
          shopsUrl: '',
        });
      } else {
        console.log('Ошибка ' + req.status);
      }
    }
  };

  useEffect(() => {
    const data = {
      categories: Array(6)
        .fill(0)
        .map((x, i) => ({ id: Math.random(), title: 'categories-' + i })),
      manufactures: Array(10)
        .fill(0)
        .map((x, i) => ({ id: Math.random(), title: 'manufactures-' + i })),
      projects: Array(13)
        .fill(0)
        .map((x, i) => ({ id: Math.random(), title: 'projects-' + i })),
    };

    setData(data);
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
          value={newProduct.categories}
          setNewProduct={setNewProduct}
          field="categories"
          setIsOpen={setIsOpen}
          setDone={setDone}
          setChoosedElement={setChoosedElement}
        />
        <SelectBlock
          items={data?.manufactures}
          placeholder="Производитель"
          value={newProduct.manufactures}
          setNewProduct={setNewProduct}
          field="manufactures"
          setIsOpen={setIsOpen}
          setDone={setDone}
          setChoosedElement={setChoosedElement}
        />
        <SelectBlock
          items={data?.projects}
          placeholder="Проэкт"
          value={newProduct.projects}
          setNewProduct={setNewProduct}
          field="projects"
          setIsOpen={setIsOpen}
          setDone={setDone}
          setChoosedElement={setChoosedElement}
        />

        <InputBlock
          placeholder="Артикул товара"
          type="text"
          value={newProduct.part_number}
          setNewProduct={setNewProduct}
          field="part_number"
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
      <ModalNewProduct
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        choosedElement={choosedElement}
        done={done}
        setData={setData}
      />
    </div>
  );
};

export default NewProductPage;

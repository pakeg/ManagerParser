import { useEffect, useState } from "react";
import useErrors from "../hooks/useErrors.jsx";
import { MdOutlineDone } from "react-icons/md";

import SelectBlock from "../components/NewProductPage/SelectBlock.jsx";
import InputBlock from "../components/NewProductPage/InputBlock.jsx";
import ModalNewProduct from "../components/Modals/ModalNewProduct.jsx";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  createNewProduct,
} from "../store/reducers/newProductSlice.js";

export const NewProductPage = () => {
  const { loading, errors, createdProd, createdCatItem, data } = useSelector(
    (state) => state.newProductReducer,
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [choosedElement, setChoosedElement] = useState(null);
  const [done, setDone] = useState(null);
  const { getError, cleanError, isErrors } = useErrors();
  const [newProduct, setNewProduct] = useState({
    title: "",
    categories: null,
    manufactures: null,
    projects: null,
    part_number: "",
    purchase_price: "",
    price: "",
    shopsUrl: "",
  });

  useEffect(() => {
    if (Object.keys(data).length === 0) dispatch(fetchData());
  }, []);

  useEffect(() => {
    if (createdProd) {
      // set flag after adding new product for ModalNewProduct
      setDone({
        is: createdProd,
        title: newProduct.title,
        projects: data.projects.find(
          (project) => project.id == newProduct.projects,
        ),
      });
      //open modal
      setIsOpen(!createdProd);
      //clear data of new product
      setNewProduct({
        title: "",
        categories: null,
        manufactures: null,
        projects: null,
        part_number: "",
        purchase_price: 0,
        price: 0,
        shopsUrl: "",
      });
    }
  }, [createdProd]);

  const addNewProduct = () => {
    const disabled = isErrors(newProduct);

    if (disabled) {
      cleanError();
      dispatch(createNewProduct(newProduct));
    }
  };

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
          errors={getError()}
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
          errors={getError()}
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
          errors={getError()}
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
          errors={getError()}
        />

        <InputBlock
          placeholder="Артикул товара"
          type="text"
          value={newProduct.part_number}
          setNewProduct={setNewProduct}
          field="part_number"
          errors={getError()}
        />

        <InputBlock
          placeholder="Закупочная цена"
          type="number"
          value={newProduct.purchase_price}
          setNewProduct={setNewProduct}
          field="purchase_price"
          errors={getError()}
        />
        <InputBlock
          placeholder="Базовая цена"
          type="number"
          value={newProduct.price}
          setNewProduct={setNewProduct}
          field="price"
          errors={getError()}
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
        dispatch={dispatch}
        createdCatItem={createdCatItem}
      />
    </div>
  );
};

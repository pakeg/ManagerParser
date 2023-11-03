import { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import useScroll from '../../hooks/useScroll';

const SelectBlock = ({
  items,
  placeholder,
  setNewProduct,
  field,
  setIsOpen: setIsOpenModal,
  setDone,
  setChoosedElement,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(null);
  const { boxScroll, buttonScroll } = useScroll(isOpen);

  const chooseElement = (e) => {
    setNewProduct((state) => ({ ...state, [field]: e.target.dataset.id }));
    setValues(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const addNewChooseElement = (field) => {
    setChoosedElement(field);
    setDone(null);
    setIsOpenModal(true);
  };

  return (
    <div className="flex items-center border border-black relative">
      <p
        className="focus:outline-none cursor-pointer bg-[#dfdfdf] placeholder:text-black placeholder:text-sm w-full pl-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!values ? placeholder : values}
      </p>
      <div className="cursor-pointer bg-[#c1c1c1] w-[21px] flex items-center justify-center">
        <div className={`${!isOpen ? '-rotate-90' : 'rotate-90'}`}>{'<'}</div>
      </div>
      <div
        className="absolute top-1/2 -right-[36px] -mt-[9.5px] cursor-pointer"
        onClick={() => addNewChooseElement(field)}
      >
        <BsFillPlusCircleFill color="#b4b4b4" />
      </div>

      {isOpen && (
        <div className="absolute z-10 flex w-full bg-[#c1c1c1] top-[25px] text-sm">
          <div className="grow overflow-hidden">
            <div
              className="max-h-[100px] overflow-auto -mr-[17px] cursor-pointer"
              ref={boxScroll}
              onClick={(e) => chooseElement(e)}
            >
              {items &&
                items.map((a, b) => (
                  <div className="pl-4 hover:bg-white" key={b} data-id={b}>
                    {placeholder} --- {a}
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-[#5e5e5e]">
            <div
              className="bg-[#e1e1e1] rounded-3xl cursor-grabbing w-5"
              ref={buttonScroll}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBlock;

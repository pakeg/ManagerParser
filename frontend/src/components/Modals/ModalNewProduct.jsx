import { useState } from 'react';
import Modal from './Modal.jsx';

import { GoAlertFill } from 'react-icons/go';

const fields = {
  categories: 'категории',
  manufacturers: 'производителя',
  projects: 'проэкта',
};

const ModalNewProduct = ({
  isOpen,
  setIsOpen,
  choosedElement,
  done,
  setData,
}) => {
  const [title, setTitle] = useState('');

  const addChooseElement = async () => {
    console.log(choosedElement, ' = ', title, 'addChooseElement');

    const req = await fetch(`https://cmh7wy-${3000}.csb.app`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ choosedElement, title }),
    });

    if (req.ok) {
      const res = await req.text();
      console.log('--------------', res);
      setIsOpen(!isOpen);
      setTitle('');
      setData((state) => ({
        ...state,
        [choosedElement]: [...state[choosedElement], res],
      }));
    } else {
      console.log('Ошибка ' + req.status);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="min-h-[150px] w-96 bg-[#ebebeb] rounded-md pb-3">
        <div className="flex items-center bg-black text-white px-4 rounded-t-md py-1.5">
          <GoAlertFill size={25} className="mr-4 text-red-500" />
          {!done ? (
            <p>Parcermann ask you...</p>
          ) : (
            <p>Parcermann tells you...</p>
          )}
          <p
            className="grow text-end cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            X
          </p>
        </div>
        <div className="bg-[#ebebeb] p-5 text-black">
          {!done ? (
            <>
              <input
                type="text"
                name="title"
                className="w-full bg-white pl-5 py-2.5 rounded-md"
                placeholder={`Введите название ${fields[choosedElement]} ...`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={`${!done?.is ? 'text-center' : 'text-end'}`}>
                <button
                  className="px-10 mt-5 bg-[#cccccc] rounded shadow-xl"
                  onClick={addChooseElement}
                >
                  OK
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center">{`Товар "${done.title}" добавлен в проэкт "${done.projects}"`}</p>
              <div className={`${!done.is ? 'text-center' : 'text-end'}`}>
                <button
                  className="px-10 mt-5 bg-[#cccccc] rounded shadow-xl"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  OK
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalNewProduct;

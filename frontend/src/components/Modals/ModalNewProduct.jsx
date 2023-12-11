import { useEffect, useState } from 'react';
import { GoAlertFill } from 'react-icons/go';
import Modal from './Modal.jsx';

import { useFetcher, useLocation } from 'react-router-dom';

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
  const fetcher = useFetcher();
  const location = useLocation();

  useEffect(() => {
    if (typeof fetcher.data !== 'undefined' && fetcher.data !== null) {
      const category = fetcher.data;

      setTitle('');
      setIsOpen(!isOpen);
      setData((state) => ({
        ...state,
        [choosedElement]: [...state[choosedElement], category],
      }));
    }
  }, [fetcher.data]);

  const addChooseElement = () => {
    if (title.length >= 0) {
      fetcher.submit(
        { choosedElement, title },
        {
          method: 'post',
          action: location.pathname + '/new-category',
        }
      );
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
              <p className="text-center">{`Товар "${done.title}" добавлен в проэкт "${done.projects.title}"`}</p>
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

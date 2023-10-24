import { useEffect, useRef, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md';

import Modal from './Modal.jsx';

const ModalAddShop = ({ uniqueStores }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isScroll, setScroll] = useState(false);

  const boxScroll = useRef(null);
  const boxContent = useRef(null);
  const buttonScroll = useRef(null);

  useEffect(() => {
    if (boxScroll?.current?.scrollHeight > boxScroll?.current?.offsetHeight) {
      setScroll(true);
      if (isScroll) {
        const scaleButtonScrollHeight =
          boxScroll.current.scrollHeight / boxScroll.current.offsetHeight;
        buttonScroll.current.style.height =
          Math.floor(boxScroll.current.offsetHeight / scaleButtonScrollHeight) +
          'px';

        let savePosition = 0;
        let endScroll =
          boxScroll.current.offsetHeight - buttonScroll.current.offsetHeight;

        buttonScroll.current.onmousedown = (e) => {
          let startPosition = e.pageY - savePosition;

          buttonScroll.current.parentElement.onmousemove = (event) => {
            let offsetY = event.pageY - startPosition;
            if (offsetY <= 0) offsetY = 0;
            if (offsetY >= endScroll) offsetY = endScroll;

            buttonScroll.current.style.transform = `translateY(${offsetY}px)`;
            boxContent.current.style.transform = `translateY(${-Math.floor(
              offsetY * scaleButtonScrollHeight
            )}px)`;
            savePosition = offsetY;
          };
        };
      }
    } else {
      setScroll(false);
    }

    return () => {
      document.onmouseup = () => {
        buttonScroll.current.parentElement.onmousemove = null;
      };
    };
  }, [boxScroll?.current?.scrollHeight]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-80 bg-white pb-5 rounded-b-md rounded-t-md">
        <div className="bg-black text-white px-4 rounded-t-md py-1.5">
          <p>Добавить магазин</p>
        </div>
        <div className="min-h-[300px] p-4 pr-1 flex">
          <div className="max-h-[300px] grow overflow-hidden" ref={boxScroll}>
            <div className="text-black pr-2 space-y-1" ref={boxContent}>
              {uniqueStores &&
                uniqueStores.map((store) => (
                  <div
                    key={store}
                    className="flex items-center justify-between"
                  >
                    <p className="pb-2 border-b w-full">{store}</p>
                    <label
                      className="hover:bg-green-500 bg-[#a1a1a1] rounded-sm cursor-pointer"
                      htmlFor={store}
                    >
                      <input
                        id={store}
                        type="checkbox"
                        name="stores[]"
                        className="opacity-0 select-none peer hidden"
                      />
                      <BsCheck
                        color="white"
                        className="peer-checked:bg-green-500 rounded-sm"
                        size={20}
                        strokeWidth="2"
                        title="confirm"
                        onClick={() => {}}
                      />
                    </label>
                  </div>
                ))}
            </div>
          </div>
          {isScroll && (
            <div className="bg-[#c1c1c1] rounded-3xl shadow-[inset_0px_0px_1px_0px_black]">
              <div
                className="w-3.5 bg-[#e1e1e1] rounded-3xl cursor-grabbing"
                ref={buttonScroll}
              ></div>
            </div>
          )}
        </div>
        <div className="flex justify-evenly">
          <button
            className="text-black border text-xs px-3 py-1 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            Отмена
          </button>
          <div className="flex items-center bg-[#4bc1b5] font-bold text-sm px-3 py-1 rounded">
            <button>Готово</button>
            <MdOutlineDone size="20" strokeLinecap="round" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalAddShop;

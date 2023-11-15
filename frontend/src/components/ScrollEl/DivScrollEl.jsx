import { useEffect, useRef, useState } from 'react';

import useScroll from '../../hooks/useScroll.jsx';
import InfoData from './InfoData';

function DivScrollEl() {
  let [arr, setArr] = useState(null);
  let [padding, setPadding] = useState(1);

  const { isScroll, boxScroll, buttonScroll } = useScroll(true);
  let boxContent = useRef(null);

  useEffect(() => {
    const arrN = Array(5)
      .fill(0)
      .map((a, x) => <InfoData text={`text ` + x} key={x} />);
    setArr(arrN);
  }, []);

  useEffect(() => {
    const countRows = 4;
    const boxScrollHeight =
      boxContent?.current?.firstChild?.offsetHeight * countRows + padding * 4;
    boxScroll.current.style.height = `${boxScrollHeight}px`;
  }, [boxContent.current, padding]);

  return (
    <div id="scrollMenu" className="flex rounded bg-[#a1a1a1] w-fit p-1">
      <div className="overflow-hidden">
        <div
          className={`overflow-auto ${isScroll && '-mr-[17px]'}`}
          ref={boxScroll}
        >
          <div className="space-y-0.5 grow" ref={boxContent}>
            <InfoData text="" newInput />
            {arr && arr}
          </div>
        </div>
      </div>
      <div
        ref={buttonScroll}
        className="w-5 bg-white ml-1 rounded-3xl cursor-grabbing shadow-[1px_1px_4px_0_black]"
      ></div>
    </div>
  );
}

export default DivScrollEl;

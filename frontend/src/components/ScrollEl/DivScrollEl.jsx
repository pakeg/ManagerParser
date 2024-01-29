import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import useScroll from "../../hooks/useScroll.jsx";
import Field from "./Field";

function DivScrollEl() {
  const {
    data: { projects },
  } = useSelector((state) => state.newProductReducer);
  let boxContent = useRef(null);

  useEffect(() => {
    const childElemnt = boxContent?.current?.firstChild;
    const match = childElemnt.className.match(/py[0-9-.]*/);
    const padding = match ? match[0].split("-")[1] / 0.125 : 0;
    const countRows = 7;
    const boxScrollHeight = childElemnt?.offsetHeight * countRows + padding;
    boxContent.current.style.maxHeight = `${boxScrollHeight}px`;
  }, []);

  const { isScroll, boxScroll, buttonScroll } = useScroll(
    Boolean(projects.length),
  );

  return (
    <div
      id="scrollMenu"
      className="absolute mt-1 z-10 flex rounded bg-[#a1a1a1] w-fit p-1"
    >
      <div className="overflow-hidden">
        <div
          className={`overflow-auto ${isScroll ? "-mr-[17px]" : ""}`}
          ref={boxScroll}
        >
          <div className="space-y-0.5 grow" ref={boxContent}>
            <Field text="" newInput />
            {projects &&
              projects.map((project) => (
                <Field key={project.id} text={project.title} />
              ))}
          </div>
        </div>
      </div>
      {isScroll && (
        <div
          ref={buttonScroll}
          className="w-5 bg-white ml-1 rounded-3xl cursor-grabbing shadow-[1px_1px_4px_0_black]"
        ></div>
      )}
    </div>
  );
}

export default DivScrollEl;

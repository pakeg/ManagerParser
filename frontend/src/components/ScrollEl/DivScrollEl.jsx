import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import useScroll from "../../hooks/useScroll.jsx";
import Field from "./Field";
import ModalDelete from "../Modals/ModalDelete.jsx";

import {
  fetchCreateNewItemCategory,
  fetchUpdateItemCategory,
  fetchDeleteItemCategory,
} from "../../store/reducers/newProductSlice.js";

function DivScrollEl() {
  const {
    data: { projects },
  } = useSelector((state) => state.newProductReducer);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState(null);
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

  const deleteProject = () => {
    dispatch(
      fetchDeleteItemCategory({
        choosedElement: info.choosedElement,
        id: info.id,
        index: info.index,
      }),
    );
    setIsOpen(false);
  };

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
            <Field
              value=""
              newItem
              fetchCreateNewItemCategory={fetchCreateNewItemCategory}
              dispatch={dispatch}
            />
            {projects &&
              projects.map((project, i) => (
                <Field
                  key={project.id}
                  id={project.id}
                  index={i}
                  value={project.title}
                  fetchUpdateItemCategory={fetchUpdateItemCategory}
                  dispatch={dispatch}
                  setInfo={setInfo}
                  setIsOpen={setIsOpen}
                />
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

      {isOpen && (
        <ModalDelete
          item={info?.title}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          actionAccept={deleteProject}
        />
      )}
    </div>
  );
}

export default DivScrollEl;

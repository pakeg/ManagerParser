import { RiArrowDownSLine } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";

import Button from "./Button";
import DivScrollEl from "./ScrollEl/DivScrollEl";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black py-3 flex items-center space-x-28">
      <h1 className="text-gray-400 ml-20 first-letter:text-2xl tracking-wider text-lg ">
        PARCERMANN
      </h1>
      {location.pathname === "/" && (
        <>
          <div>
            <div
              className="bg-gray-400 flex items-center rounded cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="shrink-0 font-semibold pl-10">Проект</span>
              <span className="shrink pl-10 pt-1">
                <RiArrowDownSLine size="25" />
              </span>
            </div>
            {isOpen && <DivScrollEl />}
          </div>
          <div className="flex space-x-4">
            <Button text="Добавить товар" icon={AiFillPlusCircle} />
          </div>
        </>
      )}
    </div>
  );
}

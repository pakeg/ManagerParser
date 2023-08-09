import { Outlet } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { AiFillPlusCircle, AiOutlineMessage } from 'react-icons/ai';
import { CiHome, CiTimer, CiUser, CiSettings } from 'react-icons/ci';
import { PiDownload } from 'react-icons/pi';
import Button from './components/Button';

function App() {
  return (
    <div className="h-screen">
      <div className="bg-black py-3 flex items-center space-x-28">
        <h1 className="text-gray-400 ml-20 first-letter:text-2xl tracking-wider text-lg ">
          PARCERMANN
        </h1>
        <div>
          <div className="bg-gray-400 flex items-center rounded py-1 cursor-pointer">
            <span className="shrink-0 font-semibold pl-10">Проект</span>
            <span className="shrink pl-10 pt-1">
              <RiArrowDownSLine size="25" />
            </span>
          </div>
          <div></div>
        </div>
        <div className="flex space-x-4">
          <Button text="Добавить товар" icon={AiFillPlusCircle} />
          <Button text="Задать цену" />
        </div>
      </div>

      <main>
        <aside className="bg-black flex flex-col w-10 pl-1 space-y-5 h-fscreen">
          <div>
            <div className="rounded-full bg-green-500">
              <CiUser size="30" fill="white" />
            </div>
          </div>
          <div>
            <CiHome size="30" fill="white" />
          </div>
          <div>
            <CiTimer size="30" fill="white" />
          </div>
          <div>
            <AiFillPlusCircle size="30" fill="orange" />
          </div>
          <div>
            <AiOutlineMessage size="30" fill="white" />
          </div>
          <div>
            <CiSettings size="30" fill="white" />
          </div>
          <div>
            <PiDownload size="30" fill="white" />
          </div>
        </aside>
        <Outlet />
      </main>

      <div className="fixed bottom-3.5">
        <div className="flex ml-20 text-sm space-x-4">
          <Button text="Обновить" />
          <Button text="Экспорт" />
          <Button text="Добавить в проэкт" />
          <Button text="Удалить выбранные" />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;

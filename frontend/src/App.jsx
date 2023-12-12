import { Outlet, Navigate } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { AiFillPlusCircle } from 'react-icons/ai';
import Button from './components/Button';
import Aside from './components/AsideBar/Aside';

function App() {
  const jwt = true;

  if (!jwt) return <Navigate to="/authorization" replace={true} />;

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
        </div>
      </div>

      <main className="flex h-fscreen">
        <Aside />
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

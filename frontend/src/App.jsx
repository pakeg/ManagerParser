import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Button from "./components/Button";
import Aside from "./components/AsideBar/Aside";

function App() {
  return (
    <div className="h-screen">
      <Header />
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

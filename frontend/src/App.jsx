import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Aside from "./components/AsideBar/Aside";

function App() {
  return (
    <div>
      <Header />
      <main className="flex h-fscreen">
        <Aside />
        <Outlet />
      </main>
    </div>
  );
}

export default App;

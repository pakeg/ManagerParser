import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div>
      <div className="flex justify-end items-center bg-[url('assets/auth.jpg')] h-screen w-screen bg-cover">
        <div className="grow-[5]"></div>
        <div className="w-64 text-center">
          <div className="mb-14">
            {/*display: flex; justify-content: space-evenly; padding: 10px; background-color: white;*/}
            <h1 className="first-letter:text-5xl text-3xl tracking-widest">
              PARCERMANN
            </h1>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-evenly bg-white">
              <FaUserCircle fill="#67d6d0" size={25} />
              <div className="relative text-black">
                <input
                  id="username"
                  className="focus:outline-none bg-white py-3 peer placeholder-transparent"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  className="absolute text-[#e1e1e1] text-xs transition-all left-0 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-black
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
                  htmlFor="username"
                >
                  username
                </label>
              </div>
            </div>
            <div className="flex items-center justify-evenly bg-white">
              <IoIosLock fill="#cdcdcd" size={30} />
              <div className="relative text-black">
                <input
                  id="password"
                  className="focus:outline-none bg-white py-3 peer placeholder-transparent"
                  type="text"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className="absolute text-[#e1e1e1] text-xs transition-all left-0 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-black
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
                  htmlFor="password"
                >
                  password
                </label>
              </div>
            </div>
            <div className="flex justify-evenly text-xs">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(!remember)}
                />
                <label
                  className="hover:text-[#474747] hover:underline cursor-pointer ml-1"
                  htmlFor="remember"
                >
                  Запомнить меня
                </label>
              </div>
              <span className="cursor-pointer hover:text-[#474747] hover:underline">
                Восстановить пароль
              </span>
            </div>
            <div>Button</div>
          </div>
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
};

export default AuthPage;

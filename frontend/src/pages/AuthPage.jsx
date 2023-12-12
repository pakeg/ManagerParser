import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';

import useErrors from '../hooks/useErrors.jsx';
import { useFetcher, useLocation } from 'react-router-dom';

const AuthPage = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const fetcher = useFetcher();
  const location = useLocation();
  const { getError, cleanError, isErrors } = useErrors();

  useEffect(() => {
    if (typeof fetcher.data !== 'undefined' && fetcher.data !== null) {
      const redirect = fetcher.data;
      console.log(redirect, '---------redirect----------');
    }
  }, [fetcher.data]);

  const signIn = () => {
    const disabled = isErrors({ nickname, password });

    if (disabled) {
      cleanError();
      fetcher.submit(
        { nickname, password, remember: remember ? 1 : 0 },
        {
          method: 'post',
          action: location.pathname,
        }
      );
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center bg-[url('assets/auth.jpg')] h-screen w-screen bg-cover">
        <div className="grow-[5]"></div>
        <div className="w-64 text-center">
          <div className="mb-14">
            <h1 className="first-letter:text-5xl text-3xl tracking-widest">
              PARCERMANN
            </h1>
          </div>
          <div className="space-y-4">
            <div
              className={`flex items-center justify-evenly bg-white ${
                getError() &&
                !getError()['nickname'] &&
                'shadow-[0_0px_4px_2px] shadow-red-500'
              }`}
            >
              <FaUserCircle fill="#67d6d0" size={25} />
              <div className="relative text-black">
                <input
                  id="nickname"
                  className="focus:outline-none bg-white py-3 peer placeholder-transparent"
                  type="text"
                  name="nickname"
                  placeholder="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <label
                  className="absolute text-[#e1e1e1] text-xs transition-all left-0 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-black
                  peer-focus:text-xs peer-focus:text-[#e1e1e1] peer-focus:top-0 peer-focus:translate-y-0"
                  htmlFor="nickname"
                >
                  nickname
                </label>
              </div>
            </div>
            <div
              className={`flex items-center justify-evenly bg-white ${
                getError() &&
                !getError()['password'] &&
                'shadow-[0_0px_4px_2px] shadow-red-500'
              }`}
            >
              <IoIosLock fill="#cdcdcd" size={30} />
              <div className="relative text-black">
                <input
                  id="password"
                  className="focus:outline-none bg-white py-3 peer placeholder-transparent"
                  type="password"
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
                  onChange={() => setRemember(!remember)}
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
            <div onClick={signIn}>Button</div>
          </div>
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
};

export default AuthPage;

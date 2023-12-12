import { AiOutlineMessage, AiFillPlusCircle } from 'react-icons/ai';
import { CiHome, CiTimer, CiUser, CiSettings } from 'react-icons/ci';
import { PiDownload } from 'react-icons/pi';

import AsideLink from './AsideLink';

export default function Aside() {
  return (
    <aside className="bg-black flex flex-col w-14 pt-4 space-y-5">
      <AsideLink to="/admin-panel" icon={CiUser} />
      <AsideLink to="/" icon={CiHome} />
      <AsideLink to="/refresh" icon={CiTimer} />
      <AsideLink to="/new-product" icon={AiFillPlusCircle} />
      <AsideLink to="/comments" icon={AiOutlineMessage} />
      <AsideLink to="/settings" icon={CiSettings} />
      <AsideLink to="/upload" icon={PiDownload} />
    </aside>
  );
}

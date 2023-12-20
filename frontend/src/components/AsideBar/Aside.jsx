import { AiOutlineMessage, AiFillPlusCircle } from "react-icons/ai";
import { CiHome, CiTimer, CiUser, CiSettings } from "react-icons/ci";
import { PiDownload } from "react-icons/pi";

import AsideLink from "./AsideLink";
const routes = [
  { to: "/admin-panel", icon: CiUser, role: "admin|manager" },
  { to: "/", icon: CiHome, role: "admin|user|manager" },
  {
    to: "/new-product",
    icon: AiFillPlusCircle,
    role: "admin|user|manager",
  },
  {
    to: "/comments",
    icon: AiOutlineMessage,
    role: "admin|user|manager",
  },
  { to: "/settings", icon: CiSettings, role: "admin|user|manager" },
  { to: "/upload", icon: PiDownload, role: "admin|user|manager" },
];

const session =
  sessionStorage.getItem("authorized")?.match("admin|user|manager") ?? "";

export default function Aside() {
  return (
    <aside className="bg-black flex flex-col w-14 pt-4 space-y-5">
      {routes
        .filter((route) => route.role.includes(session[0]))
        .map((route) => (
          <AsideLink to={route.to} icon={route.icon} key={route.to} />
        ))}
    </aside>
  );
}

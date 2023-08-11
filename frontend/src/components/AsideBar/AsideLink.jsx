import { NavLink } from 'react-router-dom';

export default function AsideLink({ to, icon: Icon }) {
  return (
    <NavLink
      to={to}
      style={{ padding: '8px' }}
      className={({ isActive, isPending }) =>
        isActive ? 'active bg-white' : ''
      }
    >
      <div className="flex justify-center rounded-full p-2.5">
        <Icon size="20" fill="green" />
      </div>
    </NavLink>
  );
}

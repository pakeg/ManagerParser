import { useCallback, useState } from 'react';
import { PiArrowElbowDownLeft } from 'react-icons/pi';

const MenuItem = ({ title, sort: Sort, icon: Icon, category, search }) => {
  const [hideCategory, setHideCategory] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [querySearch, setQuerySearch] = useState('');

  const searching = useCallback(() => {
    if (querySearch) {
      console.log(querySearch, 'querySearch');
      setHideSearch(!hideSearch);
      setQuerySearch('');
    }
    return;
  }, [querySearch]);

  return (
    <td className="py-1.5 px-2.5 relative">
      <div className="flex items-center justify-center space-x-1">
        {Sort && <Sort className="cursor-pointer" size={20} />}
        <span>{title}</span>

        {Icon && !category && !search && (
          <Icon className="cursor-pointer" size={20} />
        )}
        {Icon && category && (
          <Icon
            className="cursor-pointer"
            size={20}
            onClick={() => setHideCategory(!hideCategory)}
          />
        )}
        {Icon && search && (
          <Icon
            className="cursor-pointer"
            size={20}
            onClick={() => setHideSearch(!hideSearch)}
          />
        )}

        {category && hideCategory && (
          <div className="absolute top-full -left-1 w-full bg-white rounded px-0.5">
            <ul>
              {['Высшая', 'Высшая 1'].map((item) => (
                <li key={item} className="flex justify-between">
                  <span>{item}</span>
                  <input
                    key={item}
                    type="checkbox"
                    name="category[]"
                    value={item}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {search && hideSearch && (
          <div className="absolute top-full -left-1 w-full bg-white rounded px-0.5 flex items-center">
            <input
              className="w-full bg-white px-2.5 py-1.5"
              type="text"
              name="search"
              value={querySearch}
              onChange={(e) => setQuerySearch(e.target.value)}
              autoComplete="off"
            />
            <PiArrowElbowDownLeft
              size={20}
              strokeWidth={15}
              className="cursor-pointer"
              onClick={searching}
            />
          </div>
        )}
      </div>
    </td>
  );
};

export default MenuItem;

import { useCallback, useState } from "react";
import { PiArrowElbowDownLeft } from "react-icons/pi";

import { useDispatch } from "react-redux";
import { sorting } from "../../store/reducers/mainPageSlice";

const MenuItem = ({
  title,
  sort: Sort,
  properties,
  icon: Icon,
  category: Category,
  search: Search,
  data,
}) => {
  const [hideCategory, setHideCategory] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const dispatch = useDispatch();

  const changingSortOrder = useCallback(() => {
    dispatch(sorting({ properties, sortIndex }));
    if (sortIndex === 2) {
      setSortIndex(0);
      return;
    }
    setSortIndex(sortIndex + 1);
  });

  const searching = useCallback(() => {
    if (querySearch) {
      console.log(querySearch, "querySearch");
      setHideSearch(!hideSearch);
      setQuerySearch("");
    }
    return;
  }, [querySearch]);

  return (
    <td className="py-1.5 px-2.5 relative">
      <div className="flex items-center justify-center space-x-1">
        {Sort && (
          <Sort
            className={`cursor-pointer ${sortIndex === 1 && "text-teal-500"} ${sortIndex === 2 && "text-rose-500"}`}
            size={20}
            onClick={() => properties && changingSortOrder()}
          />
        )}
        <span>{title}</span>

        {Icon && !Category && !Search && (
          <Icon className="cursor-pointer" size={20} />
        )}

        {Category && (
          <Category
            className="cursor-pointer"
            size={20}
            onClick={() => setHideCategory(!hideCategory)}
          />
        )}

        {Search && (
          <Search
            className="cursor-pointer"
            size={20}
            onClick={() => setHideSearch(!hideSearch)}
          />
        )}

        {Category && hideCategory && (
          <div className="absolute top-full -left-1 w-full bg-white rounded px-0.5">
            <ul>
              {data &&
                data.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span
                      className="overflow-hidden whitespace-nowrap text-ellipsis cursor-default"
                      title={item.title}
                    >
                      {item.title}
                    </span>
                    <input type="checkbox" name="category[]" value={item.id} />
                  </li>
                ))}
            </ul>
          </div>
        )}

        {Search && hideSearch && (
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

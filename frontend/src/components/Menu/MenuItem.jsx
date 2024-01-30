import { useCallback, useState } from "react";
import { PiArrowElbowDownLeft } from "react-icons/pi";

import { useDispatch } from "react-redux";
import { setSortActions } from "../../store/actions/createdActions";
import {
  setFiltersAction,
  setSearchAction,
} from "../../store/reducers/mainPageSlice.js";

const MenuItem = ({
  title,
  sort: Sort,
  properties,
  actionType,
  icon: Icon,
  filter: Filter,
  search: Search,
  data,
  left,
}) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const [hideFilter, setHideFilter] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [hideSearch, setHideSearch] = useState(false);
  const [sortIndex, setSortIndex] = useState(0);

  const changingSortOrder = useCallback(() => {
    const action = setSortActions(actionType);
    dispatch(action({ properties, sortIndex }));
    if (sortIndex === 2) {
      setSortIndex(0);
      return;
    }
    setSortIndex(sortIndex + 1);
  });

  const changingFilters = useCallback(() => {
    if (hideFilter) {
      dispatch(setFiltersAction({ properties, filters }));
    }
    setHideFilter(!hideFilter);
  });

  const searching = useCallback(() => {
    dispatch(setSearchAction({ properties, querySearch }));
    setHideSearch(!hideSearch);
    setQuerySearch("");
    return;
  }, [querySearch]);

  return (
    <td className="py-1.5 px-2.5 relative">
      <div
        className={`flex items-center justify-center space-x-1 ${left && "flex-row-reverse"}`}
      >
        {Sort && (
          <Sort
            className={`cursor-pointer ${sortIndex === 1 && "text-teal-500"} ${sortIndex === 2 && "text-rose-500"}`}
            size={20}
            onClick={() => properties && changingSortOrder()}
          />
        )}
        <span>{title}</span>

        {Icon && !Filter && !Search && (
          <Icon className="cursor-pointer" size={20} />
        )}

        {Filter && (
          <Filter
            className="cursor-pointer"
            size={20}
            onClick={() => changingFilters()}
          />
        )}

        {Search && (
          <Search
            className="cursor-pointer"
            size={20}
            onClick={() => setHideSearch(!hideSearch)}
          />
        )}

        <div
          className={`absolute top-full -left-1 w-full bg-white rounded px-0.5 ${!hideFilter ? "hidden" : ""}`}
        >
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
                  <input
                    type="checkbox"
                    value={item.title}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters([...filters, item.title]);
                      } else {
                        setFilters(filters.filter((i) => i !== item.title));
                      }
                    }}
                  />
                </li>
              ))}
          </ul>
        </div>

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

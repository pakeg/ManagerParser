import { createAction, createSelector } from "@reduxjs/toolkit";
import { sortByProperties } from "../../utils/utilsFun";

const sortOrder = ["asc", "desc", "del"];

//toolkit
const reCreateTableRows = (products, shops) => {
  return products.map((product) => {
    const row = [];
    shops.forEach((shop) => {
      if (shop.active_status != "0") {
        const finded = product.shops_data.find(
          (shop_data) => shop_data.shop === shop.title,
        );
        row.push(finded ?? null);
      }
    });

    return row;
  });
};

//actions
export const setSortActions = (action) => createAction(action);

//reducers
export const sortReducer = (create) =>
  create.reducer((state, { payload: { properties, sortIndex } }) => {
    const orderProp = `${properties}:${sortOrder[sortIndex]}`;
    const findI = state.sort.findIndex((el) => {
      if (el.indexOf(properties) !== -1) {
        return true;
      }
      return false;
    });
    const start = findI === -1 ? state.sort.length : findI;

    if (sortOrder[sortIndex] !== "del") {
      state.sort.splice(start, 1, orderProp);
    } else {
      state.sort.splice(start, 1);
    }
  });

//selectors
export const getSortedDataSelector = (state, typeData) => {
  const selector = createSelector(
    (state) => state,
    (state) => {
      if (!state.data[typeData]) return {};
      const sortedData = { ...state.data };

      let countEmptySearch = 0;
      let countEmptyFilters = 0;

      for (const key in state.search) {
        if (state.search[key] === "") {
          countEmptySearch++;
        }
      }
      for (const key in state.filters) {
        if (state.filters[key].length === 0) {
          countEmptyFilters++;
        }
      }

      if (countEmptySearch !== Object.keys(state.search).length) {
        sortedData[typeData] = sortedData[typeData].filter((item) => {
          for (const key in state.search) {
            if (
              item[key]
                .toLowerCase()
                .includes(state.search[key].toLowerCase()) === false
            ) {
              return false;
            }
          }
          return true;
        });
      }

      if (countEmptyFilters !== Object.keys(state.filters).length) {
        sortedData[typeData] = sortedData[typeData].filter((item) => {
          for (const key in state.filters) {
            if (state.filters[key].includes(item[key]) === true) {
              return true;
            }
          }
          return false;
        });
      }

      if (state.sort.length != 0) {
        sortedData[typeData] = [...sortedData[typeData]].sort(
          sortByProperties(state.sort),
        );

        //reCreate shopsTableRows
        if (typeData === "products" && sortedData["shops"]) {
          console.log("reCreate shopsTableRows");
          sortedData["shopsTableRows"] = reCreateTableRows(
            sortedData[typeData],
            sortedData["shops"],
          );
        }
      }

      return sortedData;
    },
  );
  return selector(state);
};

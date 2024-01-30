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
      const sortedProducts = state.data[typeData] ? { ...state.data } : {};

      if (
        state.search.title.length != 0 ||
        state.search.part_number.length != 0
      ) {
        sortedProducts[typeData] = sortedProducts[typeData].filter((item) => {
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

      if (
        state.filters.category.length != 0 ||
        state.filters.manufacture.length != 0
      ) {
        sortedProducts[typeData] = sortedProducts[typeData].filter((item) => {
          for (const key in state.filters) {
            if (state.filters[key].includes(item[key]) === true) {
              return true;
            }
          }
          return false;
        });
      }

      if (state.sort.length != 0) {
        sortedProducts[typeData] = [...sortedProducts[typeData]].sort(
          sortByProperties(state.sort),
        );
      }

      //reCreate shopsTableRows
      if (typeData === "products" && sortedProducts["shops"]) {
        sortedProducts["shopsTableRows"] = reCreateTableRows(
          sortedProducts[typeData],
          sortedProducts["shops"],
        );
      }
      return sortedProducts;
    },
  );
  return selector(state);
};

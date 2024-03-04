import { createAction, createSelector } from "@reduxjs/toolkit";
import { sortByProperties } from "../../utils/utilsFun";

const sortOrder = ["asc", "desc", "del"];

//toolkit
const reCreateShops = (state, shops) => {
  const index = state.data.products.findIndex(
    (el) => el.id == state.sortTableTwo.product_id,
  );
  const notEmpty = state.data.shopsTableRows[index].filter(
    (el) => el["parsed_price"],
  );
  const empty = state.data.shopsTableRows[index].filter(
    (el) => !el["parsed_price"],
  );

  // sorting not empty by `parsed_price`
  notEmpty.sort(sortByProperties(state.sort["tableTwo"]));
  const newListShops = notEmpty.concat(empty).reduce((acc, el) => {
    const finded = shops.find((shop) => shop.id === el.shop.id);
    return finded ? [...acc, finded] : acc;
  }, []);
  return newListShops;
};

const reCreateTableRows = (products, shops) => {
  const arr = products.map((product) => {
    const row = [];
    shops.forEach((shop) => {
      const finded = product.shops_data.find(
        (shop_data) => shop_data.shop.id === shop.id,
      );
      row.push(
        finded ?? {
          product_id: product.id,
          shop: {
            id: shop.id,
            title: shop.title,
            active_status: shop.active_status,
          },
        },
      );
    });

    return row;
  });

  return [shops, arr];
};

//actions
export const setSortActions = (action) => createAction(action);

//reducers
export const sortReducer = (create) =>
  create.reducer((state, { payload: { properties, sortIndex, table } }) => {
    const orderProp = `${properties}:${sortOrder[sortIndex]}`;
    const findI = state.sort[table].findIndex((el) => {
      if (el.indexOf(properties) !== -1) {
        return true;
      }
      return false;
    });
    const start = findI === -1 ? state.sort[table].length : findI;

    if (sortOrder[sortIndex] !== "del") {
      state.sort[table].splice(start, 1, orderProp);
    } else {
      state.sort[table].splice(start, 1);
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

      if (state.sort["tableOne"].length != 0) {
        sortedData[typeData] = [...sortedData[typeData]].sort(
          sortByProperties(state.sort["tableOne"]),
        );
      }

      //reCreate shopsTableRows
      if (typeData === "products" && sortedData["shops"]) {
        let shops = sortedData.shops.filter((el) => el.active_status != "0");
        if (
          typeof state.sortTableTwo?.sortIndex !== "undefined" &&
          state.sortTableTwo?.sortIndex !== 2
        ) {
          shops = reCreateShops(state, shops);
        }
        sortedData["shopsTableRows"] = reCreateTableRows(
          sortedData.products,
          shops,
        );
      }
      return sortedData;
    },
  );
  return selector(state);
};

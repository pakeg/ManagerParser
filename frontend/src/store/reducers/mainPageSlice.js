import {
  buildCreateSlice,
  asyncThunkCreator,
  createSelector,
} from "@reduxjs/toolkit";
import { produce } from "immer";

import { fetchAllInformation } from "../actions/actionsMainPage";
import { fetchDataCategories } from "./newProductSlice";
import { sortByProperties } from "../../utils/utilsFun";

const sortOrder = ["asc", "desc", "del"];

const initialState = {
  loading: false,
  errors: null,
  data: {},
  revalidate: null,
  sort: [],
  search: "",
  filters: [],
};
const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const mainPageSlice = createSliceWithThunks({
  name: "mainPage",
  initialState,
  reducers: (create) => ({
    fetchGeneralData: create.asyncThunk(
      async (_, { signal, getState, dispatch }) => {
        const {
          mainPageReducer: { revalidate },
          newProductReducer: { data: categories },
        } = getState();
        if (Object.keys(categories).length === 0) {
          dispatch(fetchDataCategories());
        }
        if (revalidate == null || revalidate < Date.now()) {
          const data = await fetchAllInformation(signal);
          return data;
        }
        return {};
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.revalidate = Date.now() + 60 * 60 * 1000;
          state.data = action.payload;
        },
      },
    ),
    setSort: create.reducer((state, { payload: { properties, sortIndex } }) => {
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
    }),
  }),
});

export const getSortedProducts = createSelector(
  (state) => state,
  (state) => {
    const sortedProducts = state.data.products ? [...state.data.products] : [];
    if (state.sort.length != 0) {
      sortedProducts.sort(sortByProperties(state.sort));
    }
    return sortedProducts;
  },
);

export const { fetchGeneralData, setSort } = mainPageSlice.actions;
export default mainPageSlice.reducer;

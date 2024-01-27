import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
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
    sorting: create.reducer((state, { payload: { properties, sortIndex } }) => {
      const orderProp = `${properties}:${sortOrder[sortIndex]}`;
      const findI = state.sort.findIndex((el) => {
        if (el.indexOf(properties) !== -1) {
          return true;
        }
        return false;
      });
      const start = findI === -1 ? state.sort.length : findI;

      return produce(state, (draft) => {
        if (sortOrder[sortIndex] !== "del") {
          draft.sort.splice(start, 1, orderProp);
        } else {
          draft.sort.splice(start, 1);
        }
        draft.data.products.sort(sortByProperties(draft.sort));
      });
    }),
  }),
});
export const { fetchGeneralData, sorting } = mainPageSlice.actions;
export default mainPageSlice.reducer;

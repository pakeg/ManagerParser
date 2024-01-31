import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

import { fetchAllInformation, updatePrice } from "../actions/actionsMainPage";
import { fetchDataCategories } from "./newProductSlice";
import { sortReducer } from "../actions/createdActions";

const initialState = {
  loading: false,
  errors: null,
  data: {},
  revalidate: null,
  sort: [],
  search: { title: "", part_number: "" },
  filters: { category: [], manufacture: [] },
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
    fetchUpdatePrice: create.asyncThunk(
      async ({ id, price }, { signal }) => {
        const data = await updatePrice({ id, price }, signal);
        return data;
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
          const findedProductsIndex = state.data.products.findIndex(
            (product) => product.id === action.payload.id,
          );
          state.data.products[findedProductsIndex].price = action.payload.price;
        },
      },
    ),
    setSort: sortReducer(create),
    setFilters: create.reducer(
      (state, { payload: { properties, filters } }) => {
        if (filters.length === 0) {
          state.filters[properties] = [];
          return;
        }
        state.filters = { ...state.filters, [properties]: filters };
      },
    ),
    setSearch: create.reducer(
      (state, { payload: { properties, querySearch } }) => {
        if (querySearch.length === 0) {
          state.search[properties] = "";
          return;
        }
        state.search = { ...state.search, [properties]: querySearch };
      },
    ),
  }),
});

export const { fetchGeneralData, fetchUpdatePrice, setFilters, setSearch } =
  mainPageSlice.actions;
export default mainPageSlice.reducer;

import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import {
  fetchCategoriesItem,
  actionCreateNewProduct,
  actionCreateNewItemCategory,
} from "../actions/actionsNewProductPage";

const initialState = {
  loading: false,
  errors: null,
  data: {},
  createdProd: false,
  createdCatItem: false,
  revalidate: null,
};
const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const newProductSlice = createSliceWithThunks({
  name: "newProducts",
  initialState,
  reducers: (create) => ({
    fetchData: create.asyncThunk(
      async (_, { signal, getState }) => {
        const {
          newProductReducer: { revalidate },
        } = getState();
        if (revalidate == null || revalidate < Date.now()) {
          const items = await fetchCategoriesItem(signal);
          return items;
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
    createNewProduct: create.asyncThunk(
      async (newProduct, { signal }) => {
        const res = await actionCreateNewProduct(newProduct, signal);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.createdProd = false;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.createdProd = action.payload.created;
        },
      },
    ),
    createNewItemCategory: create.asyncThunk(
      async (details, { signal }) => {
        const items = await actionCreateNewItemCategory(details, signal);
        return items;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.createdCatItem = false;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          const { newItem, choosedElement, created } = action.payload;
          state.createdCatItem = created;
          state.data[choosedElement] = [
            newItem[0],
            ...state.data[choosedElement],
          ];
        },
      },
    ),
  }),
});
export const { fetchData, createNewProduct, createNewItemCategory } =
  newProductSlice.actions;
export default newProductSlice.reducer;

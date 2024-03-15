import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import {
  fetchCategoriesItem,
  actionCreateNewProduct,
  actionCreateNewItemCategory,
  actionUpdateItemCategory,
  actionDeleteItemCategory,
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
    fetchDataCategories: create.asyncThunk(
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
    fetchCreateNewProduct: create.asyncThunk(
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
    fetchCreateNewItemCategory: create.asyncThunk(
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
          const { project, choosedElement, created } = action.payload;
          state.createdCatItem = created;
          state.data[choosedElement] = [project, ...state.data[choosedElement]];
        },
      },
    ),
    fetchUpdateItemCategory: create.asyncThunk(
      async (details, { signal }) => {
        const items = await actionUpdateItemCategory(details, signal);
        return items;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.createdCatItem = false;
        },
        rejected: (state) => {
          state.loading = false;
        },
        fulfilled: (state, { payload: { project, choosedElement, index } }) => {
          state.loading = false;
          state.data[choosedElement][index] = project;
        },
      },
    ),
    fetchDeleteItemCategory: create.asyncThunk(
      async (details, { signal }) => {
        const items = await actionDeleteItemCategory(details, signal);
        return items;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.createdCatItem = false;
        },
        rejected: (state) => {
          state.loading = false;
        },
        fulfilled: (state, { payload: { choosedElement, index } }) => {
          state.loading = false;
          state.data[choosedElement].splice(index, 1);
        },
      },
    ),
    resetCreatedProd: create.reducer((state) => {
      state.createdProd = false;
    }),
  }),
});

export const {
  fetchDataCategories,
  fetchCreateNewProduct,
  fetchCreateNewItemCategory,
  fetchUpdateItemCategory,
  fetchDeleteItemCategory,
  resetCreatedProd,
} = newProductSlice.actions;
export default newProductSlice.reducer;

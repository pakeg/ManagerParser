import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

import { fetchAllInformation } from "../actions/actionsMainPage";
import { fetchDataCategories } from "./newProductSlice";

const initialState = {
  loading: false,
  errors: null,
  data: {},
  revalidate: null,
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
  }),
});
export const { fetchGeneralData } = mainPageSlice.actions;
export default mainPageSlice.reducer;

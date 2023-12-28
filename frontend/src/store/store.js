import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./reducers/adminSlice";
import newProductReducer from "./reducers/newProductSlice";

export const store = configureStore({
  reducer: { adminReducer, newProductReducer },
});

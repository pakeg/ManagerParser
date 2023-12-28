import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./reducers/adminSlice";
import newProductReducer from "./reducers/newProductSlice";
import mainPageReducer from "./reducers/mainPageSlice";

export const store = configureStore({
  reducer: { adminReducer, newProductReducer, mainPageReducer },
});

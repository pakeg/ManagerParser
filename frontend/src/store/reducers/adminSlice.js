import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import {
  loaderGetAllUsers,
  actionCreateNewUser,
  actionUpdateUser,
} from "../actions/actionAdminPanel";

const initialState = {
  loading: false,
  errors: null,
  users: [],
  revalidate: null,
};
const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const usersSlice = createSliceWithThunks({
  name: "users",
  initialState,
  reducers: (create) => ({
    fetchUsers: create.asyncThunk(
      async (_, { signal, getState }) => {
        const {
          adminReducer: { revalidate },
        } = getState();
        if (revalidate == null || revalidate < Date.now()) {
          const data = await loaderGetAllUsers(signal);
          return data;
        }
        return [];
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
          state.users.push(...action.payload);
        },
      },
    ),
    addNewUser: create.asyncThunk(
      async (user, { signal }) => {
        const data = await actionCreateNewUser(user, signal);
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
          state.users.push(action.payload);
        },
      },
    ),
    updateUser: create.asyncThunk(
      async (details, { signal }) => {
        const data = await actionUpdateUser(details, signal);
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
          state.users = state.users.map((user) => {
            if (user.id == action.payload.id) return action.payload;
            return user;
          });
        },
      },
    ),
  }),
});
export const { fetchUsers, addNewUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

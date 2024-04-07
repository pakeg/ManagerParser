import {
  buildCreateSlice,
  asyncThunkCreator,
  createAction,
} from "@reduxjs/toolkit";

import {
  fetchAllInformation,
  updatePrice,
  addParseLink,
  addPostProductComment,
  getCommentsHistory,
  postChangeShopStatus,
  actionAddProductsToProjects,
  actionDeleteProducts,
  actionExportToExcell,
  actionAddNewShop,
} from "../actions/actionsMainPage";
import { fetchDataCategories } from "./newProductSlice";
import { sortReducer } from "../actions/createdActions";

const initialState = {
  loading: false,
  errors: null,
  data: {},
  comments: {},
  revalidate: null,
  sort: { tableOne: [], tableTwo: [] },
  sortTableTwo: {},
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

          state.data.products[findedProductsIndex] = {
            ...state.data.products[findedProductsIndex],
            price: action.payload.price,
            shops_data: state.data.products[findedProductsIndex].shops_data.map(
              (el) => ({
                ...el,
                product_price: action.payload.price,
              }),
            ),
          };
        },
      },
    ),
    fetchAddParseLink: create.asyncThunk(
      async (data, { signal }) => {
        const res = await addParseLink(data, signal);
        return res;
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
          const { colIndex, productId, shopId, date, link, parsed_price } =
            action.payload;

          state.data.products[colIndex] = {
            ...state.data.products[colIndex],
            count: state.data.products[colIndex].count + 1,
            shops_data: [
              ...state.data.products[colIndex].shops_data,
              {
                product_id: productId,
                shop: { id: shopId },
                product_price: state.data.products[colIndex].price,
                date,
                link: link,
                parsed_price,
              },
            ],
          };
        },
      },
    ),
    fetchAddProductComment: create.asyncThunk(
      async (data, { signal }) => {
        const res = await addPostProductComment(data, signal);
        return res;
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
          if (action.payload) {
            const { parsed_product_id } = action.payload;
            if (Object.hasOwn(state.comments, parsed_product_id)) {
              state.comments[parsed_product_id].push(action.payload.comment);
            }
          }
          return;
        },
      },
    ),
    fetchGetCommentsHistory: create.asyncThunk(
      async (id, { signal }) => {
        const res = await getCommentsHistory(id, signal);
        return res;
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
          state.comments[action.payload.id] = action.payload.comments;
        },
      },
    ),
    fetchChangeShopStatus: create.asyncThunk(
      async (data, { signal }) => {
        const res = await postChangeShopStatus(data, signal);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          if (!Array.isArray(payload)) {
            state.data.shops = state.data.shops.map((el) => {
              return el.id === payload.id
                ? { ...el, active_status: payload.active_status }
                : el;
            });
          } else {
            state.data.shops = state.data.shops.map((el) => {
              const find = payload.find((statusShop) => statusShop.id == el.id);
              return find ? { ...el, active_status: find.active_status } : el;
            });
          }
        },
      },
    ),
    fetchAddProductsToProjects: create.asyncThunk(
      async (data, { signal }) => {
        const res = await actionAddProductsToProjects(data, signal);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          for (let c in payload) {
            const productIndex = state.data.products.findIndex(
              (product) => product.id == c,
            );
            state.data.products[productIndex].projects_id.push(...payload[c]);
          }
        },
      },
    ),
    fetchDeleteProducts: create.asyncThunk(
      async (data, { signal }) => {
        const res = await actionDeleteProducts(data, signal);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          for (let c of payload) {
            const productIndex = state.data.products.findIndex(
              (product) => product.id == c,
            );
            state.data.products.splice(productIndex, 1);
          }
        },
      },
    ),
    fetchExportToExcell: create.asyncThunk(
      async (data, { signal, getState }) => {
        const {
          mainPageReducer: {
            data: { products },
          },
        } = getState();
        // data = products.filter((product) => data.includes(product.id));
        data = products.reduce((acc, product) => {
          if (data.includes(product.id)) {
            acc.push({
              part_number: product.part_number,
              title: product.title,
              purchase: product.purchase,
              price: product.price,
            });
          }
          return acc;
        }, []);
        const res = await actionExportToExcell(data, signal);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          const a = document.createElement("a");
          a.href = payload;
          a.download = "products.xlsx";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(payload);
          document.body.removeChild(a);
        },
      },
    ),
    fetchAddNewShop: create.asyncThunk(
      async (data, { signal }) => {
        const res = await actionAddNewShop(data, signal);
        return res;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          if (typeof payload.msg === "undefined") {
            state.data.shops.push(payload);
            return;
          }
          alert(payload.msg);
        },
      },
    ),
    setSort: sortReducer(create),
    _setSortTableTwo: create.reducer(
      (state, { payload: { product_id, sortIndex } }) => {
        if (
          state.sortTableTwo.sortIndex !== sortIndex ||
          state.sortTableTwo.product_id !== product_id
        ) {
          state.sortTableTwo = { product_id, sortIndex };
          return;
        }
        state.sortTableTwo = {};
      },
    ),
    middlewareSort: create.asyncThunk(
      async ({ product_id, sortIndex, properties, table }, { dispatch }) => {
        const actionSetSort = createAction("mainPage/setSort");
        const actionSetSortTableTwo = createAction("mainPage/_setSortTableTwo");
        dispatch(actionSetSortTableTwo({ product_id, sortIndex }));
        dispatch(actionSetSort({ properties, sortIndex, table }));
        return;
      },
    ),
    setFiltersReducer: create.reducer(
      (state, { payload: { properties, filters } }) => {
        if (filters.length === 0) {
          state.filters[properties] = [];
          return;
        }
        state.filters = { ...state.filters, [properties]: filters };
      },
    ),
    setSearchReducer: create.reducer(
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

export const {
  fetchGeneralData,
  fetchUpdatePrice,
  fetchAddParseLink,
  fetchAddProductComment,
  fetchGetCommentsHistory,
  fetchChangeShopStatus,
  fetchAddProductsToProjects,
  fetchDeleteProducts,
  fetchExportToExcell,
  fetchAddNewShop,
  setFiltersReducer,
  setSearchReducer,
  middlewareSort,
} = mainPageSlice.actions;
export default mainPageSlice.reducer;

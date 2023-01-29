import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  byStock: false,
  byFastDelivery: false,
  sortByPrice: "",
  bySearchQuery: "",
};

export const ProductFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterByStock: (state) => {
      state.byStock = !state.byStock;
    },
    filterbyDeliveryStatus: (state) => {
      state.byFastDelivery = !state.byFastDelivery;
    },
    filterByPrice: (state, action) => {
      state.sortByPrice = action.payload;
    },
    filterBySearchQuery: (state, action) => {
      state.bySearchQuery = action.payload;
    },
    resetFilters: (state) => {
      return (state = {
        byStock: false,
        byFastDelivery: false,
        sortByPrice: "",
        bySearchQuery: "",
      });
    },
  },
});

export const {
  filterByStock,
  filterbyDeliveryStatus,
  filterByPrice,
  filterBySearchQuery,
  resetFilters,
} = ProductFilterSlice.actions;

export default ProductFilterSlice.reducer;

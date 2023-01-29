import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/product/ProductSlice";
import ProductfilterReducer from "../features/product/ProductFilterSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    filterProduct: ProductfilterReducer,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

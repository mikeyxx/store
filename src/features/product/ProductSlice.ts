import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "../../components/data";
import { Data } from "../../components/DataType";

interface CartState {
  id: number;
  name: string;
  price: number;
  img: string;
  inStock: number;
  fastDelivery: boolean;
  desc: string;
  qty: number;
}

interface ProductState {
  products: Data[];
  pdp: Data[];
  cart: CartState[];
  slideIn: boolean;
}

const items = localStorage.getItem("item");

const initialState: ProductState = {
  products: data,
  pdp: [],
  cart: items ? JSON.parse(items) : [],
  slideIn: false,
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItemToPdp: (state, action: PayloadAction<Data>) => {
      if (state.pdp.some((product) => product.id === action.payload.id)) {
        return;
      } else {
        state.pdp.push(action.payload);
      }
    },
    addItemToCart: (state, action: PayloadAction<CartState>) => {
      state.cart.push(action.payload);
    },
    toggleSideBar: (state) => {
      state.slideIn = !state.slideIn;
    },
    incrementCartItemQty: (state, action) => {
      state.cart.map((item) =>
        item.id === action.payload.id ? (item.qty += 1) : item.qty
      );
    },
    decrementCartItemQty: (state, action) => {
      state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.qty === 0) {
            return;
          }
          item.qty -= 1;
        }
      });
    },
    deleteItemInCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  addItemToPdp,
  addItemToCart,
  toggleSideBar,
  incrementCartItemQty,
  decrementCartItemQty,
  deleteItemInCart,
} = ProductSlice.actions;

export default ProductSlice.reducer;

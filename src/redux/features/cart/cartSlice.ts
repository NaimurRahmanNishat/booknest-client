import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  products: Product[];
  selectedItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
};

const calculateCartTotals = (products: Product[]) => {
  const selectedItems: number = products.reduce((total, product) => total + product.quantity, 0);
  const totalPrice: number = products.reduce((total, product) => total + product.quantity * product.price, 0);

  return { selectedItems, totalPrice };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      const totals = calculateCartTotals(state.products);
      state.selectedItems = totals.selectedItems;
      state.totalPrice = totals.totalPrice;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.products.find((product) => product._id === action.payload);
      if (item) {
        item.quantity += 1;
        const totals = calculateCartTotals(state.products);
        state.selectedItems = totals.selectedItems;
        state.totalPrice = totals.totalPrice;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.products.find((p) => p._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const totals = calculateCartTotals(state.products);
        state.selectedItems = totals.selectedItems;
        state.totalPrice = totals.totalPrice;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      const totals = calculateCartTotals(state.products);
      state.selectedItems = totals.selectedItems;
      state.totalPrice = totals.totalPrice;
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartApi, getCartApi } from "@/lib/api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const data = await getCartApi();
  return data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }) => {
  const data = await addToCartApi(productId, quantity);
  return data.item;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existing = state.items.find(i => i.product_id === newItem.product_id);
        if (existing) {
          existing.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      });
  },
});

export default cartSlice.reducer;

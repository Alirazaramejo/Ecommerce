import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItem: [],
  totalAmount: 0,
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItem.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItem.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(newItem.price);
      }
      state.totalAmount = state.cartItem.reduce((total, item) => total + Number(item.totalPrice) * Number(item.quantity), 0);
      console.log(state.totalQuantity)
      console.log(state.cartItem)
      console.log(newItem)
    },
    deleteItem: (state, action) => { // Corrected the action name to deleteItem
      const id = action.payload;
      const existingItemIndex = state.cartItem.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.cartItem[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.cartItem.splice(existingItemIndex, 1);
      }
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

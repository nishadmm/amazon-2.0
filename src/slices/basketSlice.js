import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // state.items = state.items.filter((item) => item.id !== action.payload);
      const index = state.items.findIndex((item) => item.id === action.payload);

      const newbasketItems = [...state.items];

      if (index >= 0) {
        newbasketItems.splice(index, 1);
      } else {
        console.warn(`Item with ${action.payload} is not in Your Basket`);
      }

      state.items = newbasketItems;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0 )

export default basketSlice.reducer;
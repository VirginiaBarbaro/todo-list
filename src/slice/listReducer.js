import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const listReducer = createSlice({
  name: "productList",
  initialState: [],
  reducers: {
    addList(state, action) {
      const newList = { id: uuidv4(), ...action.payload };
      return [...state, newList];
    },
    removeList(state, action) {
      const { listId } = action.payload;
      const updatedLists = state.filter((list) => list.id !== listId);
      return (state = updatedLists);
    },
    addProduct(state, action) {
      const findList = state.find((list) => action.payload.listId === list.id);
      findList.products.push(action.payload);
    },
    removeProduct(state, action) {
      state.map((list) => {
        if (action.payload.listId === list.id) {
          list.products = list.products.filter(
            (product) => product.productId !== action.payload.productId
          );
        }
        return list;
      });
    },
    toggleProduct(state, action) {
      const selectedList = state.find(
        (list) => action.payload.listId === list.id
      );
      const selectedProduct = selectedList.products.find(
        (product) => action.payload.productId === product.productId
      );
      selectedProduct.completed = !selectedProduct.completed;
    },
  },
});

export const { addProduct, removeProduct, toggleProduct, addList, removeList } =
  listReducer.actions;
export default listReducer.reducer;

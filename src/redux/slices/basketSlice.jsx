import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products: getBasketFromStorage(),
  drawerState:false,
  totalAmount:0
};
const writeFromToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};



export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct =
        state.products &&
        state.products.find((product) => product.id === action.payload.id);
        if(findProduct){
            
            const extractedProducts = state.products.filter((product) => product.id != action.payload.id);
            findProduct.count += action.payload.count;
            state.products = [...extractedProducts, findProduct]
            writeFromToStorage(state.products)
        }else {
            state.products = [...state.products, action.payload];
            writeFromToStorage(state.products)
        }
    },
    drawerList : (state)=>{
        state.drawerState = !state.drawerState
    },
    calculateBasket: (state)=>{
        state.totalAmount = 0;
        state.products && state.products.map((product) =>{
            state.totalAmount += product.price * product.count
        })
    },
    removeFromBasket: (state, action) => {
      // id'ye göre ürünü silme
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      // LocalStorage'ı güncelleme
      writeFromToStorage(state.products);
    },

  },
});
// Action creators are generated for each case reducer function
export const {addToBasket, drawerList, calculateBasket, removeFromBasket} = basketSlice.actions;

export default basketSlice.reducer;

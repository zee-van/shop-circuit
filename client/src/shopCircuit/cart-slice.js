import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItemToCart (state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(!existingItem){
                state.totalQuantity++;
                state.items.push(newItem)
                state.totalPrice = parseInt(state.totalPrice) + parseInt(newItem.cart.price);
            }
        },
        removeItemFromCart (state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id)
            if(existingItem){
                state.totalQuantity--;
                state.totalPrice = parseInt(state.totalPrice) - parseInt(existingItem.cart.price);
                state.items = state.items.filter(item => item.id !== id)
            }
        },
        completeOrder (state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                existingItem.status = 'Order Complete';
            }
        },
        removeAllItem (state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }
    }
})

// console.log(cartSlice.items)
export const cartActions = cartSlice.actions;
export default cartSlice;
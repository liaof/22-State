import { useReducer } from "react";
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';


export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of 'UPDATE_PRODCUTS', return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                // this is a new object with a copy of the state argument (done with the ... operator) a products key with 
                // the value of a new array comprised of the action.products elements
                ...state,
                products: [...action.products]//keep all other values of the action object, but update the products value with the action's product array
            };
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]//remember to include the other items already in the cart(state.cart) before you add the new item, otherwise you just overwrite 
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            }
        
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                // map() a new array instead of updating the existing state.cart array to create a new array, 
                // because individual state should be treated as inmutable
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        // if it's none of these actions, do not update state all and keep things the same!
        default:
            return state;
    }
};
// used to initialze the global state object, and also provides functionality for updating state by automatically running it through reducer()
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};
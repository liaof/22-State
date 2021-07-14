// Updates Products
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// UPDATE_CATEGORIES takes the list of categories retrieved from the server by Apolo and stores it in a global state
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// connecting piece of data, this can select a category from the UPDATES_CATEGORIES state,
// and a display product for said category, from the list created in the UPDATE_PRODUCTS 
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

// actions performed by the shopping cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';

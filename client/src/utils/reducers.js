import { UPDATE_PRODUCTS,
        UPDATE_CATEGORIES,
        UPDATE_CURRENT_CATEGORY} from "./actions";   
        
import { useReducer} from 'react';


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

        // if it's none of these actions, do not update state all and keep things the same!
        default:
            return state;
    }
};
// used to initialze the global state object, and also provides functionality for updating state by automatically running it through reducer()
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};
// createContext is used to instantiate a new Context object
// useContext is a React hook that allows the usage of the state created from the createContext
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

const StoreContext = createContext();
// Provider is a type of React component we wrap around the app, so the child components can see the state data passed in as props
// Consumer is our means of grabbing and using the data from Provider
const { Provider } = StoreContext;

// StoreProvider acts lik a custom <Provider> componenet here, thats why it accepts ...props as a param
const StoreProvider = ({ value = [], ...props }) => {
    // use useProductReducer() to instantiate the global state
    // state is the most up to date version of the global state object
    // dispatch is the method executed to update the state.
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });
    // use this to confirm it works!
    console.log(state);
    // return the Provider componenet with our state and dispatch function as the 'value' prop, keep other props unaltered
    return <Provider value={[state, dispatch]} {...props} />;
};

// create a custom function(hook) with useContext()
// this custom hook, when executed, retrieves [state, dispatch] from the StoreProvider
// this means that any componenet that has access to StoreProvider can use or update any data in the global state container
const useStoreContext = () => {
    return useContext(StoreContext);
  };


export { StoreProvider, useStoreContext };
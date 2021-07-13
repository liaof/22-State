import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [data, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
    return state.products.filter(product => product.category._id === currentCategory);
  }


  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
// what 
// imediately execute useStoreContext() to retrieve the current global state object and dispath()
// then destructure the relevant data out of the state object
// then implment useEffect() to wait for the useQuery() response. One that happens, the data object will exist so dispatch() gets executed
// we instruct dispatch() that we want the UPDATE_PRODUCTS action, and it should save the array of product data to the global store
// after all that, useStoreContext() executes again, returning the product data used by the componenet


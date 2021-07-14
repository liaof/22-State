import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
        // get the items in the cart
      const cart = await idbPromise('cart', 'get');
      // map the cart items to a new array of produc IDs
      const products = cart.map(item => item._id);
      // add the order to the database with addOrder()
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        // delete the items from the cart once the order has been recorded
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // after 3 seconds on the successpage, redirect to the homepage
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>
          Thank you for your purchase!
        </h2>
        <h2>
          You will now be redirected to the home page
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Success;

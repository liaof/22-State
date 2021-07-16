import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from'../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
// because the useQuery hook is meant to be run when the componenent is rendered, not upon an action like click, we use the useLazyQuery hook
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products:[...cart]});// add cart from cache to global state
        };

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);// state.cart.length is a dependency of this hook, otherwise if state.cart.length=0 and the cache is empty this hook will not stop

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }
    // then Checkout is clicked, this function will loop over the items saved in state.cart and add their ._ids to a new productIds[].
    // QUERY_CHECKOUT will use productIDs[] to generate the Stripe session
    function submitCheckout() {
        const productIds = [];
        state.cart.forEach((item) => {
            for(let i =0; i<item.purchaseQuantity;i++) {
                productIds.push(item._id);
            }
        });
        // lazy call QUERY_CHECKOUT, setting the 'products' variable of the query to the new productIds[]
        getCheckout({
            variables: { products: productIds }
        })
    }
    // this useEffect() Hook is specifically for the Stripe session
    // THIS IS HOW WE REDIRECT TO OUR SUCCESSPAGE AFTER CHECKOUT IN THE STRIPE SESSION
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
    }, [data]);

    // if cartOpen = false, we return the smaller <div> of the minimalized cart
    // clicking on this small cart will toggleCart and set cartOpen = true
    if (!state.cartOpen) {
        return (
          <div className="cart-closed" onClick={toggleCart}>
            <span
              role="img"
              aria-label="trash">🛒</span>
          </div>
        );
    }

    return (
        <div className="cart">
                    <div className="close" onClick={toggleCart}>[close]</div>
                    <h2>Shopping Cart</h2>
                    {state.cart.length ? (
                        <div>
                            {state.cart.map(item => (
                                <CartItem key={item._id} item={item} />
                            ))}
                            <div className="flex-row space-between">
                                <strong>Total: ${calculateTotal()}</strong>
                                {
                                    Auth.loggedIn() ?
                                    <button onClick={submitCheckout}>
                                        Checkout
                                    </button>
                                    :
                                    <span>(log in to check out)</span>
                                }
                            </div>
                        </div>
                    ) : (
                        <h3>
                            <span role="img" aria-label="shocked">
                                😱
                            </span>
                            You haven't added anything to your cart yet!
                        </h3>
                    )}
                </div>
  );
};

export default Cart;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox variant={"warning"}>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            <li className="row mt-5">
              <div className="col-6">Item Information</div>
              <div className="col-4">Item Quantity</div>
              <div className="col-2-original float-center">Item Total</div>
            </li>

            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row mt-5">
                  <div className="col-1-original">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid img-round-corner"
                    />
                  </div>
                  <div className="col-5 float-left">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <br />
                    <spam>${item.price}</spam>
                  </div>

                  <div className="col-2-original">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-2-original">
                    <button
                      type="button"
                      className="delete float-left btn-lg"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="col-2-original float-center">
                    ${item.price * item.qty}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card-checkout card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="checkout block font-color-white"
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

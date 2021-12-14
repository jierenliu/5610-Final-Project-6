import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className={"row ms-5 me-5"}>
      <h1>Thank you for shopping with us. </h1>
      <h1>
        Your Order #
        {order._id.substring(order._id.length - 5, order._id.length)} has been
        successfully placed!
      </h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <div className="card-checkout card-body">
              <h2>Order Items</h2>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div className="col-1-original">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid img-round-corner"
                        />
                      </div>
                      <div className="col-7">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-3-original">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <li className="ms-3 me-3">
              <MessageBox variant="warning">
                Your order will be delivered to{" "}
                <b>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.country}{" "}
                  {order.shippingAddress.postalCode}
                </b>
                , for <b>{order.shippingAddress.fullName}</b>.
                <br />
                <br />
                <spam>
                  Your order will be paid in <b>{order.paymentMethod}</b>.
                </spam>
              </MessageBox>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card-checkout card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

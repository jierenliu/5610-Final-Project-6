import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product-content product-wrap clearfix product-deatil">
          <div className="align-left row">
            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-6">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="prod-image img-thumbnail"
                />
              </div>
            </div>
            <br />

            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-6 ps-3">
              <h1 className="">
                <strong>{product.name}</strong>
                <br />
                <small>
                  Product by&nbsp;&nbsp;
                  <Link to={`/seller/${product.seller._id}`}>
                    {product.seller.seller.name}
                  </Link>
                </small>
              </h1>
              <h2>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </h2>
              <hr />
              <h1 className="price-container text-primary ps-2">
                ${product.price}
                <small>&nbsp;*includes tax</small>
              </h1>
              <div className="certified ps-2">
                <ul>
                  <li>
                    <a>
                      Delivery time<span>7 Working Days</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      Product Status
                      <span>
                        <div>
                          {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </div>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="description description-tabs">
                <h2 class="text-primary">
                  <strong>Product Description</strong>
                </h2>
                <p className="middle-size">{product.description}</p>
              </div>
              <hr />
              <h2 htmlFor="quantitySelect1">Quantity</h2>
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                id="quantitySelect1"
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <span>
                &nbsp;&nbsp;
                <a
                  className="btn btn-primary btn-lg mt-0"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </a>
              </span>
            </div>
          </div>
          <br />
          <hr />
          <div className="ps-1">
            <h1 id="reviews">
              <strong>Reviews</strong>
            </h1>
            {product.reviews.length === 0 && (
              <MessageBox variant={"warning"}>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" " />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <hr />
              <br />
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h1 className="text-primary">Write a customer review</h1>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div>
                      <label />
                      <button className="btn btn-primary btn-lg" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="warning">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductScreen;

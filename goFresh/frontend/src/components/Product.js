import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props;
  return (
    <div className="card align-items-center">
      <div class="d-flex justify-content-between">
        <div class="mt-1 float-center text-success">
          <i class="fas fa-seedling" />
          <small class="ml-1"> {product.category}</small>
        </div>
      </div>
      <div class="text-center">
        <Link to={`/product/${product._id}`}>
          <img
            className="rounded medium pt-3"
            src={product.image}
            alt={product.name}
            width="200"
            height="200"
          />
        </Link>
      </div>
      <div className="text-center">
        <h5>
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
        </h5>{" "}
        <div>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </div>
        <span className="text-success font-weight-bold">${product.price}</span>
      </div>
      <div className="text-center">
        <Link to={`/seller/${product.seller._id}`} className="text-secondary">
          From {product.seller.seller.name}
        </Link>
      </div>
    </div>
  );
}

export default Product;
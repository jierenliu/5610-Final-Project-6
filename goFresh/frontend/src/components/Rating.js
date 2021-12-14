import React from "react";

const Rating = (props) => {
  const { rating, numReviews, caption } = props;
  console.log(rating);
  return (
    <div className="rating">
      <span>
        <i className={rating >= 1 ? "fa fa-heart" : "far fa-heart"} />
      </span>
      <span>
        <i className={rating >= 2 ? "fa fa-heart" : "far fa-heart"} />
      </span>
      <span>
        <i className={rating >= 3 ? "fa fa-heart" : "far fa-heart"} />
      </span>
      <span>
        <i className={rating >= 4 ? "fa fa-heart" : "far fa-heart"} />
      </span>
      <span>
        <i className={rating >= 5 ? "fa fa-heart" : "far fa-heart"} />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>&nbsp;&nbsp;{numReviews + " reviews"}</span>
      )}
    </div>
  );
}

export default Rating; 
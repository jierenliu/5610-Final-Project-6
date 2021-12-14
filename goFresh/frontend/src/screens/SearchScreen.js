import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

const SearchScreen = (props) => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div text-primary>{products.length} Results</div>
          )}
        </span>
        <strong className="custom-badge text-uppercase">
          Sort by{" "}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </strong>
      </div>

      <div className="row top">
        <div className="d-none d-sm-block col-sm-4 col-md-3 col-lg-2">
          <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-light">
            <ul className="list-group flex-column mb-auto">
              <li className="list-group-item list-group-item-action active">
                Aisles
              </li>
              <li className="list-group-item list-group-item-action">
                {loadingCategories ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                ) : (
                  <ul>
                    <li>
                      <Link
                        className={"all" === category ? "active" : ""}
                        to={getFilterUrl({ category: "all" })}
                      >
                        All
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c}>
                        <Link
                          className={c === category ? "active" : ""}
                          to={getFilterUrl({ category: c })}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className="list-group-item list-group-item-action active">
                Price
              </li>
              <li className="list-group-item list-group-item-action">
                {prices.map((p) => (
                  <li key={p.name}>
                    <Link
                      to={getFilterUrl({ min: p.min, max: p.max })}
                      className={
                        `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </li>

              <li className="list-group-item list-group-item-action active">
                Rating
              </li>
              <li className="list-group-item list-group-item-action">
                {ratings.map((r) => (
                  <li key={r.name}>
                    <Link
                      to={getFilterUrl({ rating: r.rating })}
                      className={`${r.rating}` === `${rating}` ? "active" : ""}
                    >
                      <Rating caption={" "} rating={r.rating}></Rating>
                    </Link>
                  </li>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="col-sm-8 col-md-9 col-lg-10">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

            </>
          )}
          
          <ul className="pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className= "page-item "
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;

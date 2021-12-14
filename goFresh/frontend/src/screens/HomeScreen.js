import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row align-left">
          <div className="d-none d-sm-none d-md-block col-md-2">
            <div className="list-group-item active home-navi">
              <strong>Categories</strong>
            </div>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <div key={c} className="list-group-item home-navi">
                  <Link to={`/search/category/${c}`}>{c}</Link>
                </div>
              ))
            )}
          </div>
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <h1>
              <strong>Top Sellers</strong>
            </h1>
            {loadingSellers ? (
              <LoadingBox />
            ) : errorSellers ? (
              <MessageBox variant="danger">{errorSellers}</MessageBox>
            ) : (
              <>
                {sellers.length === 0 && (
                  <MessageBox>No Seller Found</MessageBox>
                )}
                <Carousel showArrows autoPlay showThumbs={false}>
                  {sellers.map((seller) => (
                    <div key={seller._id}>
                      <Link to={`/seller/${seller._id}`}>
                        <div>
                        <img
                          src={seller.seller.logo}
                          alt={seller.seller.name}
                        />
                        </div>
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </>
            )}
            <br />
            <h1>
              <strong>Picked For You</strong>
            </h1>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

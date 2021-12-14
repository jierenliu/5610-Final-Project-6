import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PrivacyScreen from "./screens/PrivacyScreen";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <span className="col-1 left-navi-button">
            <button
              type="button"
              className="open-sidebar me-0 pe-0 ms-0"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" />
            </button>
          </span>
          <div className="col-11 ps-0 nav-top">
            <Navbar
              expand="lg"
              className="bg-primary nav-bar ms-0"
              variant="dark"
            >
              <Container className="ms-0 ps-0">
                <Navbar.Brand href="/" className={"go-fresh"}>
                <i class="fas fa-seedling"></i>
                  Go Fresh
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="toggle-color"
                >
                  <i className="far fa-user toggle-color" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
                  <Nav className="me-auto" />
                  <Nav className="me-auto navi-level-one">
                    <Route
                      render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                      )}
                    />
                  </Nav>
                  <Nav className="navbar-right navi-level-one">
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id="basic-nav-dropdown"
                        className={"navi-level-one"}
                      >
                        <NavDropdown.Item
                          href="/profile"
                          className={"navi-dropdown"}
                        >
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/orderhistory"
                          className={"navi-dropdown"}
                        >
                          Orders
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="#signout"
                          onClick={signoutHandler}
                          className={"navi-dropdown"}
                        >
                          Sign Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <Link to="/signin">Sign In</Link>
                    )}
                    {userInfo && userInfo.isSeller && (
                      <NavDropdown
                        title="Seller"
                        id="seller-dropdown"
                        className={"navi-level-one"}
                      >
                        <NavDropdown.Item
                          href="/productlist/seller"
                          className={"navi-dropdown"}
                        >
                          Products
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/orderlist/seller"
                          className={"navi-dropdown"}
                        >
                          Orders
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown
                        title="Admin"
                        id="admin-dropdown"
                        className={"navi-level-one"}
                      >
                        <NavDropdown.Item
                          href="/dashboard"
                          className={"navi-dropdown"}
                        >
                          Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/productlist"
                          className={"navi-dropdown"}
                        >
                          Products
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/userlist"
                          className={"navi-dropdown"}
                        >
                          Users
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

          <div className="cart bg-success ">
            <Link to="/cart">
              <i className="fa fa-shopping-cart" />
              {cartItems.length >= 0 && (
                <span className="badge badge-size bg-success">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open sider" : ""}>
          <ul>
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close" />
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <PrivateRoute path="/map" component={MapScreen} />
          <div className="container-fluid">
            <div className="row align-top">
              <Route path="/seller/:id" component={SellerScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/product/:id" component={ProductScreen} exact />
              <Route
                path="/product/:id/edit"
                component={ProductEditScreen}
                exact
              />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/shipping" component={ShippingAddressScreen} />
              <Route path="/payment" component={PaymentMethodScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/orderhistory" component={OrderHistoryScreen} />
              <Route
                path="/search/name/:name?"
                component={SearchScreen}
                exact
              />
              <Route
                path="/search/category/:category"
                component={SearchScreen}
                exact
              />
              <Route
                path="/search/category/:category/name/:name"
                component={SearchScreen}
                exact
              />
              <Route
                path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                component={SearchScreen}
                exact
              />
              <Route path="/privacy" component={PrivacyScreen} />
              <PrivateRoute path="/profile" component={ProfileScreen} />
              <PrivateRoute path="/map" component={MapScreen} />
              <AdminRoute
                path="/productlist"
                component={ProductListScreen}
                exact
              />
              <AdminRoute
                path="/productlist/pageNumber/:pageNumber"
                component={ProductListScreen}
                exact
              />
              <AdminRoute path="/userlist" component={UserListScreen} />
              <AdminRoute path="/user/:id/edit" component={UserEditScreen} />

              <AdminRoute path="/dashboard" component={DashboardScreen} />

              <SellerRoute
                path="/productlist/seller"
                component={ProductListScreen}
              />
              <SellerRoute
                path="/orderlist/seller"
                component={OrderListScreen}
              />

              <Route path="/" component={HomeScreen} exact />
            </div>
          </div>
        </main>
        <footer className="row center footer-div">
          {userInfo && !userInfo.isAdmin}
          <Link to="/privacy" className="privacy">Privacy Policy</Link>{" "}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

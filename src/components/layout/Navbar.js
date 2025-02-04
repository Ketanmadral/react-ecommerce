import React, { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Axios from "axios";
import { Outlet, Link, NavLink } from "react-router-dom";

const Navbar = ({sendData}) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);

  const searchProducts = (e) => {
    sendData(e.target.value);
  };

  useEffect(() => {
    Axios.get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSuccess = (response) => {
    const userObject = jwtDecode(response?.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    setUser(userObject);
  };

  const handleError = (error) => {
    console.log("Login Failed: ", error);
  };

  const logOut = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    googleLogout();
  };

  return (
    <React.Fragment>
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container">
          <div className="d-flex flex-wrap w-100">
            <div className="p-2 order-0 order-lg-0 order-md-0 order-sm-0">
              <button
                className="navbar-toggler me-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="p-2 flex-fill order-2 order-lg-1 order-md-1 order-sm-2">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                onChange={searchProducts}
              />
            </div>

            <div className="p-2 ms-auto order-1 order-lg-2 order-md-2 order-sm-1">
              {localStorage.getItem("user") ? (
                <React.Fragment>
                  <button
                    type="button"
                    className="btn btn-dark rounded-pill fw-medium"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
          <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            data-bs-scroll="true"
            style={{ width: "280px" }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                E-Commerce with React
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                {categories.map((category, index) => {
                  return (
                    <React.Fragment key={index}>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-capitalize"
                          to={`/category/${category}`}
                        >
                          {category}
                        </NavLink>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </React.Fragment>
  );
};

export default Navbar;

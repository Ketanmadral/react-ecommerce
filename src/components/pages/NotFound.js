import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <div
        className="d-flex justify-content-center align-items-center align-content-center flex-column not-found"
        style={{ height: "100vh" }}
      >
        <h1>404</h1>
        <p>Page Not Found</p>
        <p>Sorry, the page you're looking for does not exist.</p>{" "}
        <Link to="/" class="btn btn-dark">
          Go to Homepage
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NotFound;

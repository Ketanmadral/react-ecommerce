import React from "react";
import { Rating } from "react-simple-star-rating";

const Card = ({ product }) => {
  return (
    <React.Fragment>
      <div className="card">
        <img
          src={product.image}
          className="card-img-top mx-auto d-block w-75 h-50 my-5"
          alt="product"
        />
        <div className="card-body">
          <p className="card-text small mb-1 text-muted text-capitalize">
            {product.category}
          </p>
          <h5 className="card-title fs-6">{product.title}</h5>
          <div className="d-inline-flex gap-1 align-items-center ">
            <Rating initialValue={product.rating.rate} size={25} />

            <span className="text-muted small">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          <p className="card-text text-dark fw-medium">
            &#8377;{product.price}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../product/Card";
const Category = ({sendData}) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    Axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error);
        console.log(error);
      });
  }, [category]);

  const filteredProducts = products.filter((product) => {
    if (sendData.trim() === "") {
      return true;
    } else if (
      product.title.toLowerCase().includes(sendData.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="py-3">
          <div className="row">
            <div className="col">
              <h2 className="text-capitalize">{category}</h2>

              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam iste commodi esse magni accusamus modi, ratione
                necessitatibus pariatur ducimus ullam? Numquam culpa quod iusto
                soluta optio quia enim dolore sequi.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {loading ? (
                <React.Fragment>
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </React.Fragment>
              ) : errorMessage ? (
                <React.Fragment>
                  <div className="alert alert-danger" role="alert">
                    Error: {errorMessage.message}
                  </div>
                </React.Fragment>
              ) : filteredProducts.length > 0 ? (
                <React.Fragment>
                  <div className="d-flex justify-content-between flex-wrap gap-4">
                    {filteredProducts.map((product) => {
                      return (
                        <React.Fragment key={product.id}>
                          <Card product={product} />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="alert alert-warning" role="alert">
                    No products found.
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;

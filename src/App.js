import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Category from "./components/pages/Category";
import NotFound from "./components/pages/NotFound";

function App() {
  const [searchProduct, setSearchProduct] = useState("");

  const receiveData = (value) => {
    setSearchProduct(value);
  };

  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId="127078917996-2m49dj34kmuact24c7klug9ihao2mj6c.apps.googleusercontent.com">
        <BrowserRouter>
          <Navbar sendData={receiveData} />
          <Routes>
            <Route path="/" element={<Home sendData={searchProduct} />} />
            <Route
              path="/category/:category"
              element={<Category sendData={searchProduct} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </React.Fragment>
  );
}

export default App;

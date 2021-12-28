import React, { useEffect, useState } from "react";
// import Data from "./Data";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [getProducts, setProductsData] = useState([]);
  // const [getcategory, setcategory] = useState([]);
  const [getcategory, setCategory] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getcategoryData();
  }, []);
  const getAllProducts = () => {
    const url = "https://aveosoft-react-assignment.herokuapp.com/products";
    axios.get(`${url}`).then((res) => {
      // console.log(res["data"]);
      setProductsData(res["data"]);
      // setAllProductsList(res["data"]);
    });
  };

  const getcategoryData = () => {
    const url = "https://aveosoft-react-assignment.herokuapp.com/categories";
    axios.get(`${url}`).then((res) => {
      console.log(res["data"]);
      setCategory(res["data"]);
      // setAllProductsList(res["data"]);
    });
  };
  // const category = getcategory.map((data) => {
  //   return [data.id, data.id] = ["Laptop ", "Mobile"]
  // });
  // const byCategory = (user, getcategory) => {
  //   if (getcategory) {
  //     return user.categoryId === getcategory;
  //   } else return user;
  // };
  // console.log(getProducts.filter((user) => byCategory(user, getcategory)));
  // const productsList = (getProducts, getcategory) => {
  //   return getProducts.filter((user) => byCategory(user, getcategory));
  //   console.log(getProducts);
  // };

  const products = getProducts.map((product) => {
    return (
      <div className="col-lg-4 col-md-2 col-12 mt-3" key={product.id}>
        <div className="card" id={product.id}>
          <div className="card-body">
            <h3 className="p-title">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="card-text">
              <small className="text-muted">{product.category}</small>
            </p>
            <p className="card-text">{product.price}</p>
            <p className="card-text">{product.price}</p>
            <p className="card-text">{product.description}</p>
          </div>
        </div>
      </div>
    );
  });

  const selectFilter = (e) => {
    var getValue = e.target.options[e.target.selectedIndex].id;
    console.log(e.target.options[e.target.selectedIndex].id);
    console.log(getValue);

    if (e.target.value === "All") {
      getAllProducts();
      console.log("all");
    } else {
      let newData = [];
      console.log(
        getProducts.filter((res) => e.target.value === res.categoryId)
      );
      newData = getProducts.filter((res) => getValue === res.categoryId);
      console.log(newData);
      setProductsData(newData);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Products Page</h1>
          <select
            className="form-select"
            aria-label="Default select example"
            value="{getcategory}"
            onChange={selectFilter.bind()}
          >
            <option value="All" id="">
              All
            </option>
            <option value="Laptop" id="0">
              Laptop
            </option>
            <option value="Mobile" id="1">
              Mobile
            </option>
          </select>

          {products}
        </div>
      </div>
    </>
  );
};

export default Products;

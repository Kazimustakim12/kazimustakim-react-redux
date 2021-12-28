import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [getProducts, setProductsData] = useState([]);
  const [filer, setfilter] = useState([]);

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
      setfilter(res["data"]);
    });
  };

  const getcategoryData = () => {
    const url = "https://aveosoft-react-assignment.herokuapp.com/categories";
    axios.get(`${url}`).then((res) => {
      console.log(res["data"]);
      setCategory(res["data"]);
    });
  };

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
            <p className="card-text"> Price ${product.price}</p>
            <p className="card-text">
              {" "}
              {product.categoryId == 0 ? "Laptop" : "Mobile"}
            </p>
            <p className="card-text">{product.description}</p>
          </div>
        </div>
      </div>
    );
  });

  const selectFilter = (e) => {
    console.log(e.target.options[e.target.selectedIndex].id);
    // console.log(e.target.value)s;

    let selectedValue = parseInt(e.target.options[e.target.selectedIndex].id);

    if (e.target.value === "All") {
      getAllProducts();
      console.log("all");
    } else {
      let newData = [];
      // newData = getProducts.find(
      //   (res) => e.target.options[e.target.selectedIndex].id === res.categoryId
      // );
      newData = filer.filter((res) => selectedValue === res.categoryId);
      // newData = getcategory.filter((res) => getValue === res.categoryId);
      console.log(newData);
      setProductsData(newData);
    }
  };

  // wait

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Products Page</h1>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={selectFilter.bind()}
          >
            <option value="" id="">
              Filter By Category
            </option>
            <option value="All" id="3">
              All
            </option>
            <option value="laptops" id="0">
              Laptop
            </option>
            <option value="Mobiles" id="1">
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

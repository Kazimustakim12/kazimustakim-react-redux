import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function ProductDetail() {
  const [getProductDetail, setProductsDetialData] = useState([]);

  const { productId } = useParams();
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    const url = `https://aveosoft-react-assignment.herokuapp.com/products/${productId}`;
    axios.get(`${url}`).then((res) => {
      console.log(res["data"]);
      setProductsDetialData(res["data"]);
    });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{getProductDetail.name}</h5>
              <p>{getProductDetail.price}</p>
              <p className="card-text">{getProductDetail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;

import React, { useState, useEffect } from "react";
import dummyImage from "../../../Assets/Images/download.jpeg";
import wishList from "../../../Assets/Images/heart.jpg";
import wishedList from "../../../Assets/Images/wishedList.jpg";
import "./Home.css";
import { getApi } from "../../Services/Axios";
import Loader from "../../../Utils/Loder/Loder";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeartSelected, setIsHeartSelected] = useState(false);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `https://catchyfiveapi.appxes-erp.in/Product/GetAllWithImage?OrganizationId=3&pageNo=${currentPage}&pageSize=${pageSize}`;
      const response = await getApi(url, null);
      setProducts(response?.data?.Result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = (product) => {
    console.log(product, "product");
    const existingProductIndex = cart.findIndex(
      (item) => item.ProductCode === product.ProductCode
    );

    if (existingProductIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
      console.log(...cart, "cart");
    } else {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    }

    setTotalPrice(totalPrice + product.Price);
    setTotalItems(totalItems + 1);
  };
  const removeFromCart = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.code === product.code);
    if (index !== -1) {
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      } else {
        updatedCart.splice(index, 1);
      }
      setCart(updatedCart);
      setTotalPrice(totalPrice - product.price);
      setTotalItems(totalItems - 1);
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleOnclick = () => {
    Navigate("/cart", { state: { cart } });
  };

  const changeImage = () => {
    setIsHeartSelected(!isHeartSelected);
  };

  console.log("cart", cart);
  return (
    <div className="container-fluid bg-gray">
      <div className="container pt-3">
        <h2>Product Listing</h2>
        <div className="d-flex justify-content-end p-2">
          <button
            onClick={() => {
              handleOnclick();
            }}
          >
            Go to cart
          </button>
        </div>
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.ProductCode} className="product-item">
                <img
                  src={isHeartSelected ? wishedList : wishList}
                  alt="heart"
                  className="heart"
                  onClick={() => changeImage()}
                />
                <img
                  className="product-image"
                  src={product.ProductImagePath || dummyImage}
                  alt={product.name}
                />
                <p>{product.name}</p>
                {cart.some(
                  (item) => item.ProductCode === product.ProductCode
                ) ? (
                  <div className="add-remove-btns d-flex justify-content-evenly align-items-center mt-3 gap-3">
                    <button onClick={() => removeFromCart(product)}>-</button>
                    <span>
                      {
                        cart.find(
                          (item) => item.ProductCode === product.ProductCode
                        ).quantity
                      }
                    </span>
                    <button onClick={() => addToCart(product)}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(product)} className="mt-3">
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="pagination">
          {currentPage > 1 && (
            <div className="Pagination-btn" onClick={prevPage}>
              Prev
            </div>
          )}
          {products.length === pageSize && (
            <div className="Pagination-btn" onClick={nextPage}>
              Next
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

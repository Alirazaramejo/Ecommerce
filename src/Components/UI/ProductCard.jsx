// ProductCard.js
import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/Slices/cartSlice";
import { Col } from "reactstrap";
import "../../Styles/Product_Card.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({ item }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl,
    }));
    toast.success("Product added successfully");
  };

  return (
    <Col lg="3" md="4">
      <div className="product__item">
        <div className="product__img">
          <motion.img whileTap={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/product/${item.id}`}>
              {item.productName}
            </Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__Card_bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCartHandler}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
}

export default ProductCard;

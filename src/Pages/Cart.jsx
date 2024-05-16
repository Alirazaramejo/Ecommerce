import React from "react";
import "../Styles/Cart.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { cartActions } from "../redux/Slices/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItem);
  console.log(cartItems);
  const TotalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <Container>
        <Row>
          <Col lg="9">
            {cartItems.length === 0 ? (
              <h2 className="fs-4 text-center">No items in the cart</h2>
            ) : (
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <Tr item={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            )}
          </Col>
          <Col lg="3">
            <div>
              <h6 className="d-flex align-items-center justify-content-center">
                Subtotal
              </h6>
              <span className="fs-4 fw-bold">${TotalAmount}</span>
            </div>
            <p className="fs-6 mt-2 ">
              Shipping and taxes calculated at checkout
            </p>
            <div>
              <Link to="/shop">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="buy__btn w-100"
                >
                  Continue Shopping
                </motion.button>
              </Link>

              <Link to="/checkout">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="buy__btn w-100 mb-3"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr key={item.id}>
      <td>
        <img src={item.imgUrl} alt={item.productName} />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-delete-bin-6-line"
          onClick={deleteHandler}
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;

// ProductDetails.js
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../Styles/ProductDetails.css";
import { motion } from "framer-motion";
import ProductListing from "../Components/UI/ProductListing";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cartActions } from "../redux/Slices/cartSlice";
import { db, doc, getDoc } from "../Firebase/firebaseConfig";
import UserGetData from "../custom-hook/UserGetData";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [activeTab, setActiveTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const reviewUser = useRef("");
  const reviewMessage = useRef("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: products } = UserGetData("products");

  useEffect(() => {
    const docRef = doc(db, "products", id);
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };
    getProduct();
  }, [id]);

  const { imgUrl, category, productName, price, description, shortDesc } =
    product || {};
  const relatedProducts = products?.filter(
    (item) => item.category === category
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewMessageText = reviewMessage.current.value;
    const reviewData = {
      userName: reviewUserName,
      text: reviewMessageText,
      rating: rating,
    };
    console.log(reviewData);
    toast.success("Review Submitted Successfully");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product Added Successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName} />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill" />
                    </span>
                    <span>
                      <i className="ri-star-s-fill" />
                    </span>
                    <span>
                      <i className="ri-star-s-fill" />
                    </span>
                    <span>
                      <i className="ri-star-s-fill" />
                    </span>
                    <span>
                      <i className="ri-star-half-s-line" />
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${activeTab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setActiveTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${activeTab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setActiveTab("rev")}
                >
                  Reviews
                </h6>
              </div>
              {activeTab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <div className="review__form">
                      <h4>Leave Your Experience</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                          />
                        </div>
                        <div className="form__group d-flex align-content-center gap-5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} onClick={() => setRating(i + 1)}>
                              {i + 1}
                              <i className="ri-star-s-fill" />
                            </span>
                          ))}
                        </div>
                        <div className="form__group">
                          <textarea
                            type="text"
                            placeholder="Review Message..."
                            ref={reviewMessage}
                          />
                        </div>
                        <button type="submit" className="buy__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductListing data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default ProductDetails;

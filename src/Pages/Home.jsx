import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import heroImage from "../assets/images/hero-img.png";
import "../Styles/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Service from "../Service/Service";
import Helmet from "../Components/Helmet/Helmet";
import ProductListing from "../Components/UI/ProductListing";
import Counter from "../assets/images/counter-timer-img.png";
import Clock from "../Components/UI/Clock";
import UserGetData from "../custom-hook/UserGetData";

function Home() {
  const { data: Product, loading } = UserGetData("products");

  const [trendingProduct, setTrendingProduct] = useState([]);
  const [bestSalesProduct, setBestSalesProduct] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProduct, setPopularProduct] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (Product && Product.length > 0) {
      setTrendingProduct(Product.filter((item) => item.category === "chair"));
      setBestSalesProduct(Product.filter((item) => item.category === "sofa"));
      setMobileProducts(Product.filter((item) => item.category === "mobile"));
      setWirelessProducts(
        Product.filter((item) => item.category === "wireless")
      );
      setPopularProduct(Product.filter((item) => item.category === "watch"));
    }
  }, [Product]);

  return (
    <Helmet title="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__contact">
                <p className="hero__subtitle">Trending Product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam suscipit, nisl sit amet suscipit ultrices, erat turpis
                  posuere turpis, eget bibendum nunc nisl id odio.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop" className="buy__btn">
                    Shop Now
                  </Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImage} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Service />
      <section className="trending__product">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductListing data={trendingProduct} />
            )}
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductListing data={bestSalesProduct} />
            )}
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality ArmChair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end">
              <img src={Counter} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductListing data={mobileProducts} />
            )}
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductListing data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <ProductListing data={popularProduct} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Home;

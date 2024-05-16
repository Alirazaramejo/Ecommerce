import React, { useRef, useEffect } from "react";
import "./Header.css";

import Logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "../../Firebase/firebaseConfig";
import { toast } from "react-toastify";
const nav__links = [
  {
    title: "Home",
    path: "/home",
  },
  {
    title: "Shop",
    path: "/shop",
  },
  {
    title: "Cart",
    path: "/cart",
  },
];

function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const ProfileActionRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const menuRef = useRef(null);
  const stickyHeaderFun = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const navigateToCart = () => {
    navigate("/cart");
  };
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser);
  useEffect(() => {
    stickyHeaderFun();
    return () => window.removeEventListener("scroll", stickyHeaderFun);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const toggleProfileAction = () =>
    ProfileActionRef.current.classList.toggle("show__profileAction");
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        toast.success("SignOut Successfully");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={Logo} alt="Logo" />
              <div className="LogoChild">
                <h1>MultiMart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((nav, index) => (
                  <li key={index}>
                    <NavLink to={nav.path} activeClassName="nav__active">
                      {nav.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_icons">
              <span className="fav_icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.user.photoURL : userIcon}
                  alt="User"
                  onClick={toggleProfileAction}
                />
                <div
                  className="profile__action"
                  ref={ProfileActionRef}
                  onClick={toggleProfileAction}
                >
                  {currentUser ? (
                    <span onClick={signOutUser}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column gap-1 sign">
                      <Link to="/singUp">SingUp</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

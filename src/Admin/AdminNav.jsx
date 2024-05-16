import React from "react";
import { Container, Row } from "reactstrap";
import "../Styles/admin-nav.css";
import { NavLink } from "react-router-dom";
const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "dashboard/orders",
  },
  {
    display: "users",
    path: "dashboard/users",
  },
];

function AdminNav() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <header className="admin__header">
        <Container>
          <div className="admin__nav-top">
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>MultiMart</h2>
              </div>
              <div className="search__Box">
                <input type="text" placeholder="Search...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                {user && user.user && <img src={user.user.photoURL} alt="" />}
              </div>
            </div>
          </div>
        </Container>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => {
                  return (
                    <li key={index} className="admin__menu-item">
                      <NavLink to={item.path} className={navClass=> navClass.isActive ? "active__admin-menu" : ""}>
                        {item.display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AdminNav;

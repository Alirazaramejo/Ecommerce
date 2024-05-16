import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "../Styles/Dashboard.css";
import UserGetData from '../custom-hook/UserGetData';
function Dashboard() {
  const { data: users, loading } = UserGetData('users');
  const { data: products } = UserGetData('products');
  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-3">
            <div className="revenue-box">
              <h5>Total Sales</h5>
              <span>$333</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="order-box">
              <h5>Order</h5>
              <span>$333</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="product-box">
              <h5>Total Product</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="users-box">
              <h5>Total Users</h5>
              <span> {users.length} </span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Dashboard;

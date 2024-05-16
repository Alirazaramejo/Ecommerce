import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../Styles/checkOut.css";
import { useSelector } from "react-redux";

function CheckOut() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="CheckOut">
      <CommonSection title="CheckOut" />
      <Container>
        <Row>
          <Col lg="8">
            <h6 className="mb-4 fw-bold ">Billing Information</h6>

            <Form className="billing__form">
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your Name" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your Email" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="number" placeholder="Enter Your Phone" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your Address" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your City" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your Country" />
              </FormGroup>
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter Your Postal Code" />
              </FormGroup>
            </Form>
          </Col>

          <Col lg="4">
            <div className="checkout__cart mt-3">
              <h6>
                Total Qty : <span>{totalQuantity} items</span>
              </h6>
              <h6>
                Subtotal : <span>${totalAmount} </span>
              </h6>
              <h6>
                <span>
                  Shipping : <br /> Free Shipping
                </span>{" "}
                <span>$0 </span>
              </h6>

              <h4>
                Total Cost : <span>${totalAmount} </span>
              </h4>
              <button className="buy__btn auth__btn w-100">CheckOut</button>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

export default CheckOut;

import React, { useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../Styles/Login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { auth, signInWithEmailAndPassword } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const users = localStorage.setItem(
        "user",
        JSON.stringify(userCredentials)
      );
      const user = userCredentials.user;
      console.log(user);
      setLoading(false);
      navigate("/checkout");
      toast.success("Successfully Login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <Container>
        <Row className="mt-5">
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Login</h3>
            {loading ? (
              <Col lg="12" className="text-center">
                <h6 className="fw-bold">Loading...</h6>
              </Col>
            ) : (
              <Form className="auth__form" onSubmit={signIn}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <button type="submit" className="buy__btn auth__btn">
                  Login
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/singUp">Create a new account</Link>
                </p>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

export default Login;

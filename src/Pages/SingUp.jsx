import React, { useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../Styles/Login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  firebaseStorage,
  uploadBytesResumable,
  getDownloadURL,
  doc,
  setDoc,
  storage,
  db,
} from "../Firebase/firebaseConfig";

import { toast } from "react-toastify";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    // handle image change here
    const file = e.target.files[0];
    setImage(file);
  };
  const singUp = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !image) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      const storageRef = firebaseStorage(
        storage,
        `images/${Date.now() + username}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },

        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              email: user.email,
              displayName: username,
              photoURL: downloadURL,
            });
            toast.success("User created successfully");
            navigate("/login");
            setLoading(false);
            setUsername("");
            setEmail("");
            setPassword("");
            setImage(null);
          });
        }
      );
     
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Sign Up">
      <Container>
        <Row className="mt-5">
          {loading ? (
            <Col lg="12" className="text-center">
              <h6 className="fw-bold">Loading...</h6>
            </Col>
          ) : (
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Sign Up</h3>
              <Form className="auth__form" onSubmit={singUp}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
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
                <FormGroup className="form__group">
                  <input type="file" onChange={handleImageChange} />
                  {image ? null : (
                    <p className="text-white">No file selected</p>
                  )}
                </FormGroup>
                <button type="submit" className="buy__btn auth__btn">
                  Sign Up
                </button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </Helmet>
  );
}

export default SignUp;

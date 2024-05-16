import React, { useState } from "react";
import { Container, Row, Form, FormGroup, Col } from "reactstrap";
import "../Styles/add-product.css";
import { toast } from "react-toastify";
import {
  db,
  storage,
  firebaseStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productShortDescription, setProductShortDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "product-name":
        setProductName(value);
        break;
      case "product-description":
        setProductDescription(value);
        break;
      case "product-short-description":
        setProductShortDescription(value);
        break;
      case "product-price":
        setProductPrice(value);
        break;
      case "product-category":
        setProductCategory(value);
        break;
      case "product-image":
        setProductImage(event.target.files[0]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productName || !productDescription || !productShortDescription || !productPrice || !productCategory || !productImage) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);

    try {
      const storageRef = firebaseStorage(
        storage,
        `productImages/${Date.now() + productImage.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImage);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toast.error("Error uploading image: " + error.message);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await addProductToDatabase(downloadURL);
              toast.success("Product Added Successfully");
              resetForm();
            })
            .catch((error) => {
              toast.error("Error getting download URL: " + error.message);
              setLoading(false);
            });
        }
      );
    } catch (error) {
      toast.error("Error adding product: " + error.message);
      setLoading(false);
    }
  };

  const addProductToDatabase = async (downloadURL) => {
    const product = {
      productName: productName,
      shortDesc: productShortDescription,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      imgUrl: downloadURL,
    };

    const docRef = collection(db, "products");
    await addDoc(docRef, product);
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductShortDescription("");
    setProductPrice("");
    setProductCategory("");
    setProductImage(null);
    setLoading(false);
  };

  return (
    <section className="add-product-section">
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5 fs-bold">Loading...</h4>
            ) : (
              <div className="admin__content">
                <div className="admin__content-header">
                  <h2>Add Product</h2>
                </div>
                <div className="admin__content-body">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <label htmlFor="product-name">Product Title</label>
                      <input
                        type="text"
                        name="product-name"
                        id="product-name"
                        value={productName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="product-description">Description</label>
                      <textarea
                        name="product-description"
                        id="product-description"
                        value={productDescription}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="product-short-description">
                        Short Description
                      </label>
                      <textarea
                        name="product-short-description"
                        id="product-short-description"
                        value={productShortDescription}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="product-price">Price ($)</label>
                      <input
                        type="number"
                        name="product-price"
                        id="product-price"
                        value={productPrice}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="product-category">Category</label>
                      <select
                        name="product-category"
                        id="product-category"
                        value={productCategory}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="chair">Chair</option>
                        <option value="wireless">Wireless</option>
                        <option value="mobile">Mobile</option>
                        <option value="sofa">Sofa</option>
                      </select>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="product-image">Product Image</label>
                      <input
                        type="file"
                        name="product-image"
                        id="product-image"
                        accept="image/*"
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <button type="submit" disabled={loading}>
                      Add Product
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AddProduct;

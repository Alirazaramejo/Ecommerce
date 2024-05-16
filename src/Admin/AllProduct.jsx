import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../Styles/AllProduct.css'; // Import the CSS file
import UserGetData from '../custom-hook/UserGetData';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import EditProductModal from './EditProductModal';
import {toast} from 'react-toastify';
function AllProduct() {
  const { data: productsData, loading, refreshData } = UserGetData('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted successfully');
      refreshData();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    toggleModal();
  };

  const renderTable = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="5" className="text-center py-5">
            <h3>Loading...</h3>
          </td>
        </tr>
      );
    }
    return productsData.map((product) => (
      <tr key={product.id}>
        <td data-label="Image">
          <img src={product.imgUrl} alt={product.title} className="product-image" />
        </td>
        <td data-label="Title">{product.title}</td>
        <td data-label="Category">{product.category}</td>
        <td data-label="Price">${product.price}</td>
        <td data-label="Actions">
          <button className="edit-button" onClick={() => editProduct(product)}>Edit</button>
          <button onClick={() => deleteProduct(product.id)} className="delete-button">Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <section className="all-product-section">
      <Container>
        <Row>
          <Col lg="12">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderTable()}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
      {selectedProduct && (
        <EditProductModal
          isOpen={modalOpen}
          toggle={toggleModal}
          product={selectedProduct}
          refreshData={refreshData}
        />
      )}
    </section>
  );
}

export default AllProduct;

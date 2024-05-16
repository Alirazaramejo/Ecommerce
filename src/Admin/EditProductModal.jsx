import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

const EditProductModal = ({ isOpen, toggle, product, refreshData }) => {
  const [formData, setFormData] = useState({ ...product });
  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `products/${newImage.name}`);
        await uploadBytes(storageRef, newImage);
        const imageUrl = await getDownloadURL(storageRef);
        setFormData(prevState => ({
          ...prevState,
          imgUrl: imageUrl,
        }));
      }

      await updateDoc(doc(db, 'products', formData.id), formData);
      toast.success('Product updated successfully');
      refreshData();
      toggle();
    } catch (error) {
      console.error('Error updating document: ', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="shortDesc">Short Description</Label>
            <Input
              type="textarea"
              name="shortDesc"
              id="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Long Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="imgUrl">Current Image URL</Label>
            <Input
              type="text"
              name="imgUrl"
              id="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="newImage">Upload New Image</Label>
            <Input
              type="file"
              name="newImage"
              id="newImage"
              onChange={handleImageChange}
            />
          </FormGroup>
          <Button color="primary" type="submit">Save</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditProductModal;

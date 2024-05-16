import React, { useState, useEffect, useDeferredValue } from "react";
import CommonSection from "../Components/UI/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col, Input, FormGroup } from "reactstrap";
import "../Styles/Shope.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import ProductListing from "../Components/UI/ProductListing";

function Shop() {
  const [productsData, setProductsData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // To store the original data
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Use useDeferredValue for the search term
  const deferredSearchTerm = useDeferredValue(searchTerm, { timeoutMs: 300 });

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const snapshot = await getDocs(productsCollection);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsData(products);
      setOriginalData(products);
    };
    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value) {
      const filterData = originalData.filter(
        (product) => product.category === value
      );
      setProductsData(filterData);
    } else {
      // Reset to original data if no filter selected
      setProductsData(originalData);
    }
  };

  useEffect(() => {
    if (deferredSearchTerm) {
      const filteredData = originalData.filter((item) =>
        item.productName
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase())
      );
      setProductsData(filteredData);
    } else {
      setProductsData(originalData);
    }
  }, [deferredSearchTerm, originalData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sortedData = [...productsData];
    if (value === "ascending") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (value === "descending") {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setProductsData(sortedData);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <FormGroup>
                  <Input type="select" onChange={handleFilter}>
                    <option value="">Filter By Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </Input>
                </FormGroup>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <FormGroup>
                  <Input type="select" onChange={handleSort} value={sortBy}>
                    <option value="">Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </Input>
                </FormGroup>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <Input
                  type="text"
                  placeholder="Search Product"
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length > 0 ? (
              <ProductListing data={productsData} />
            ) : (
              <h1 className="text-center fs-4">No Products Found</h1>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Shop;

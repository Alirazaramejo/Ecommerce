// ProductListing.js
import React from "react";
import ProductCard from "./ProductCard";

function ProductListing({ data }) {
  return (
    <>
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </>
  );
}

export default ProductListing;

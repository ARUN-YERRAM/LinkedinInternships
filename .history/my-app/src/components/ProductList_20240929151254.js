import React from 'react';

const ProductList = ({ products, loadMore }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>   {/* Rendering product title */}
          <p>{product.description}</p>  {/* Render product description */}
          <a href={product.url}>View Product</a>  {/* Render product link */}
        </div>
      ))}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default ProductList;

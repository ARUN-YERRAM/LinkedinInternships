import React from 'react';

const ProductList = ({ products, loadMore }) => {
  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default ProductList;

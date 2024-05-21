import React from 'react'

const Product = ({ products }) => {
  return (
    <div>
        <ul>
      {products.map((product) => (
        <li key={product._id}>{product.name}</li>
      ))}
    </ul>
    </div>
  )
}

export default Product;
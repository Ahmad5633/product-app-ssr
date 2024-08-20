import { useState } from "react";

export default function Home({ products }) {
  //   const [maxPrice, setMaxPrice] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Redirect to the same page with maxPrice query parameter
  //     window.location.href = `/?maxPrice=${maxPrice}`;
  //   };

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Max Price:
          <input
            type="number"
            step="0.01"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
        <button type="submit">Filter</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  const products = [
    { id: 1, name: "Product A", price: 29.99 },
    { id: 2, name: "Product B", price: 49.99 },
    { id: 3, name: "Product C", price: 19.99 },
    { id: 4, name: "Product D", price: 99.99 },
  ];

  return { props: { products } };
}

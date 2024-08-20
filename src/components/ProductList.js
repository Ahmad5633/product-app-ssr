export default function ProductList({ products, onDelete }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product._id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => onDelete(product._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

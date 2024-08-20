import axios from "axios";

// export async function getServerSideProps() {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/products`
//   );
//   const products = res.data;

//   return { props: { products } };
// }
export async function getServerSideProps(context) {
  const products = [
    { id: 1, name: "Product A", price: 29.99 },
    { id: 2, name: "Product B", price: 49.99 },
    { id: 3, name: "Product C", price: 19.99 },
    { id: 4, name: "Product D", price: 99.99 },
  ];

  const { minPrice, maxPrice } = context.query;

  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || Infinity;

  const filteredProducts = products.filter(
    (product) => product.price >= min && product.price <= max
  );

  return { props: { products: filteredProducts } };
}

export default function Home({ products }) {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

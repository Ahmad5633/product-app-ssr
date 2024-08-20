import { useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export async function getServerSideProps() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    );
    return { props: { products: res.data } };
  } catch (error) {
    return { props: { products: [] } };
  }
}

export default function Products({ products }) {
  const [filter, setFilter] = useState("");
  const [productList, setProductList] = useState(products);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProductList(filteredProducts);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
    setProductList(productList.filter((p) => p._id !== id));
  };

  const handleAddProduct = (newProduct) => {
    setProductList([...productList, newProduct]);
  };

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
      />
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList products={productList} onDelete={handleDelete} />
    </div>
  );
}

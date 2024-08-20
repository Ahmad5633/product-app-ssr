import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.query; // Use context.query to get URL query parameters

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
    );
    const product = res.data;

    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null } }; // Handle the error case
  }
}

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (!product) {
    return <p>Product not found.</p>; // Handle case when product is null
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.id}` // Use the correct field for the ID
      );
      router.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

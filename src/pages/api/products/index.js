import { connectToDatabase } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ messsage: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json({ message: "Failed to create product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`MEthod ${method} Not Allowed`);
  }
}

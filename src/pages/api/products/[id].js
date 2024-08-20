import { connectToDatabase } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ message: "Product not found " });
        }

        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({
          nessage: "Failed to fetch product",
        });
      }
      break;

    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (!product) {
          return res.status(404)({ message: "Product not found" });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ message: "Failed to update product" });
      }
      break;

    case "DELETE":
      try {
        await Product.findByIdAndDelete(id);
        res.status(204).end();
      } catch (error) {
        res.status(400).json({
          message: "Failed to delete  the product",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

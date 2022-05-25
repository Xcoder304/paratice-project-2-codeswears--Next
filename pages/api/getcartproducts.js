import Cart from "../../modals/Cart";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Cart.find();

  res.status(200).json(products);
};

export default connectDb(handler);
